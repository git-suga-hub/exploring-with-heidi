import worldData from "world-countries";
import type { Country as WorldCountry } from "world-countries";

export type Country = {
  code: string;
  name: string;
  continent: string;
  fact: string;
  /** Coordinates (decimal degrees) for distance games — country centroid from world-countries */
  lat: number;
  lng: number;
};

export const UK_NATIONS: Country[] = [
  {
    code: "gb-sct",
    name: "Scotland",
    continent: "Europe",
    fact: "Scotland is one of the UK nations, known for highlands, lochs, and historic castles.",
    lat: 56.4907,
    lng: -4.2026,
  },
  {
    code: "gb-wls",
    name: "Wales",
    continent: "Europe",
    fact: "Wales is one of the UK nations, famous for rugged coastlines, mountains, and Welsh language heritage.",
    lat: 52.1307,
    lng: -3.7837,
  },
  {
    code: "gb-nir",
    name: "Northern Ireland",
    continent: "Europe",
    fact: "Northern Ireland is one of the UK nations, known for the Giant's Causeway, coastlines, and rich history.",
    lat: 54.7877,
    lng: -6.4923,
  },
];

function regionToContinent(region: string): string {
  if (
    region === "Africa" ||
    region === "Americas" ||
    region === "Asia" ||
    region === "Europe" ||
    region === "Oceania" ||
    region === "Antarctica"
  ) {
    return region;
  }
  return "Other";
}

function factFor(name: string): string {
  return `Explore ${name} on the map — every country has its own geography and story.`;
}

/** Full world list (world-countries / mledoze). ISO 3166-1 alpha-2 codes (lowercase) for flagcdn.com */
export const COUNTRIES: Country[] = (worldData as WorldCountry[])
  .filter((c) => {
    if (!c.cca2?.trim()) return false;
    const [lat, lng] = c.latlng ?? [];
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
    return true;
  })
  .map((c) => ({
    code: c.cca2.toLowerCase(),
    name: c.name.common,
    continent: regionToContinent(c.region),
    fact: factFor(c.name.common),
    lat: c.latlng[0],
    lng: c.latlng[1],
  }))
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

export const COUNTRIES_BY_CODE: Record<string, Country> = Object.fromEntries(
  [...COUNTRIES, ...UK_NATIONS].map((c) => [c.code, c])
);

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES_BY_CODE[code.toLowerCase()];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function randomCountry(pool: Country[] = COUNTRIES): Country {
  const i = Math.floor(Math.random() * pool.length);
  return pool[i] as Country;
}

/** Four unique countries: one correct + three distractors (prefers same continent). */
export function buildChoices(correct: Country, pool: Country[] = COUNTRIES): Country[] {
  const sameContinent = pool.filter(
    (c) => c.continent === correct.continent && c.code !== correct.code
  );
  const other = pool.filter((c) => c.code !== correct.code);

  const wrong: Country[] = [];
  const sameShuffled = shuffle(sameContinent);
  for (const c of sameShuffled) {
    if (wrong.length >= 3) break;
    wrong.push(c);
  }
  const otherShuffled = shuffle(other.filter((c) => !wrong.find((w) => w.code === c.code)));
  for (const c of otherShuffled) {
    if (wrong.length >= 3) break;
    wrong.push(c);
  }

  return shuffle([correct, ...wrong.slice(0, 3)]);
}
