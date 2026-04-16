import type { Metadata } from "next";
import HuntingHeidiGame from "@/components/hunting-heidi/HuntingHeidiGame";

export const metadata: Metadata = {
  title: "Hunting Heidi",
  description:
    "Guess which country Heidi is hiding in — warmer and colder clues on a 3D globe and world map.",
};

export default function HuntingHeidiPage() {
  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl text-ui-charcoal">Hunting Heidi</h1>
      <p className="mt-2 max-w-2xl text-gray-700">
        Heidi is hiding somewhere in the world — any country counts! Guess a country — each
        guess shows how far you are from her. Listen for warmer and colder clues, and watch Heidi tease you
        along the way!
      </p>

      <div className="mt-10">
        <HuntingHeidiGame />
      </div>
    </div>
  );
}
