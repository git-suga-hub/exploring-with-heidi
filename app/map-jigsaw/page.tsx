import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map Jigsaw",
  description: "Drag countries on the map — coming soon on Exploring with Heidi.",
};

export default function MapJigsawPage() {
  return (
    <div className="container py-10">
      <h1 className="mb-4 font-display text-3xl">Map Jigsaw</h1>
      <p className="text-gray-700">
        Coming soon: pick a continent and drag each country into the right place. Snaps and hints help you learn
        geography.
      </p>

      <div className="mt-8 grid gap-4">
        <div className="rounded-[var(--radius-brand)] bg-white p-6 shadow-brand">
          <h2 className="font-display text-xl">Difficulty levels</h2>
          <ul className="ml-6 list-disc text-gray-700">
            <li>Easy: outlines visible</li>
            <li>Medium: outlines fade near correct position</li>
            <li>Hard: blank map</li>
          </ul>
        </div>

        <div className="rounded-[var(--radius-brand)] bg-white p-6 shadow-brand">
          <h2 className="font-display text-xl">Learning moments</h2>
          <p className="mt-1 text-gray-700">
            When you place a country, show its name, flag, capital, and a fun fact.
          </p>
        </div>
      </div>
    </div>
  );
}
