"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import cn from "classnames";
import HeidiFlatMap from "@/components/hunting-heidi/HeidiFlatMap";
import type { HeidiGuess } from "@/stores/huntingHeidiStore";
import type { Country } from "@/lib/countries";

const HeidiGlobe = dynamic(() => import("@/components/hunting-heidi/HeidiGlobe"), {
  ssr: false,
  loading: () => (
    <div
      className="flex w-full items-center justify-center bg-sky-100 text-sm text-explorer-deep"
      style={{ minHeight: 280 }}
    >
      Loading globe...
    </div>
  ),
});

type ViewMode = "globe" | "map";

export type LabelMode = "easy" | "medium" | "hard";

type Props = {
  guesses: HeidiGuess[];
  initialLabelMode?: LabelMode;
  lockLabelMode?: boolean;
  foundCountry?: Country | null;
};

const DIFFICULTY_OPTIONS: { value: LabelMode; label: string; hint: string }[] = [
  { value: "easy", label: "Easy", hint: "Country names always visible" },
  { value: "medium", label: "Medium", hint: "Names appear when you zoom in" },
  { value: "hard", label: "Hard", hint: "No country names shown" },
];

export default function HeidiWorldView({
  guesses,
  initialLabelMode = "easy",
  lockLabelMode = false,
  foundCountry = null,
}: Props) {
  const [mode, setMode] = useState<ViewMode>("globe");
  const [labelMode, setLabelMode] = useState<LabelMode>(initialLabelMode);

  return (
    <div className="w-full overflow-hidden rounded-brand border-2 border-explorer-blue/45 bg-gradient-to-b from-sky-100 via-cyan-50 to-white shadow-brand">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-explorer-blue/20 px-3 py-3">
        <span className="mr-1 font-display text-xs uppercase tracking-wide text-explorer-deep/75">View</span>
        <button
          type="button"
          onClick={() => setMode("globe")}
          className={cn(
            "rounded-full px-4 py-2 font-display text-sm transition",
            mode === "globe"
              ? "bg-explorer-blue text-white shadow-sm"
              : "bg-white text-explorer-deep hover:bg-sky-50"
          )}
        >
          3D globe
        </button>
        <button
          type="button"
          onClick={() => setMode("map")}
          className={cn(
            "rounded-full px-4 py-2 font-display text-sm transition",
            mode === "map"
              ? "bg-explorer-blue text-white shadow-sm"
              : "bg-white text-explorer-deep hover:bg-sky-50"
          )}
        >
          World map
        </button>

        {!lockLabelMode && (
          <>
            <span className="mx-1 hidden h-5 w-px bg-explorer-blue/20 sm:block" aria-hidden />

            <span className="mr-1 font-display text-xs uppercase tracking-wide text-explorer-deep/75">Difficulty</span>
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                title={opt.hint}
                onClick={() => setLabelMode(opt.value)}
                className={cn(
                  "rounded-full px-4 py-2 font-display text-sm transition",
                  labelMode === opt.value
                    ? "bg-heidi-orange text-white shadow-sm"
                    : "bg-white text-explorer-deep hover:bg-sky-50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="relative">
        {mode === "globe" ? (
          <HeidiGlobe
            guesses={guesses}
            embedded
            showFooter={false}
            labelMode={labelMode}
            foundCountry={foundCountry}
          />
        ) : (
          <HeidiFlatMap guesses={guesses} labelMode={labelMode} foundCountry={foundCountry} />
        )}
      </div>

      <p className="border-t border-explorer-blue/20 px-3 py-2 text-center text-[11px] leading-snug text-explorer-deep/80">
        {mode === "globe" ? (
          <>
            Drag to rotate - scroll to zoom - hover a country to see its name.
            {labelMode === "hard" && " No labels shown - test your knowledge!"}
            {labelMode === "easy" && " Country names shown on all countries."}
          </>
        ) : (
          <>
            Drag to pan - scroll to zoom - double-click to reset.
            {labelMode === "easy" && " Country names always visible."}
            {labelMode === "medium" && " Country names appear when you zoom in."}
            {labelMode === "hard" && " No country names - expert mode!"}
          </>
        )}
      </p>
    </div>
  );
}
