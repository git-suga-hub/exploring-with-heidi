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
        setBanner("You already guessed that country. Try another one!");
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
    <div className="space-y-8">
      <section className="rounded-brand border-2 border-explorer-blue/40 bg-gradient-to-b from-cyan-50 to-white p-4 shadow-brand md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">1. Pick a country</h2>
          <p className="rounded-full bg-explorer-blue px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Kid mode
          </p>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Pick</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Watch</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Try again</span>
        </div>
        <p className="mb-4 text-sm text-ui-charcoal/70">Do one step at a time. You can always press play again.</p>

        <div className="space-y-5">
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

          <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end">
            <div className="w-full md:min-w-0 md:flex-1">
              <CountrySearch
                disabled={roundLocked}
                excludedCodes={excluded}
                onPick={onPick}
                disabledPlaceholder={
                  won ? "You found Heidi!" : answerRevealed ? "Answer revealed - start a new game" : undefined
                }
              />
            </div>
            <button
              type="button"
              onClick={handleGiveUp}
              disabled={roundLocked}
              className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-heidi-orange bg-amber-50 px-4 py-3 font-display text-base text-ui-charcoal shadow-brand hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              <span className="rounded-full bg-white px-2 py-0.5 text-xs">?</span>
              Show me
            </button>
            <button
              type="button"
              onClick={handleNewGame}
              className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-discovery-green bg-green-50 px-5 py-3 font-display text-base text-ui-charcoal shadow-brand hover:bg-green-100 md:w-auto"
            >
              <span className="rounded-full bg-white px-2 py-0.5 text-xs">GO</span>
              Play again
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">2. Look at the globe</h2>
        <HeidiWorldView guesses={guesses} foundCountry={won || answerRevealed ? target : null} />
      </section>

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
                <p className="font-display text-xl text-amber-950">Here is where I was hiding</p>
                <p className="mt-1 text-amber-900">
                  <strong>{target.name}</strong> - try a new game when you are ready!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section>
        <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">3. Your guess list</h2>
        <p className="mt-1 text-base text-ui-charcoal/70">
          Closest to Heidi at the top - colors go from frosty blue (far) through yellow and orange to deep red
          (close).
        </p>

        {guesses.length === 0 ? (
          <p className="mt-4 rounded-brand border border-ui-gray bg-white px-4 py-3 text-ui-charcoal/70">
            No guesses yet. Pick your first country above.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {sorted.map((g) => (
              <li
                key={g.country.code}
                className="flex flex-wrap items-center gap-3 rounded-brand border border-ui-gray px-3 py-3 shadow-sm"
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
                <span className="min-w-0 flex-1 font-display text-lg text-ui-charcoal">{g.country.name}</span>
                <span
                  className="font-mono text-base font-bold tabular-nums"
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
        Inspired by geography guessing games - distances use each country&apos;s reference point on the map, like a
        big game of warmer and colder.
      </p>
    </div>
  );
}
