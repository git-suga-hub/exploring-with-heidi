"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CAPITALS, type CapitalEntry } from "@/lib/capitals";
import { getFlagImageUrl } from "@/lib/flags";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CapitalRevealGame() {
  const deck = useMemo(() => shuffle(CAPITALS), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card: CapitalEntry | undefined = deck[index];
  if (!card) return null;

  const go = (delta: number) => {
    setRevealed(false);
    setIndex((i) => (i + delta + deck.length) % deck.length);
  };

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border-2 border-explorer-blue/35 bg-white p-5 shadow-brand md:p-6">
      <p className="text-sm text-ui-charcoal/75">
        Look at the flag and country first, then reveal the capital city when you are ready.
      </p>

      <div className="mt-4 overflow-hidden rounded-2xl border border-ui-gray bg-ui-cream">
        <div className="relative aspect-[16/10] w-full bg-white">
          <Image
            src={getFlagImageUrl(card.countryCode, 640)}
            alt={`Flag of ${card.countryName}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-ui-gray bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-ui-charcoal/60">Country</p>
        <h2 className="mt-1 font-display text-3xl text-ui-charcoal">{card.countryName}</h2>
        <p className="mt-2 text-sm text-ui-charcoal/70">{card.continent}</p>
      </div>

      <div className="mt-4 rounded-2xl border-2 border-heidi-orange/35 bg-amber-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-ui-charcoal/70">Capital City</p>
        {revealed ? (
          <p className="mt-2 font-display text-3xl text-ui-charcoal">{card.capitalName}</p>
        ) : (
          <p className="mt-2 text-lg text-ui-charcoal/75">Tap reveal to check your answer.</p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-xl border border-ui-gray bg-white px-4 py-3 font-display text-ui-charcoal hover:bg-ui-cream"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="rounded-xl border-2 border-heidi-orange bg-heidi-orange px-4 py-3 font-display text-white hover:brightness-105"
        >
          {revealed ? "Hide capital" : "Reveal capital"}
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-xl border border-ui-gray bg-white px-4 py-3 font-display text-ui-charcoal hover:bg-ui-cream"
        >
          Next
        </button>
      </div>

      <p className="mt-4 text-center text-sm text-ui-charcoal/65">
        Card {index + 1} of {deck.length}
      </p>
    </section>
  );
}
