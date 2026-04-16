"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import cn from "classnames";
import { COUNTRIES, UK_NATIONS, type Country } from "@/lib/countries";
import { getFlagImageUrl } from "@/lib/flags";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlagsFlashcards() {
  const deck = useMemo(() => shuffle([...COUNTRIES, ...UK_NATIONS]), []);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card: Country | undefined = deck[index];

  const go = (delta: number) => {
    setFlipped(false);
    setIndex((i) => (i + delta + deck.length) % deck.length);
  };

  if (!card) return null;

  return (
    <div className="mx-auto max-w-md">
      <p className="mb-4 text-center text-sm text-ui-charcoal/80">
        Tap the card to see the country name and a fun fact.
      </p>

      <motion.button
        type="button"
        layout
        onClick={() => setFlipped(!flipped)}
        className="relative w-full overflow-hidden rounded-brand border-2 border-ui-gray bg-white shadow-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-explorer-blue"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="relative aspect-[3/2] w-full bg-white">
          {!flipped ? (
            <Image
              src={getFlagImageUrl(card.code, 640)}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          ) : (
            <div className="flex h-full min-h-[200px] flex-col justify-center gap-3 bg-gradient-to-br from-explorer-deep to-explorer-blue p-6 text-left text-white">
              <h3 className="font-display text-2xl">{card.name}</h3>
              <p className="text-sm leading-relaxed text-white/95">{card.fact}</p>
              <p className="text-xs text-white/70">{card.continent}</p>
            </div>
          )}
        </div>
        <div
          className={cn(
            "border-t border-ui-gray px-4 py-2 text-center text-xs text-ui-charcoal/70",
            flipped && "bg-ui-cream"
          )}
        >
          {flipped ? "Tap again to hide" : "Tap to reveal"}
        </div>
      </motion.button>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-brand border border-ui-gray bg-white px-4 py-2 font-display shadow-brand hover:bg-ui-cream"
        >
          ← Previous
        </button>
        <span className="font-display text-sm text-ui-charcoal/70">
          {index + 1} / {deck.length}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-brand border border-ui-gray bg-white px-4 py-2 font-display shadow-brand hover:bg-ui-cream"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
