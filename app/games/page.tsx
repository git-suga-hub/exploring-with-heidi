import type { Metadata } from "next";
import GameCard from "@/components/GameCard";

export const metadata: Metadata = {
  title: "Geography Games for Kids",
  description:
    "Challenge-style geography games for kids, including Find Heidi, capitals practice, and map puzzle activities.",
  alternates: {
    canonical: "/games",
  },
};

export default function GamesPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Play Geography Games</h1>
        <p className="max-w-3xl text-ui-charcoal/80">
          These challenge games are best after children complete the learning path, with adult support where needed.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        <GameCard
          href="/hunting-heidi"
          title="Find Heidi"
          description="Guess countries with warmer and colder clues on the world map."
          status="Popular"
          icon={<span aria-hidden>G1</span>}
          className="bg-gradient-to-b from-white to-amber-50"
        />

        <GameCard
          href="/capitals"
          title="Capital Challenge"
          description="Type capital city guesses and use clues to improve accuracy."
          status="Challenge"
          icon={<span aria-hidden>G2</span>}
          className="bg-gradient-to-b from-white to-rose-50"
        />

        <GameCard
          href="/flags"
          title="Flags Quiz Modes"
          description="Switch from learning flashcards into quickfire and memory challenges."
          status="Mixed"
          icon={<span aria-hidden>G3</span>}
          className="bg-gradient-to-b from-white to-sky-50"
        />

        <GameCard
          href="/jigsaw"
          title="Map Jigsaw"
          description="Puzzle-style geography game with continent and country placement practice."
          status="Coming soon"
          icon={<span aria-hidden>G4</span>}
          className="bg-gradient-to-b from-white to-green-50"
        />
      </div>
    </main>
  );
}

