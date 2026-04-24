"use client";

import { useMemo, useState } from "react";
import cn from "classnames";
import HeidiWorldView from "@/components/hunting-heidi/HeidiWorldView";
import HeidiMascot from "@/components/hunting-heidi/HeidiMascot";
import { CAPITALS, findCapitalByName, getCapitalClue, getCapitalWinFact } from "@/lib/capitals";
import { COUNTRIES_BY_CODE } from "@/lib/countries";
import { useCapitalsGameStore } from "@/stores/capitalsGameStore";

export default function CapitalsQuizGame() {
  const target = useCapitalsGameStore((s) => s.target);
  const guesses = useCapitalsGameStore((s) => s.guesses);
  const won = useCapitalsGameStore((s) => s.won);
  const answerRevealed = useCapitalsGameStore((s) => s.answerRevealed);
  const cluesUsed = useCapitalsGameStore((s) => s.cluesUsed);
  const lastDistanceKm = useCapitalsGameStore((s) => s.lastDistanceKm);
  const guessCapital = useCapitalsGameStore((s) => s.guessCapital);
  const requestClue = useCapitalsGameStore((s) => s.requestClue);
  const revealAnswer = useCapitalsGameStore((s) => s.revealAnswer);
  const newGame = useCapitalsGameStore((s) => s.newGame);

  const [input, setInput] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [heidiLine, setHeidiLine] = useState(
    "Type a capital city. If you get stuck, press the clue button."
  );

  const worldGuesses = useMemo(
    () =>
      guesses
        .map((g) => {
          const country = COUNTRIES_BY_CODE[g.entry.countryCode];
          if (!country) return null;
          return { country, distanceKm: g.distanceKm };
        })
        .filter(Boolean) as { country: (typeof COUNTRIES_BY_CODE)[string]; distanceKm: number }[],
    [guesses]
  );

  const sortedGuesses = useMemo(
    () => [...guesses].sort((a, b) => a.distanceKm - b.distanceKm),
    [guesses]
  );
  const guessedCapitalNames = useMemo(
    () => new Set(guesses.map((g) => g.entry.capitalName.toLowerCase())),
    [guesses]
  );
  const filteredCapitals = useMemo(() => {
    const q = input.trim().toLowerCase();
    const candidates = q
      ? CAPITALS.filter(
          (c) =>
            c.capitalName.toLowerCase().includes(q) ||
            c.countryName.toLowerCase().includes(q)
        )
      : CAPITALS;
    return candidates
      .filter((c) => !guessedCapitalNames.has(c.capitalName.toLowerCase()))
      .slice(0, 10);
  }, [guessedCapitalNames, input]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBanner(null);
    const entry = findCapitalByName(input);
    if (!entry) {
      setBanner("I could not find that capital. Try exact city names like Lisbon or Tokyo.");
      return;
    }
    const result = guessCapital(entry);
    if (!result.ok) {
      setBanner(result.reason === "duplicate" ? "You already guessed that capital." : "Round finished - start a new game.");
      return;
    }
    setInput("");
    setOpenSuggestions(false);
    if (result.win) {
      setHeidiLine(getCapitalWinFact(target));
      return;
    }
    const latest = useCapitalsGameStore.getState().lastDistanceKm ?? 0;
    if (latest < 700) setHeidiLine("Very warm! You are close to my capital city now.");
    else if (latest < 1600) setHeidiLine("Warmer. Same region vibe - keep tightening your guesses.");
    else if (latest < 3500) setHeidiLine("Not bad, but you are still a few borders away.");
    else setHeidiLine("Cold guess. Try a different part of the world, then ask me for a clue.");
  };

  const askClue = () => {
    if (won || answerRevealed) return;
    const n = requestClue();
    setHeidiLine(getCapitalClue(target, n, lastDistanceKm));
  };

  const onReveal = () => {
    if (won || answerRevealed) return;
    revealAnswer();
    setHeidiLine(`I was hiding in ${target.capitalName}, ${target.countryName}. Try a new round!`);
  };

  const onNewGame = () => {
    newGame();
    setInput("");
    setOpenSuggestions(false);
    setBanner(null);
    setHeidiLine("New round! I am hiding in another capital. Ask for clues whenever you need help.");
  };

  return (
    <div className="space-y-8">
      <section className="rounded-brand border-2 border-heidi-orange/40 bg-gradient-to-b from-amber-50 to-white p-4 shadow-brand md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">1. Type a city</h2>
          <p className="rounded-full bg-heidi-orange px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Kid mode
          </p>
        </div>
        <div className="mb-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Type</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Guess</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ui-charcoal/80 shadow-sm">Learn</span>
        </div>
        <p className="mb-4 text-sm text-ui-charcoal/70">Type, press guess, then check your list below.</p>

        <div className="space-y-5">
          <HeidiMascot message={heidiLine} heat={null} celebrate={won} />

          {banner && (
            <p className="rounded-brand border border-ui-red bg-red-50 px-4 py-2 text-sm text-red-900">{banner}</p>
          )}

          <form onSubmit={onSubmit} className="space-y-3">
            <label htmlFor="capital-input" className="block font-display text-sm text-ui-charcoal">
              Capital city
            </label>
            <div className="relative">
              <input
                id="capital-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setOpenSuggestions(true);
                }}
                onFocus={() => setOpenSuggestions(true)}
                onBlur={() => setTimeout(() => setOpenSuggestions(false), 180)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setOpenSuggestions(false);
                  if (e.key === "Enter") {
                    const best = filteredCapitals[0];
                    if (best && input.trim().length > 0) {
                      e.preventDefault();
                      setInput(best.capitalName);
                      setOpenSuggestions(false);
                    }
                  }
                }}
                placeholder="Try: Tokyo"
                autoComplete="off"
                disabled={won || answerRevealed}
                className="w-full rounded-brand border-2 border-ui-gray bg-white px-4 py-3 text-xl text-ui-charcoal shadow-sm outline-none transition focus:border-explorer-blue"
              />

              {openSuggestions && !won && !answerRevealed && filteredCapitals.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-brand border border-ui-gray bg-white py-1 shadow-lg"
                >
                  {filteredCapitals.map((c) => (
                    <li key={`${c.countryCode}-${c.capitalName}`}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setInput(c.capitalName);
                          setOpenSuggestions(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-ui-cream"
                        )}
                      >
                        <span className="font-display">{c.capitalName}</span>
                        <span className="text-xs text-ui-charcoal/60">{c.countryName}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 md:flex md:flex-wrap">
              <button
                type="submit"
                disabled={won || answerRevealed}
                className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-explorer-blue bg-explorer-blue px-4 py-3 font-display text-lg text-white shadow-brand disabled:opacity-60 md:w-auto"
              >
                <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs text-explorer-blue">GO</span>
                Guess
              </button>
              <button
                type="button"
                onClick={askClue}
                className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-heidi-orange bg-amber-50 px-4 py-3 font-display text-lg text-ui-charcoal shadow-brand hover:bg-amber-100 md:w-auto"
              >
                <span className="rounded-full bg-white px-2 py-0.5 text-xs">?</span>
                Clue
              </button>
              <button
                type="button"
                onClick={onReveal}
                disabled={won || answerRevealed}
                className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-ui-gray bg-white px-4 py-3 font-display text-lg text-ui-charcoal shadow-brand hover:bg-ui-cream disabled:opacity-60 md:w-auto"
              >
                <span className="rounded-full bg-ui-cream px-2 py-0.5 text-xs">SEE</span>
                Show me
              </button>
              <button
                type="button"
                onClick={onNewGame}
                className="flex w-full items-center justify-center gap-2 rounded-brand border-2 border-discovery-green bg-green-50 px-4 py-3 font-display text-lg text-ui-charcoal shadow-brand hover:bg-green-100 md:w-auto"
              >
                <span className="rounded-full bg-white px-2 py-0.5 text-xs">GO</span>
                Again
              </button>
            </div>
          </form>

          <p className="text-base text-ui-charcoal/65">Hard mode rule: no country names on map or globe.</p>
          <p className="text-base text-ui-charcoal/65">Clues asked this round: {cluesUsed}</p>
          {answerRevealed && !won && (
            <div className="rounded-brand border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Answer revealed: <strong>{target.capitalName}</strong>, {target.countryName}.
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">2. Look at the globe</h2>
        <HeidiWorldView guesses={worldGuesses} initialLabelMode="hard" lockLabelMode />
      </section>

      <section>
        <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">3. Guess list</h2>
        {sortedGuesses.length === 0 ? (
          <p className="mt-2 rounded-brand border border-ui-gray bg-white px-4 py-3 text-ui-charcoal/70">
            No guesses yet. Try your first capital above.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {sortedGuesses.map((g) => (
              <li
                key={`${g.entry.countryCode}-${g.entry.capitalName}`}
                className="flex items-center justify-between gap-4 rounded-brand border border-ui-gray bg-white px-3 py-3 shadow-sm"
              >
                <span className="font-display text-lg text-ui-charcoal">
                  {g.entry.capitalName}, {g.entry.countryName}
                </span>
                <span className="font-mono text-base tabular-nums text-ui-charcoal/80">{g.distanceKm.toLocaleString()} km</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
