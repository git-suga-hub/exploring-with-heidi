"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import cn from "classnames";
import { COUNTRIES, UK_NATIONS, type Country } from "@/lib/countries";
import { getFlagImageUrl } from "@/lib/flags";

type RoundState = {
  countries: Country[];
  flags: Country[];
};

const PAIRS_PER_ROUND = 4;
const TOTAL_ROUNDS = 5;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRound(): RoundState {
  const pick = shuffle([...COUNTRIES, ...UK_NATIONS]).slice(0, PAIRS_PER_ROUND);
  return {
    countries: pick,
    flags: shuffle(pick),
  };
}

export default function FlagsMemoryMatch() {
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundState, setRoundState] = useState<RoundState>(() => buildRound());
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [roundScores, setRoundScores] = useState<number[]>([]);

  const connectedFlagCodes = useMemo(
    () => new Set(Object.values(connections)),
    [connections]
  );

  const allConnected = Object.keys(connections).length === PAIRS_PER_ROUND;

  const roundScore = useMemo(
    () =>
      roundState.countries.reduce((sum, country) => {
        return sum + (connections[country.code] === country.code ? 1 : 0);
      }, 0),
    [connections, roundState.countries]
  );

  const totalScore = roundScores.reduce((sum, score) => sum + score, 0);
  const gameFinished = roundScores.length === TOTAL_ROUNDS;

  function resetGame() {
    setRoundNumber(1);
    setRoundState(buildRound());
    setSelectedCountryCode(null);
    setConnections({});
    setRoundScores([]);
  }

  function selectCountry(countryCode: string) {
    if (gameFinished) return;
    setSelectedCountryCode(countryCode);
  }

  function connectToFlag(flagCode: string) {
    if (!selectedCountryCode || gameFinished) return;

    setConnections((prev) => {
      const next: Record<string, string> = { ...prev };

      for (const [countryCode, linkedFlag] of Object.entries(next)) {
        if (linkedFlag === flagCode) {
          delete next[countryCode];
          break;
        }
      }

      next[selectedCountryCode] = flagCode;
      return next;
    });
    setSelectedCountryCode(null);
  }

  function clearConnection(countryCode: string) {
    if (gameFinished) return;
    setConnections((prev) => {
      if (!prev[countryCode]) return prev;
      const next = { ...prev };
      delete next[countryCode];
      return next;
    });
  }

  function completeRound() {
    if (!allConnected || gameFinished) return;

    const nextRoundScores = [...roundScores, roundScore];
    setRoundScores(nextRoundScores);

    if (nextRoundScores.length === TOTAL_ROUNDS) {
      setSelectedCountryCode(null);
      return;
    }

    setRoundNumber((prev) => prev + 1);
    setRoundState(buildRound());
    setSelectedCountryCode(null);
    setConnections({});
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-brand border border-ui-gray bg-white px-4 py-3 shadow-brand">
        <p className="font-display text-sm text-ui-charcoal">Round {Math.min(roundNumber, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</p>
        <p className="text-sm text-ui-charcoal/70">
          Pick a country, then pick its matching flag to draw a line.
        </p>
        <button
          type="button"
          onClick={resetGame}
          className="rounded-full border border-ui-gray px-3 py-1 text-sm text-ui-charcoal hover:bg-ui-cream"
        >
          Restart
        </button>
      </div>

      {!gameFinished && (
        <div className="mb-4 rounded-brand border border-ui-gray bg-white px-4 py-3 text-sm text-ui-charcoal shadow-brand">
          <span className="font-display text-heidi-orange">Round score:</span> {roundScore} / {PAIRS_PER_ROUND}
        </div>
      )}

      {!gameFinished && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Country to flag match game">
          <div className="space-y-3">
            {roundState.countries.map((country) => {
              const linkedFlag = connections[country.code];
              const correct = linkedFlag === country.code;

              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => selectCountry(country.code)}
                  className={cn(
                    "flex min-h-[88px] w-full items-center rounded-brand border px-4 py-3 text-left shadow-brand transition sm:min-h-[96px]",
                    selectedCountryCode === country.code
                      ? "border-explorer-blue bg-explorer-blue text-white"
                      : "border-ui-gray bg-white text-ui-charcoal hover:bg-ui-cream",
                    linkedFlag && !correct && "border-heidi-orange",
                    linkedFlag && correct && "border-discovery-green"
                  )}
                >
                  <div>
                    <div className="font-display text-base sm:text-lg">{country.name}</div>
                    {linkedFlag && (
                      <div className="mt-1 text-xs opacity-80">
                        Connected {correct ? "correctly" : "to another flag"} - click a flag to change
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {roundState.flags.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => connectToFlag(country.code)}
                disabled={!selectedCountryCode}
                className={cn(
                  "relative block min-h-[88px] w-full overflow-hidden rounded-brand border bg-white p-0 shadow-brand transition sm:min-h-[96px]",
                  selectedCountryCode
                    ? "border-explorer-blue hover:brightness-95"
                    : "border-ui-gray opacity-80"
                )}
              >
                <div className="relative h-[88px] w-full bg-white sm:h-[96px]">
                  <Image
                    src={getFlagImageUrl(country.code, 320)}
                    alt={`Flag of ${country.name}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 90vw, 260px"
                  />
                </div>
                {connectedFlagCodes.has(country.code) && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white">
                    Linked
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {!gameFinished && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={completeRound}
            disabled={!allConnected}
            className={cn(
              "rounded-brand px-5 py-2 font-display text-white shadow-brand",
              allConnected
                ? "bg-heidi-orange hover:brightness-110"
                : "bg-gray-400"
            )}
          >
            End round
          </button>
          <p className="text-sm text-ui-charcoal/75">Connect all 4 countries before ending the round.</p>
        </div>
      )}

      {gameFinished && (
        <div className="rounded-brand border-2 border-discovery-green bg-green-50 p-6 text-center shadow-brand">
          <p className="font-display text-2xl text-green-900">Game complete!</p>
          <p className="mt-2 text-sm text-green-800">
            Total score after {TOTAL_ROUNDS} rounds: <strong>{totalScore}</strong> /{" "}
            {TOTAL_ROUNDS * PAIRS_PER_ROUND}
          </p>
          <p className="mt-2 text-sm text-green-800">
            Round scores: {roundScores.map((score, idx) => `R${idx + 1}: ${score}`).join(" · ")}
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="mt-4 rounded-brand bg-heidi-orange px-6 py-2 font-display text-white shadow-brand hover:brightness-110"
          >
            Play again
          </button>
        </div>
      )}

      {!gameFinished && Object.keys(connections).length > 0 && (
        <div className="mt-4 rounded-brand border border-ui-gray bg-white p-3 text-xs text-ui-charcoal/80 shadow-brand">
          {roundState.countries.map((country) =>
            connections[country.code] ? (
              <div key={country.code} className="mb-1 flex items-center justify-between gap-2">
                <span>
                  {country.name} connected to{" "}
                  {roundState.flags.find((f) => f.code === connections[country.code])?.name
                    ? "a flag"
                    : "a flag"}
                </span>
                <button
                  type="button"
                  onClick={() => clearConnection(country.code)}
                  className="rounded-full border border-ui-gray px-2 py-0.5 text-[11px] hover:bg-ui-cream"
                >
                  Remove line
                </button>
              </div>
            ) : null
          )}
        </div>
      )}
      <div className="mt-4 rounded-brand border border-ui-gray bg-white px-4 py-3 text-sm text-ui-charcoal shadow-brand">
        Total score so far: <strong>{totalScore}</strong>
      </div>
    </div>
  );
}
