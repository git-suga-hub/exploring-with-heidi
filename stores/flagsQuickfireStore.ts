import { create } from "zustand";

type FlagsQuickfireState = {
  streak: number;
  bestStreak: number;
  score: number;
  answered: number;
  registerCorrect: () => void;
  registerWrong: () => void;
  resetSession: () => void;
};

export const useFlagsQuickfireStore = create<FlagsQuickfireState>((set) => ({
  streak: 0,
  bestStreak: 0,
  score: 0,
  answered: 0,
  registerCorrect: () =>
    set((s) => {
      const streak = s.streak + 1;
      return {
        streak,
        bestStreak: Math.max(s.bestStreak, streak),
        score: s.score + 1,
        answered: s.answered + 1,
      };
    }),
  registerWrong: () =>
    set((s) => ({
      streak: 0,
      answered: s.answered + 1,
    })),
  resetSession: () =>
    set({
      streak: 0,
      score: 0,
      answered: 0,
    }),
}));
