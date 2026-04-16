/** Earth mean radius in km (WGS84 approximation) */
const R_KM = 6371;

/** Max distance used to normalise heat (km) — beyond this reads as “coldest”. */
const HEAT_MAX_KM = 16000;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two points in decimal degrees. */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return R_KM * c;
}

/** 0 = far / frosty cold, 1 = very close / dark red */
function heatCloseness(distanceKm: number): number {
  return 1 - Math.min(Math.max(distanceKm / HEAT_MAX_KM, 0), 1);
}

type HslStop = { u: number; h: number; s: number; l: number };

/**
 * Frosty blue (far) → yellows → oranges → red → dark red (close).
 * Stops are in “closeness” u ∈ [0, 1].
 */
const HEAT_STOPS: HslStop[] = [
  { u: 0, h: 210, s: 0.62, l: 0.78 },
  { u: 0.22, h: 200, s: 0.52, l: 0.7 },
  { u: 0.38, h: 52, s: 0.88, l: 0.58 },
  { u: 0.55, h: 38, s: 0.94, l: 0.52 },
  { u: 0.72, h: 22, s: 0.92, l: 0.45 },
  { u: 0.88, h: 8, s: 0.88, l: 0.38 },
  { u: 1, h: 0, s: 0.78, l: 0.28 },
];

function hslAtHeatStops(u: number, stops: HslStop[]): { h: number; s: number; l: number } {
  if (u <= stops[0].u) {
    const a = stops[0];
    return { h: a.h, s: a.s, l: a.l };
  }
  if (u >= stops[stops.length - 1].u) {
    const a = stops[stops.length - 1];
    return { h: a.h, s: a.s, l: a.l };
  }
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (u >= a.u && u <= b.u) {
      const t = (u - a.u) / (b.u - a.u);
      return {
        h: a.h + (b.h - a.h) * t,
        s: a.s + (b.s - a.s) * t,
        l: a.l + (b.l - a.l) * t,
      };
    }
  }
  const last = stops[stops.length - 1];
  return { h: last.h, s: last.s, l: last.l };
}

/** Text / accent colour for distance readouts (list km values). */
export function distanceToHeatColor(distanceKm: number): string {
  const u = heatCloseness(distanceKm);
  const { h, s, l } = hslAtHeatStops(u, HEAT_STOPS);
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

/** Soft row background behind guesses — same hue path, lighter and less saturated. */
export function distanceToHeatBg(distanceKm: number): string {
  const u = heatCloseness(distanceKm);
  const bgStops: HslStop[] = HEAT_STOPS.map((p) => ({
    u: p.u,
    h: p.h,
    s: p.s * 0.55,
    l: Math.min(0.94, p.l + (1 - p.l) * 0.42 + 0.08),
  }));
  const { h, s, l } = hslAtHeatStops(u, bgStops);
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

/** Unguessed land on the 3D globe and flat map — light, easy-to-see. */
export const NEUTRAL_POLYGON_CAP = "rgba(175, 200, 215, 0.82)";

/** Heat tint for country caps on the globe and flat map (semi-opaque, brighter). */
export function distanceToHeatPolygonCap(distanceKm: number): string {
  const u = heatCloseness(distanceKm);
  const capStops: HslStop[] = HEAT_STOPS.map((p) => ({
    u: p.u,
    h: p.h,
    s: Math.min(0.98, p.s + 0.08),
    l: Math.max(0.44, Math.min(0.68, p.l * 0.88 + 0.14)),
  }));
  const { h, s, l } = hslAtHeatStops(u, capStops);
  return `hsla(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 0.95)`;
}
