import { create } from "zustand";
import { haversineKm } from "@/lib/geo";
import type { CapitalEntry } from "@/lib/capitals";
import { randomCapital } from "@/lib/capitals";

export type CapitalGuess = {
  entry: CapitalEntry;
  distanceKm: number;
};

type CapitalsGameState = {
  target: CapitalEntry;
  guesses: CapitalGuess[];
  won: boolean;
  answerRevealed: boolean;
  cluesUsed: number;
  lastDistanceKm: number | null;
  guessCapital: (
    entry: CapitalEntry
  ) => { ok: true; win: boolean } | { ok: false; reason: "duplicate" | "game_over" };
  requestClue: () => number;
  revealAnswer: () => void;
  newGame: () => void;
};

function pickTarget(): CapitalEntry {
  return randomCapital();
}

function distanceKm(a: CapitalEntry, b: CapitalEntry): number {
  return Math.round(haversineKm(a.lat, a.lng, b.lat, b.lng));
}

export const useCapitalsGameStore = create<CapitalsGameState>((set, get) => ({
  target: pickTarget(),
  guesses: [],
  won: false,
  answerRevealed: false,
  cluesUsed: 0,
  lastDistanceKm: null,

  guessCapital: (entry) => {
    const state = get();
    if (state.won || state.answerRevealed) return { ok: false, reason: "game_over" };
    if (state.guesses.some((g) => g.entry.capitalName.toLowerCase() === entry.capitalName.toLowerCase())) {
      return { ok: false, reason: "duplicate" };
    }

    const dist = distanceKm(entry, state.target);
    const win = entry.capitalName.toLowerCase() === state.target.capitalName.toLowerCase();
    set({
      guesses: [...state.guesses, { entry, distanceKm: dist }],
      won: win,
      lastDistanceKm: dist,
    });
    return { ok: true, win };
  },

  requestClue: () => {
    const next = get().cluesUsed + 1;
    set({ cluesUsed: next });
    return next;
  },

  revealAnswer: () => {
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
      cluesUsed: 0,
      lastDistanceKm: null,
    }),
}));

