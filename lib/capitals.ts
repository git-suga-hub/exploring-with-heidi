"use client";

import worldData from "world-countries";
import type { Country as WorldCountry } from "world-countries";

export type CapitalEntry = {
  countryCode: string;
  countryName: string;
  capitalName: string;
  continent: string;
  subregion: string;
  population: number;
  lat: number;
  lng: number;
  currencyName?: string;
  languageName?: string;
};

const UK_NATIONS_CAPITALS: CapitalEntry[] = [
  {
    countryCode: "gb-sct",
    countryName: "Scotland",
    capitalName: "Edinburgh",
    continent: "Europe",
    subregion: "Northern Europe",
    population: 5_400_000,
    lat: 56.4907,
    lng: -4.2026,
    currencyName: "Pound sterling",
    languageName: "English",
  },
  {
    countryCode: "gb-wls",
    countryName: "Wales",
    capitalName: "Cardiff",
    continent: "Europe",
    subregion: "Northern Europe",
    population: 3_100_000,
    lat: 52.1307,
    lng: -3.7837,
    currencyName: "Pound sterling",
    languageName: "English",
  },
  {
    countryCode: "gb-nir",
    countryName: "Northern Ireland",
    capitalName: "Belfast",
    continent: "Europe",
    subregion: "Northern Europe",
    population: 1_900_000,
    lat: 54.7877,
    lng: -6.4923,
    currencyName: "Pound sterling",
    languageName: "English",
  },
];

type CulturePack = {
  vibe: string;
  food: string;
  drink: string;
  fashion: string;
};

const REGION_PACKS: Record<string, CulturePack> = {
  Africa: {
    vibe: "Expect lively markets, warm welcomes, and strong community spirit.",
    food: "Think rich stews, grilled meats, and bold spice blends.",
    drink: "Tea ceremonies and fresh fruit drinks are common in many places.",
    fashion: "Bright prints, tailoring, and expressive fabrics stand out.",
  },
  Americas: {
    vibe: "Big city energy mixed with local pride and laid-back charm.",
    food: "Street food classics, grilled favourites, and comfort dishes.",
    drink: "Coffee culture, fruit juices, and regional classics are popular.",
    fashion: "From smart casual to bold street style, confidence leads.",
  },
  Asia: {
    vibe: "Fast-paced hubs with deep tradition and modern creativity.",
    food: "Noodles, rice dishes, and layered spice or umami flavours.",
    drink: "Tea and cafe culture are both huge in many capitals.",
    fashion: "Sleek modern looks often blend with traditional influences.",
  },
  Europe: {
    vibe: "Historic streets, museum culture, and stylish city life.",
    food: "Bakeries, pasta, hearty classics, and regional specialties.",
    drink: "Cafe and sparkling water habits are part of daily rhythm.",
    fashion: "Polished, minimalist, and tailored looks are common.",
  },
  Oceania: {
    vibe: "Coastal lifestyle, outdoorsy spirit, and relaxed pace.",
    food: "Seafood, grilled dishes, and fresh produce are common picks.",
    drink: "Coffee scenes are strong, plus cold drinks in warm weather.",
    fashion: "Clean casual style with practical, weather-friendly layers.",
  },
  Antarctica: {
    vibe: "Ice, research, and extreme weather survival mode.",
    food: "No classic city food scene here.",
    drink: "Hot drinks are your best friend in freezing conditions.",
    fashion: "Pure utility: insulated gear over style.",
  },
  Other: {
    vibe: "A unique place with its own local rhythm.",
    food: "Local dishes are a clue worth exploring.",
    drink: "Regional drink habits might point you closer.",
    fashion: "Look for a style mix shaped by climate and culture.",
  },
};

function pickLanguage(c: WorldCountry): string | undefined {
  const langs = c.languages ? Object.values(c.languages) : [];
  return langs[0];
}

function pickCurrency(c: WorldCountry): string | undefined {
  const vals = c.currencies ? Object.values(c.currencies) : [];
  return vals[0]?.name;
}

function normalizeRegion(region: string): string {
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

export const CAPITALS: CapitalEntry[] = (worldData as WorldCountry[])
  .filter((c) => {
    const cap = c.capital?.[0]?.trim();
    const code = c.cca2?.trim();
    const [lat, lng] = c.latlng ?? [];
    return !!cap && !!code && Number.isFinite(lat) && Number.isFinite(lng);
  })
  .map((c) => ({
    countryCode: c.cca2.toLowerCase(),
    countryName: c.name.common,
    capitalName: c.capital?.[0] ?? "",
    continent: normalizeRegion(c.region),
    subregion: c.subregion ?? "Unknown",
    population: (c as WorldCountry & { population?: number }).population ?? 0,
    lat: c.latlng[0],
    lng: c.latlng[1],
    currencyName: pickCurrency(c),
    languageName: pickLanguage(c),
  }))
  .concat(UK_NATIONS_CAPITALS)
  .sort((a, b) => a.capitalName.localeCompare(b.capitalName, "en"));

export const CAPITALS_BY_NAME: Record<string, CapitalEntry> = Object.fromEntries(
  CAPITALS.map((c) => [c.capitalName.toLowerCase(), c])
);

function normalizeCapitalInput(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export const CAPITALS_BY_NORMALIZED_NAME: Record<string, CapitalEntry> = Object.fromEntries(
  CAPITALS.map((c) => [normalizeCapitalInput(c.capitalName), c])
);

const CAPITAL_ALIASES: Record<string, string> = {
  washingtondc: "washingtond c".replace(/\s/g, ""),
  "washingtond.c": "washingtond c".replace(/\s/g, ""),
};

export function randomCapital(): CapitalEntry {
  const i = Math.floor(Math.random() * CAPITALS.length);
  return CAPITALS[i] as CapitalEntry;
}

export function findCapitalByName(input: string): CapitalEntry | undefined {
  const trimmed = input.trim();
  const exact = CAPITALS_BY_NAME[trimmed.toLowerCase()];
  if (exact) return exact;

  const normalized = normalizeCapitalInput(trimmed);
  const canonical = CAPITAL_ALIASES[normalized] ?? normalized;
  return CAPITALS_BY_NORMALIZED_NAME[canonical];
}

function populationBand(pop: number): string {
  if (pop >= 20_000_000) return "mega";
  if (pop >= 10_000_000) return "very-large";
  if (pop >= 5_000_000) return "large";
  if (pop >= 1_000_000) return "mid";
  return "small";
}

function populationHint(pop: number): string {
  const band = populationBand(pop);
  if (band === "mega") return "This capital sits in a huge population center (20M+ in the country).";
  if (band === "very-large") return "This one belongs to a very populous nation (10M+).";
  if (band === "large") return "Think of a fairly large country (around 5M+ people).";
  if (band === "mid") return "The country is medium-sized in population.";
  return "This capital belongs to a smaller-population country.";
}

function distanceHint(distanceKm: number): string {
  if (distanceKm < 250) return "You are extremely close now — almost right on top of Heidi.";
  if (distanceKm < 700) return "You are very warm — nearby region.";
  if (distanceKm < 1500) return "You are warm — keep moving in this direction.";
  if (distanceKm < 3000) return "You are getting there, but still some distance away.";
  if (distanceKm < 6000) return "You are cold — likely the wrong part of the world.";
  return "Very cold. Try a different continent.";
}

export function getCapitalClue(target: CapitalEntry, clueNumber: number, lastGuessDistanceKm: number | null): string {
  const pack = REGION_PACKS[target.continent] ?? REGION_PACKS.Other;
  const clueType = clueNumber % 7;

  if (lastGuessDistanceKm !== null && clueType === 0) {
    return distanceHint(lastGuessDistanceKm);
  }
  if (clueType === 1) {
    return `Continent clue: Heidi is in ${target.continent}.`;
  }
  if (clueType === 2) {
    return `Population clue: ${populationHint(target.population)}`;
  }
  if (clueType === 3) {
    const first = target.capitalName[0];
    return `Name clue: the capital starts with "${first}" and has ${target.capitalName.length} letters.`;
  }
  if (clueType === 4) {
    return `Culture clue: ${pack.vibe} ${pack.food}`;
  }
  if (clueType === 5) {
    return `Lifestyle clue: ${pack.drink} ${pack.fashion}`;
  }

  const extras = [
    target.languageName ? `Main language clue: ${target.languageName}.` : null,
    target.currencyName ? `Money clue: the local currency is ${target.currencyName}.` : null,
    `Subregion clue: ${target.subregion}.`,
  ].filter(Boolean);
  return (extras[0] as string) ?? `Subregion clue: ${target.subregion}.`;
}

function formatPopulation(pop: number): string {
  if (pop >= 1_000_000_000) return `${(pop / 1_000_000_000).toFixed(2)}B`;
  if (pop >= 1_000_000) return `${(pop / 1_000_000).toFixed(1)}M`;
  if (pop >= 1_000) return `${Math.round(pop / 1_000)}K`;
  return `${pop}`;
}

export function getCapitalWinFact(target: CapitalEntry): string {
  const pack = REGION_PACKS[target.continent] ?? REGION_PACKS.Other;
  const facts: string[] = [
    `${target.capitalName} is the capital of ${target.countryName} in ${target.continent}.`,
    `It sits in ${target.subregion} and the country population is about ${formatPopulation(target.population)}.`,
    target.languageName ? `A major language there is ${target.languageName}.` : "",
    target.currencyName ? `The local currency is ${target.currencyName}.` : "",
    `City vibe: ${pack.vibe} ${pack.food}`,
  ].filter(Boolean);

  return `Great work! ${facts.join(" ")}`;
}

