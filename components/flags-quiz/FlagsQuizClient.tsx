"use client";

import { useState } from "react";
import cn from "classnames";
import FlagsQuickfire from "@/components/flags-quiz/FlagsQuickfire";
import FlagsFlashcards from "@/components/flags-quiz/FlagsFlashcards";
import FlagsMemoryMatch from "@/components/flags-quiz/FlagsMemoryMatch";

type Mode = "learn" | "quickfire" | "memory";

const tabs: { id: Mode; label: string; description: string }[] = [
  { id: "learn", label: "Learn", description: "Flashcards with facts" },
  { id: "quickfire", label: "Quickfire", description: "Multiple choice — build a streak" },
  { id: "memory", label: "Connect flags", description: "Connect each country text to the right flag" },
];

export default function FlagsQuizClient() {
  const [mode, setMode] = useState<Mode>("quickfire");

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setMode(t.id)}
            className={cn(
              "rounded-full px-4 py-2 font-display text-sm transition",
              mode === t.id
                ? "bg-explorer-blue text-white shadow-brand"
                : "bg-white text-ui-charcoal shadow-brand hover:bg-ui-cream"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="mb-4 text-sm text-ui-charcoal/80">
        {tabs.find((t) => t.id === mode)?.description}
      </p>

      {mode === "learn" && <FlagsFlashcards />}
      {mode === "quickfire" && <FlagsQuickfire />}
      {mode === "memory" && <FlagsMemoryMatch />}
    </div>
  );
}
