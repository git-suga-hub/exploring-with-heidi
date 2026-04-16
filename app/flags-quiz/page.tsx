import type { Metadata } from "next";
import FlagsQuizClient from "@/components/flags-quiz/FlagsQuizClient";

export const metadata: Metadata = {
  title: "Flags Quiz",
  description: "Learn world flags with flashcards, quickfire questions, and memory match — Exploring with Heidi.",
};

export default function FlagsQuizPage() {
  return (
    <div className="container py-6">
      <h1 className="font-display text-2xl text-ui-charcoal sm:text-3xl">Flags Quiz</h1>
      <p className="mt-1 max-w-2xl text-sm text-gray-700 sm:text-base">
        Learn world flags with flashcards, then test yourself in quickfire mode.
      </p>

      <div className="mt-6">
        <FlagsQuizClient />
      </div>
    </div>
  );
}
