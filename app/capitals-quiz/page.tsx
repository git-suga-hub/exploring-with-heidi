import type { Metadata } from "next";
import CapitalsQuizGame from "@/components/capitals-quiz/CapitalsQuizGame";

export const metadata: Metadata = {
  title: "Capital Cities",
  description: "Hard mode capitals game: no map labels, ask Heidi for clues, and hunt the correct capital city.",
};

export default function CapitalsQuizPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Capital City Hunt (Hard)</h1>
        <p className="max-w-3xl text-ui-charcoal/75">
          Heidi is hiding in a world capital city. There are no map labels in this mode, so use your geography instincts
          and ask Heidi for clues when you need help.
        </p>
      </header>
      <CapitalsQuizGame />
    </main>
  );
}
