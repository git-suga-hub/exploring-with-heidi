"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { GlobeMethods } from "react-globe.gl";
import { geoCentroid } from "d3-geo";
import { NEUTRAL_POLYGON_CAP, distanceToHeatPolygonCap } from "@/lib/geo";
import { getFeatureIso2 } from "@/lib/globeGeo";
import { COUNTRIES_BY_CODE, type Country } from "@/lib/countries";
import type { HeidiGuess } from "@/stores/huntingHeidiStore";
import type { LabelMode } from "@/components/hunting-heidi/HeidiWorldView";
import { getFlagImageUrl } from "@/lib/flags";

const Globe = dynamic(() => import("react-globe.gl").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div
      className="flex w-full items-center justify-center rounded-brand border border-explorer-blue/30 bg-sky-100 text-sm text-explorer-deep"
      style={{ minHeight: 280 }}
    >
      Loading globe...
    </div>
  ),
});

const GEO_URL = "/geo/ne_50m_admin_0_countries.geojson";

type Props = {
  guesses: HeidiGuess[];
  /** When true, sits inside a parent card (no outer border / duplicate chrome). */
  embedded?: boolean;
  /** Show the help line under the globe (default true; parent may show a shared caption). */
  showFooter?: boolean;
  labelMode?: LabelMode;
  foundCountry?: Country | null;
};

type GlobeLabel = {
  lat: number;
  lng: number;
  text: string;
  size: number;
};

function continentColor(code: string | null, name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("antarctica") || lowerName.includes("greenland") || lowerName.includes("arctic")) {
    return "hsla(0, 0%, 98%, 0.95)";
  }
  if (!code) return NEUTRAL_POLYGON_CAP;
  const continent = COUNTRIES_BY_CODE[code]?.continent;
  switch (continent) {
    case "Africa":
      return "hsla(55, 86%, 68%, 0.88)"; // yellow
    case "Asia":
      return "hsla(318, 72%, 72%, 0.88)"; // pink
    case "Europe":
      return "hsla(274, 62%, 72%, 0.88)"; // purple
    case "North America":
      return "hsla(132, 56%, 64%, 0.88)"; // green
    case "South America":
      return "hsla(292, 56%, 72%, 0.88)"; // purple-pink
    case "Oceania":
      return "hsla(160, 52%, 66%, 0.88)"; // green-teal
    default:
      return NEUTRAL_POLYGON_CAP;
  }
}

type FoundMarker = {
  lat: number;
  lng: number;
  code: string;
  name: string;
};

export default function HeidiGlobe({
  guesses,
  embedded = false,
  showFooter = true,
  labelMode = "easy",
  foundCountry = null,
}: Props) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastFocusKeyRef = useRef<string>("");
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [dims, setDims] = useState({ w: 400, h: 300 });

  useEffect(() => {
    let cancelled = false;
    fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error("geo");
        return r.json();
      })
      .then((data: FeatureCollection) => {
        if (!cancelled) setGeo(data);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.max(280, el.clientWidth);
      setDims({ w, h: Math.min(440, Math.round(w * 0.7)) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const guessByCode = useMemo(() => {
    const m = new Map<string, number>();
    for (const g of guesses) {
      m.set(g.country.code, g.distanceKm);
    }
    return m;
  }, [guesses]);

  const polygonsData = useMemo(() => {
    if (!geo?.features?.length) return [];
    return geo.features.filter((f) => {
      const code = getFeatureIso2(f as Feature<Polygon | MultiPolygon>);
      return code !== null;
    }) as Feature<Polygon | MultiPolygon>[];
  }, [geo]);

  const globeLabels = useMemo<GlobeLabel[]>(() => {
    if (labelMode === "hard" || !polygonsData.length) return [];
    const out: GlobeLabel[] = [];
    for (const f of polygonsData) {
      const name = (f.properties as { NAME?: string })?.NAME;
      if (!name) continue;
      const [lng, lat] = geoCentroid(f);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
      out.push({ lat, lng, text: name, size: 0.6 });
    }
    return out;
  }, [polygonsData, labelMode]);

  const foundMarker = useMemo<FoundMarker[]>(
    () =>
      foundCountry
        ? [{ lat: foundCountry.lat, lng: foundCountry.lng, code: foundCountry.code, name: foundCountry.name }]
        : [],
    [foundCountry]
  );

  const latestFocusTarget = useMemo(() => {
    if (guesses.length > 0) return guesses[guesses.length - 1].country;
    return foundCountry ?? null;
  }, [foundCountry, guesses]);

  const polygonCapColor = useCallback(
    (d: object) => {
      const f = d as Feature<Polygon | MultiPolygon>;
      const code = getFeatureIso2(f);
      if (!code) return NEUTRAL_POLYGON_CAP;
      const name = (f.properties as { NAME?: string })?.NAME ?? "";
      const dist = guessByCode.get(code);
      if (dist === undefined) return continentColor(code, name);
      return distanceToHeatPolygonCap(dist);
    },
    [guessByCode]
  );

  const polygonAltitude = useCallback(
    (d: object) => {
      const f = d as Feature<Polygon | MultiPolygon>;
      const code = getFeatureIso2(f);
      if (!code) return 0.004;
      return guessByCode.has(code) ? 0.02 : 0.004;
    },
    [guessByCode]
  );

  const polygonLabel = useCallback(
    (d: object) => {
      const f = d as Feature<Polygon | MultiPolygon>;
      const code = getFeatureIso2(f);
      const name = (f.properties as { NAME?: string })?.NAME ?? "";
      if (!code || !name) return "";
      const dist = guessByCode.get(code);
      if (dist !== undefined) return `<b>${name}</b>: ${dist.toLocaleString()} km`;
      return name;
    },
    [guessByCode]
  );

  const onGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    try {
      const c = g.controls?.();
      if (!c) return;
      c.autoRotate = false;
      c.autoRotateSpeed = 0;
      c.enableZoom = true;
      c.minDistance = 120;
      c.maxDistance = 520;
      c.zoomSpeed = 0.65;
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;

    if (!latestFocusTarget) {
      if (lastFocusKeyRef.current === "default") return;
      lastFocusKeyRef.current = "default";
      try {
        g.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 700);
      } catch {
        /* ignore */
      }
      return;
    }

    const focusKey = `${latestFocusTarget.code}-${guesses.length}`;
    if (lastFocusKeyRef.current === focusKey) return;
    lastFocusKeyRef.current = focusKey;
    try {
      g.pointOfView({ lat: latestFocusTarget.lat, lng: latestFocusTarget.lng, altitude: 1.7 }, 900);
    } catch {
      /* ignore */
    }
  }, [guesses.length, latestFocusTarget]);

  if (loadError) {
    return (
      <div className="rounded-brand border border-ui-red bg-red-50 px-4 py-6 text-center text-sm text-red-900">
        Could not load the world map data. Check that <code className="rounded bg-white px-1">public/geo/ne_50m_admin_0_countries.geojson</code> exists.
      </div>
    );
  }

  if (!geo) {
    return (
      <div
      className="flex w-full items-center justify-center rounded-brand border border-explorer-blue/30 bg-sky-100 text-sm text-explorer-deep"
        style={{ minHeight: dims.h || 280 }}
      >
        Loading map...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={
        embedded
          ? "w-full overflow-hidden bg-transparent"
          : "w-full overflow-hidden rounded-brand border-2 border-explorer-blue/40 bg-gradient-to-b from-sky-100 to-cyan-50 shadow-brand"
      }
    >
      <Globe
        ref={globeRef}
        width={dims.w}
        height={dims.h}
        backgroundColor="rgba(191, 232, 255, 0.15)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="rgba(173, 216, 255, 0.82)"
        atmosphereAltitude={0.26}
        polygonsData={polygonsData}
        polygonAltitude={polygonAltitude}
        polygonCapColor={polygonCapColor}
        polygonSideColor={() => "rgba(60, 80, 100, 0.45)"}
        polygonStrokeColor={() => "rgba(240, 248, 255, 0.35)"}
        polygonLabel={polygonLabel}
        polygonsTransitionDuration={450}
        labelsData={globeLabels}
        labelLat={(d: object) => (d as GlobeLabel).lat}
        labelLng={(d: object) => (d as GlobeLabel).lng}
        labelText={(d: object) => (d as GlobeLabel).text}
        labelSize={(d: object) => (d as GlobeLabel).size}
        labelDotRadius={0}
        labelColor={() => "rgba(255, 255, 255, 0.9)"}
        labelResolution={3}
        labelAltitude={0.012}
        htmlElementsData={foundMarker}
        htmlLat={(d: object) => (d as FoundMarker).lat}
        htmlLng={(d: object) => (d as FoundMarker).lng}
        htmlAltitude={() => 0.05}
        htmlElement={(d: object) => {
          const marker = d as FoundMarker;
          const el = document.createElement("div");
          el.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;transform:translateY(-6px)">
              <div style="height:22px;width:3px;background:#ef3e2e;border-radius:2px"></div>
              <div style="height:14px;width:14px;border-radius:999px;background:#ef3e2e;border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.35);margin-top:-3px"></div>
              <div style="margin-top:6px;background:#fff;border:1px solid #cfd8dc;border-radius:8px;padding:2px 4px;box-shadow:0 2px 8px rgba(0,0,0,.25)">
                <img src="${getFlagImageUrl(marker.code, 80)}" alt="Flag of ${marker.name}" style="display:block;width:32px;height:20px;object-fit:contain" />
              </div>
            </div>
          `;
          return el;
        }}
        onGlobeReady={onGlobeReady}
      />
      {showFooter && (
        <p className="border-t border-explorer-blue/20 px-3 py-2 text-center text-[11px] leading-snug text-explorer-deep/80">
          Drag to rotate - scroll to zoom - guessed countries tint frosty blue (far) -&gt; yellow, orange, then deep red
          (close). Map: Natural Earth.
        </p>
      )}
    </div>
  );
}
