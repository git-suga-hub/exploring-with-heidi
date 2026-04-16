import { create } from "zustand";
import type { Country } from "@/lib/countries";
import { randomCountry } from "@/lib/countries";
import { haversineKm } from "@/lib/geo";

export type HeidiGuess = {
  country: Country;
  distanceKm: number;
};

type HuntingHeidiState = {
  target: Country;
  guesses: HeidiGuess[];
  won: boolean;
  /** True after “Give up & reveal” — not a win, but answer is shown */
  answerRevealed: boolean;
  /** Last submitted guess distance — for mascot copy */
  lastDistanceKm: number | null;
  /** Distance of the guess before the last one (chronological) */
  previousGuessDistanceKm: number | null;
  guessCountry: (
    country: Country
  ) => { ok: true; win: boolean } | { ok: false; reason: "duplicate" | "game_over" };
  /** Ends the round without winning; shows where Heidi was hiding */
  giveUp: () => void;
  newGame: () => void;
};

function pickTarget(): Country {
  return randomCountry();
}

function distanceToTarget(guess: Country, target: Country): number {
  return Math.round(haversineKm(guess.lat, guess.lng, target.lat, target.lng));
}

export const useHuntingHeidiStore = create<HuntingHeidiState>((set, get) => ({
  target: pickTarget(),
  guesses: [],
  won: false,
  answerRevealed: false,
  lastDistanceKm: null,
  previousGuessDistanceKm: null,

  guessCountry: (country) => {
    const state = get();
    if (state.won || state.answerRevealed) return { ok: false, reason: "game_over" };

    if (state.guesses.some((g) => g.country.code === country.code)) {
      return { ok: false, reason: "duplicate" };
    }

    const target = state.target;
    const distanceKm = distanceToTarget(country, target);
    const win = country.code === target.code;

    const previousGuessDistanceKm =
      state.guesses.length > 0 ? state.guesses[state.guesses.length - 1].distanceKm : null;

    set({
      guesses: [...state.guesses, { country, distanceKm }],
      won: win,
      lastDistanceKm: distanceKm,
      previousGuessDistanceKm,
    });

    return { ok: true, win };
  },

  giveUp: () => {
    const state = get();
    if (state.won || state.answerRevealed) return;
    set({ answerRevealed: true });
  },

  newGame: () =>
    set({
      target: pickTarget(),
      guesses: [],
      won: false,
      answerRevealed: false,
      lastDistanceKm: null,
      previousGuessDistanceKm: null,
    }),
}));

export function getSortedGuesses(guesses: HeidiGuess[]): HeidiGuess[] {
  return [...guesses].sort((a, b) => a.distanceKm - b.distanceKm);
}
