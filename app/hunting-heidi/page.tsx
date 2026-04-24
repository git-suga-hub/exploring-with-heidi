import type { Metadata } from "next";
import HuntingHeidiGame from "@/components/hunting-heidi/HuntingHeidiGame";

export const metadata: Metadata = {
  title: "Hunting Heidi",
  description:
    "Guess which country Heidi is hiding in - warmer and colder clues on a 3D globe and world map.",
};

export default function HuntingHeidiPage() {
  return (
    <div className="container py-8 md:py-10">
      <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Hunting Heidi</h1>
      <p className="mt-2 max-w-3xl text-gray-700">
        Heidi is hiding somewhere in the world and any country counts. Search above the globe, then use your guess list
        below the globe to get warmer and colder.
      </p>
      <p className="mt-3 inline-flex rounded-brand bg-ui-cream px-4 py-2 text-sm text-ui-charcoal/80">
        Best flow for tablets: search first, explore second, review guesses third.
      </p>

      <div className="mt-8 md:mt-10">
        <HuntingHeidiGame />
      </div>
    </div>
  );
}
