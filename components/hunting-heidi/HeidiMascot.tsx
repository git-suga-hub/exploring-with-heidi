"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";
import { useState } from "react";

const MASCOT_SRC = "/branding/heidi-mascot.png";

type Heat = "warmer" | "colder" | "same" | null;

type Props = {
  message: string;
  heat: Heat;
  celebrate?: boolean;
  /** ISO alpha-2 (lowercase) — when celebrating a win, show this flag waving beside Heidi */
  winFlagCode?: string | null;
};

export default function HeidiMascot({ message, heat, celebrate, winFlagCode }: Props) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
      <div
        className={cn(
          "relative flex shrink-0 flex-col items-center overflow-visible",
          celebrate && winFlagCode && "pr-12 md:pr-14"
        )}
      >
        <motion.div
          className="relative flex shrink-0"
          animate={celebrate ? { rotate: [0, -4, 4, -4, 0], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.6 }}
        >
          <div
            className={cn(
              "relative h-36 w-36 overflow-hidden rounded-2xl border-4 border-white shadow-brand md:h-40 md:w-40",
              "bg-black"
            )}
          >
            {!imgFailed ? (
              <Image
                src={MASCOT_SRC}
                alt="Heidi, the explorer mascot"
                fill
                className="object-contain object-bottom p-1"
                sizes="(max-width: 768px) 144px, 160px"
                priority
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div
                className="flex h-full items-center justify-center bg-gradient-to-br from-heidi-yellow to-heidi-orange text-4xl"
                aria-hidden
              >
                🧭
              </div>
            )}
          </div>
          <span className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 rounded-full bg-explorer-deep px-2 py-0.5 font-display text-xs text-white shadow-sm">
            Heidi
          </span>
        </motion.div>

        {celebrate && winFlagCode && (
          <motion.div
            className="absolute -right-1 top-2 z-20 origin-bottom md:-right-2 md:top-3"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 18 }}
            aria-hidden
          >
            <motion.div
              className="relative h-14 w-[4.5rem] overflow-hidden rounded-md border-2 border-white shadow-brand md:h-16 md:w-[5.25rem]"
              animate={{ rotate: [0, 16, -12, 10, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.35, ease: "easeInOut" }}
            >
              <Image
                src={`https://flagcdn.com/w160/${winFlagCode}.png`}
                alt=""
                fill
                className="object-cover"
                sizes="84px"
              />
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="relative min-w-0 flex-1">
        {heat && (
          <div
            className={cn(
              "mb-2 inline-flex rounded-full px-3 py-1 font-display text-xs font-bold uppercase tracking-wide",
              heat === "warmer" && "bg-orange-100 text-orange-900",
              heat === "colder" && "bg-sky-100 text-sky-900",
              heat === "same" && "bg-ui-gray text-ui-charcoal"
            )}
          >
            {heat === "warmer" && "Warmer"}
            {heat === "colder" && "Colder"}
            {heat === "same" && "Same distance"}
          </div>
        )}
        <div className="relative rounded-brand border-2 border-explorer-blue bg-white px-5 py-4 shadow-brand">
          <div
            className="absolute -left-2 top-6 hidden h-4 w-4 rotate-45 border-b-2 border-l-2 border-explorer-blue bg-white md:block"
            aria-hidden
          />
          <p className="font-display text-base leading-relaxed text-ui-charcoal md:text-lg md:leading-snug">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
