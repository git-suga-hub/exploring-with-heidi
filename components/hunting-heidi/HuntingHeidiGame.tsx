"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Country } from "@/lib/countries";
import { getHeidiGiveUpReveal, getHeidiLine, getHeidiWelcome } from "@/lib/heidiMessages";
import { distanceToHeatBg, distanceToHeatColor } from "@/lib/geo";
import { getSortedGuesses, useHuntingHeidiStore } from "@/stores/huntingHeidiStore";

import CountrySearch from "@/components/hunting-heidi/CountrySearch";
import HeidiWorldView from "@/components/hunting-heidi/HeidiWorldView";
import HeidiMascot from "@/components/hunting-heidi/HeidiMascot";

function heatFromDistances(
  current: number,
  previous: number | null
): "warmer" | "colder" | "same" | null {
  if (previous === null) return null;
  const d = current - previous;
  if (d < -80) return "warmer";
  if (d > 80) return "colder";
  return "same";
}

export default function HuntingHeidiGame() {
  const target = useHuntingHeidiStore((s) => s.target);
  const guesses = useHuntingHeidiStore((s) => s.guesses);
  const won = useHuntingHeidiStore((s) => s.won);
  const answerRevealed = useHuntingHeidiStore((s) => s.answerRevealed);
  const guessCountry = useHuntingHeidiStore((s) => s.guessCountry);
  const giveUp = useHuntingHeidiStore((s) => s.giveUp);
  const newGame = useHuntingHeidiStore((s) => s.newGame);

  const [mascotMessage, setMascotMessage] = useState(() => getHeidiWelcome());
  const [heat, setHeat] = useState<"warmer" | "colder" | "same" | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const excluded = useMemo(() => new Set(guesses.map((g) => g.country.code)), [guesses]);

  const sorted = useMemo(() => getSortedGuesses(guesses), [guesses]);

  const roundLocked = won || answerRevealed;

  const onPick = (country: Country) => {
    setBanner(null);
    const result = guessCountry(country);
    if (!result.ok) {
      if (result.reason === "duplicate") {
        setBanner("You already guessed that country — try another!");
      }
      return;
    }

    const state = useHuntingHeidiStore.getState();
    const dist = state.lastDistanceKm ?? 0;
    const prev = state.previousGuessDistanceKm;

    setHeat(heatFromDistances(dist, prev));
    setMascotMessage(
      getHeidiLine({
        distanceKm: dist,
        previousDistanceKm: prev,
        isWin: result.win,
        guessedName: country.name,
      })
    );
  };

  const handleGiveUp = () => {
    setBanner(null);
    const state = useHuntingHeidiStore.getState();
    if (state.won || state.answerRevealed) return;
    giveUp();
    setHeat(null);
    setMascotMessage(getHeidiGiveUpReveal(state.target.name));
  };

  const handleNewGame = () => {
    newGame();
    setMascotMessage(getHeidiWelcome());
    setHeat(null);
    setBanner(null);
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <HeidiWorldView guesses={guesses} foundCountry={won || answerRevealed ? target : null} />
        <div className="space-y-6">
          <HeidiMascot
            message={mascotMessage}
            heat={won || answerRevealed ? null : heat}
            celebrate={won}
            winFlagCode={won ? target.code : null}
          />

          {banner && (
            <p className="rounded-brand border border-ui-red bg-red-50 px-4 py-2 text-center text-sm text-red-900">
              {banner}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="w-full sm:min-w-0 sm:flex-1">
              <CountrySearch
                disabled={roundLocked}
                excludedCodes={excluded}
                onPick={onPick}
                disabledPlaceholder={
                  won ? "You found Heidi!" : answerRevealed ? "Answer revealed — New game to play again" : undefined
                }
              />
            </div>
            <button
              type="button"
              onClick={handleGiveUp}
              disabled={roundLocked}
              className="w-full rounded-brand border-2 border-ui-gray bg-white px-4 py-3 font-display text-sm text-ui-charcoal shadow-brand hover:bg-ui-cream disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Reveal answer
            </button>
            <button
              type="button"
              onClick={handleNewGame}
              className="w-full rounded-brand border-2 border-ui-gray bg-white px-5 py-3 font-display shadow-brand hover:bg-ui-cream sm:w-auto"
            >
              New game
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-brand border-2 border-discovery-green bg-green-50 p-6 text-center shadow-brand"
          >
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-ui-gray bg-white shadow-sm">
                <Image
                  src={`https://flagcdn.com/w80/${target.code}.png`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="text-left sm:text-center">
                <p className="font-display text-2xl text-green-900">You found Heidi!</p>
                <p className="mt-1 text-green-800">
                  She was in <strong>{target.name}</strong>. Play again for a new hiding spot.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {answerRevealed && !won && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-brand border-2 border-heidi-orange/40 bg-amber-50 p-6 text-center shadow-brand"
          >
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-ui-gray bg-white shadow-sm">
                <Image
                  src={`https://flagcdn.com/w80/${target.code}.png`}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="text-left sm:text-center">
                <p className="font-display text-xl text-amber-950">Here&apos;s where I was hiding</p>
                <p className="mt-1 text-amber-900">
                  <strong>{target.name}</strong> — try a new game when you&apos;re ready!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section>
        <h2 className="font-display text-xl text-ui-charcoal">Your guesses</h2>
        <p className="mt-1 text-sm text-ui-charcoal/70">
          Closest to Heidi at the top — colours go from frosty blue (far) through yellow and orange to deep red
          (close).
        </p>

        {guesses.length === 0 ? (
          <p className="mt-4 text-ui-charcoal/60">No guesses yet. Pick a country to begin!</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {sorted.map((g) => (
              <li
                key={g.country.code}
                className="flex flex-wrap items-center gap-3 rounded-brand border border-ui-gray px-3 py-2 shadow-sm"
                style={{ backgroundColor: distanceToHeatBg(g.distanceKm) }}
              >
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded border border-ui-gray bg-white">
                  <Image
                    src={`https://flagcdn.com/w80/${g.country.code}.png`}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <span className="min-w-0 flex-1 font-display text-ui-charcoal">{g.country.name}</span>
                <span
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: distanceToHeatColor(g.distanceKm) }}
                >
                  {g.distanceKm.toLocaleString()} km
                </span>
                {g.country.code === target.code && (
                  <span className="rounded-full bg-discovery-green px-2 py-0.5 font-display text-xs text-white">
                    Here!
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-center text-xs text-ui-charcoal/50">
        Inspired by geography guessing games — distances use each country&apos;s reference point on the map, like a
        big game of warmer / colder.
      </p>
    </div>
  );
}
