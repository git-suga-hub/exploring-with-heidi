"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Feature, FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { geoEquirectangular, geoPath } from "d3-geo";
import { NEUTRAL_POLYGON_CAP, distanceToHeatPolygonCap } from "@/lib/geo";
import { getFeatureIso2 } from "@/lib/globeGeo";
import { COUNTRIES_BY_CODE } from "@/lib/countries";
import type { HeidiGuess } from "@/stores/huntingHeidiStore";
import type { LabelMode } from "@/components/hunting-heidi/HeidiWorldView";

const GEO_URL = "/geo/ne_50m_admin_0_countries.geojson";

/** Zoom thresholds per difficulty (medium uses zoom-gated labels). */
const LABEL_ZOOM_START_MEDIUM = 3.1;
const LABEL_ZOOM_FULL_MEDIUM = 4.9;

function labelOpacityForZoom(zoom: number, mode: LabelMode): number {
  if (mode === "hard") return 0;
  if (mode === "easy") return 1;
  if (zoom < LABEL_ZOOM_START_MEDIUM) return 0;
  if (zoom >= LABEL_ZOOM_FULL_MEDIUM) return 1;
  return (zoom - LABEL_ZOOM_START_MEDIUM) / (LABEL_ZOOM_FULL_MEDIUM - LABEL_ZOOM_START_MEDIUM);
}

type Props = {
  guesses: HeidiGuess[];
  labelMode: LabelMode;
};

type MapPath = {
  key: string;
  d: string;
  fill: string;
};

type MapLabel = {
  key: string;
  x: number;
  y: number;
  name: string;
};

function truncateName(name: string, max = 22): string {
  if (name.length <= max) return name;
  return `${name.slice(0, max - 1)}…`;
}

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

export default function HeidiFlatMap({ guesses, labelMode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<FeatureCollection | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [dims, setDims] = useState({ w: 400, h: 300 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 0,
    y: 0,
  });

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
      setDims({ w, h: Math.min(560, Math.round(w * 0.84)) });
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

  const { paths, labels } = useMemo(() => {
    const w = dims.w;
    const h = dims.h;
    if (!w || !h || !polygonsData.length) {
      return { paths: [] as MapPath[], labels: [] as MapLabel[] };
    }

    const projection = geoEquirectangular().fitSize([w, h], { type: "Sphere" });
    const path = geoPath(projection);

    const pathsOut: MapPath[] = [];
    const labelsOut: MapLabel[] = [];

    for (let i = 0; i < polygonsData.length; i++) {
      const f = polygonsData[i];
      const d = path(f);
      if (!d) continue;

      const code = getFeatureIso2(f);
      const rawName = (f.properties as { NAME?: string })?.NAME ?? "";
      const dist = code ? guessByCode.get(code) : undefined;
      const fill = dist === undefined ? continentColor(code, rawName) : distanceToHeatPolygonCap(dist);
      const key = code ? `${code}-${i}` : `poly-${i}`;

      pathsOut.push({ key, d, fill });

      const c = path.centroid(f);
      if (!Number.isFinite(c[0]) || !Number.isFinite(c[1])) continue;

      if (!rawName) continue;

      labelsOut.push({
        key: `${key}-label`,
        x: c[0],
        y: c[1],
        name: truncateName(rawName),
      });
    }

    return { paths: pathsOut, labels: labelsOut };
  }, [dims.w, dims.h, polygonsData, guessByCode]);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((z) => Math.min(8, Math.max(1, z * factor)));
  };

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    dragRef.current = { active: true, x: e.clientX, y: e.clientY };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    dragRef.current = { active: true, x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  };

  const endPointerDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  if (loadError) {
    return (
      <div className="rounded-brand border border-ui-red bg-red-50 px-4 py-6 text-center text-sm text-red-900">
        Could not load the world map data. Check that{" "}
        <code className="rounded bg-white px-1">public/geo/ne_50m_admin_0_countries.geojson</code> exists.
      </div>
    );
  }

  if (!geo || !paths.length) {
    return (
      <div
        className="flex w-full items-center justify-center bg-[#1e3a52]"
        style={{ minHeight: dims.h || 280 }}
      >
        <span className="text-sm text-cyan-100/80">Loading flat map…</span>
      </div>
    );
  }

  const { w, h } = dims;
  const cx = w / 2;
  const cy = h / 2;
  const labelOpacity = labelOpacityForZoom(zoom, labelMode);
  const showLabelLayer = labelOpacity > 0.02;

  return (
    <div ref={containerRef} className="relative w-full bg-[#1e3a52]">
      {labelMode === "medium" && !showLabelLayer && (
        <div className="pointer-events-none absolute left-3 top-12 z-10 max-w-[15rem] rounded-lg border border-white/15 bg-explorer-deep/85 px-3 py-2 font-display text-xs leading-snug text-cyan-50 shadow-md backdrop-blur-sm">
          Zoom in closer — country names appear when you&apos;re zoomed in.
        </div>
      )}
      <div className="absolute right-2 top-2 z-10 flex gap-2">
        <button
          type="button"
          onClick={resetView}
          className="rounded-full border border-white/20 bg-explorer-deep/90 px-3 py-1 font-display text-xs text-white shadow-sm backdrop-blur hover:bg-explorer-blue"
        >
          Reset view
        </button>
      </div>

      <svg
        ref={svgRef}
        role="img"
        aria-label="World map. Drag to pan and scroll to zoom; zoom in to read country names."
        width={w}
        height={h}
        className="block cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onDoubleClick={resetView}
        onWheel={onWheel}
      >
        <defs>
          <filter id="labelShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0.4" stdDeviation="0.35" floodColor="#0f1e2e" floodOpacity="0.45" />
          </filter>
        </defs>

        <rect width={w} height={h} fill="#1e3a52" />

        <g
          transform={`translate(${pan.x},${pan.y}) translate(${cx},${cy}) scale(${zoom}) translate(${-cx},${-cy})`}
        >
          {paths.map((p) => (
            <path key={p.key} d={p.d} fill={p.fill} stroke="rgba(255, 255, 255, 0.62)" strokeWidth={0.5} />
          ))}

          {showLabelLayer && (
            <g opacity={labelOpacity} pointerEvents="none">
              {labels.map((t) => {
                const fontSize = labelMode === "easy" ? Math.max(1.2, 2.5 / zoom) : 2.1;
                const sw = labelMode === "easy" ? Math.max(0.14, 0.28 / zoom) : 0.2;
                return (
                  <text
                    key={t.key}
                    x={t.x}
                    y={t.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={fontSize}
                    fontFamily="var(--font-display), system-ui, sans-serif"
                    fontWeight={labelMode === "easy" ? 400 : 300}
                    fill="#ffffff"
                    stroke="#0f1e2e"
                    strokeWidth={sw}
                    paintOrder="stroke fill"
                    filter="url(#labelShadow)"
                  >
                    {t.name}
                  </text>
                );
              })}
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
