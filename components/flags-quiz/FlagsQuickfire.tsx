"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import type { Country } from "@/lib/countries";
import { buildChoices, randomCountry, COUNTRIES, UK_NATIONS } from "@/lib/countries";
import { useFlagsQuickfireStore } from "@/stores/flagsQuickfireStore";
import { getFlagImageUrl } from "@/lib/flags";

const FLAGS_POOL = [...COUNTRIES, ...UK_NATIONS];

export default function FlagsQuickfire() {
  const { streak, bestStreak, score, answered, registerCorrect, registerWrong, resetSession } =
    useFlagsQuickfireStore();

  const [current, setCurrent] = useState<Country | null>(null);
  const [choices, setChoices] = useState<Country[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [roundKey, setRoundKey] = useState(0);

  const nextRound = useCallback(() => {
    const c = randomCountry(FLAGS_POOL);
    setCurrent(c);
    setChoices(buildChoices(c, FLAGS_POOL));
    setPicked(null);
    setRoundKey((k) => k + 1);
  }, []);

  useEffect(() => {
    nextRound();
  }, [nextRound]);

  const onPick = useCallback(
    (code: string) => {
      if (!current || picked) return;
      setPicked(code);
      if (code === current.code) {
        registerCorrect();
      } else {
        registerWrong();
      }
    },
    [current, picked, registerCorrect, registerWrong]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (picked) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextRound();
        }
        return;
      }
      const n = Number.parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && choices[n - 1]) {
        e.preventDefault();
        onPick(choices[n - 1].code);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [picked, choices, nextRound, onPick]);

  const advance = () => {
    nextRound();
  };

  if (!current) return null;

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-brand border border-ui-gray bg-white px-3 py-2 shadow-brand">
        <div className="font-display text-sm text-ui-charcoal">
          <span className="text-heidi-orange">Score:</span> {score}{" "}
          <span className="text-ui-charcoal/60">/ {answered} answered</span>
        </div>
        <div className="font-display text-sm">
          <span className="text-discovery-green">Streak:</span> {streak}{" "}
          <span className="text-ui-charcoal/60">· best {bestStreak}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            resetSession();
            nextRound();
          }}
          className="rounded-full border border-ui-gray px-3 py-1 text-sm text-ui-charcoal hover:bg-ui-cream"
        >
          Reset
        </button>
      </div>

      <p className="mb-1 text-center font-display text-base text-ui-charcoal">Which country is this?</p>
      <p className="mb-3 text-center text-xs text-ui-charcoal/60">
        Tip: press 1–4 to pick · Enter for next flag
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={roundKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden rounded-brand border-2 border-ui-gray bg-white shadow-brand"
        >
          <div className="relative aspect-[3/2] w-full bg-ui-gray/20">
            <Image
              src={getFlagImageUrl(current.code, 640)}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 448px"
              priority
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {choices.map((c) => {
          const isSelected = picked === c.code;
          const isCorrect = picked && c.code === current.code;
          const isWrongPick = picked && isSelected && c.code !== current.code;
          return (
            <motion.button
              key={c.code}
              type="button"
              disabled={!!picked}
              onClick={() => onPick(c.code)}
              whileTap={{ scale: picked ? 1 : 0.98 }}
              className={cn(
                "rounded-brand border-2 px-3 py-2 text-left font-display text-sm text-ui-charcoal transition",
                !picked && "border-ui-gray bg-white hover:border-explorer-blue hover:bg-ui-cream",
                isCorrect && "border-discovery-green bg-green-50",
                isWrongPick && "border-ui-red bg-red-50"
              )}
            >
              {c.name}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-col items-center gap-2"
          >
            <p className="text-center text-sm text-ui-charcoal">
              {picked === current.code ? (
                <span className="font-display text-discovery-green">Nice! That’s {current.name}.</span>
              ) : (
                <span>
                  The answer was <strong>{current.name}</strong>.
                </span>
              )}
            </p>
            <motion.button
              type="button"
              onClick={advance}
              className="rounded-brand bg-heidi-orange px-7 py-2 font-display text-white shadow-brand hover:brightness-110"
              whileHover={{ scale: 1.02 }}
            >
              Next flag
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
