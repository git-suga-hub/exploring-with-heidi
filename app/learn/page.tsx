import type { Metadata } from "next";
import GameCard from "@/components/GameCard";

export const metadata: Metadata = {
  title: "Learn Geography for Kids",
  description:
    "A step-by-step learning path for kids: start with flags, then reveal capitals, then move to challenge activities.",
  alternates: {
    canonical: "/learn",
  },
};

export default function LearnPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Learn Geography Step by Step</h1>
        <p className="max-w-3xl text-ui-charcoal/80">
          This guided path helps young children build confidence before challenge games. Start at step 1 and move in order.
        </p>
      </header>

      <section className="rounded-2xl border-2 border-discovery-green/40 bg-green-50 p-5 shadow-sm">
        <h2 className="font-display text-2xl text-ui-charcoal">Recommended order</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-ui-charcoal/85">
          <li>Flags Learning</li>
          <li>Capital Reveal</li>
          <li>Capital Cities Challenge</li>
        </ol>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <GameCard
          href="/flags"
          title="Step 1: Flags Learning"
          description="Learn world flags and country names with child-friendly flashcards."
          status="Start here"
          icon={<span aria-hidden>S1</span>}
          className="bg-gradient-to-b from-white to-sky-50"
        />

        <GameCard
          href="/capital-reveal"
          title="Step 2: Capital Reveal"
          description="See country + flag first, then reveal and remember the capital city."
          status="Next step"
          icon={<span aria-hidden>S2</span>}
          className="bg-gradient-to-b from-white to-indigo-50"
        />

        <GameCard
          href="/capitals"
          title="Step 3: Capital Challenge"
          description="Use clues and guesses to practice capital cities in a game format."
          status="Practice"
          icon={<span aria-hidden>S3</span>}
          className="bg-gradient-to-b from-white to-rose-50"
        />
      </div>
    </main>
  );
}

