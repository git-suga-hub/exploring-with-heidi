import type { Metadata } from "next";
import CapitalRevealGame from "@/components/capital-reveal/CapitalRevealGame";

export const metadata: Metadata = {
  title: "Country, Flag, Capital",
  description: "A simple learning game for youngsters: see the flag and country, then reveal the capital city.",
};

export default function CapitalRevealPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Country + Flag + Capital</h1>
        <p className="max-w-3xl text-ui-charcoal/75">
          Start with the flag and country name. Say your guess out loud, then reveal the capital city to check.
        </p>
      </header>
      <CapitalRevealGame />
    </main>
  );
}
