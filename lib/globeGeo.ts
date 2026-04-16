import type { Feature, MultiPolygon, Polygon } from "geojson";

export function getFeatureIso2(feature: Feature<Polygon | MultiPolygon>): string | null {
  const p = feature.properties as Record<string, unknown> | null;
  if (!p) return null;
  const iso = (p.ISO_A2_EH as string) || (p.ISO_A2 as string);
  if (!iso || iso === "-99" || iso === "AQ") return null;
  return iso.toLowerCase();
}
