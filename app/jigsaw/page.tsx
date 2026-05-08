import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map Jigsaw Geography Game for Kids",
  description:
    "A map jigsaw game for kids that builds country location skills, map confidence, and geography knowledge through puzzle play.",
  alternates: {
    canonical: "/jigsaw",
  },
};

const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "Map Jigsaw Geography Game for Kids",
  applicationCategory: "EducationalApplication",
  educationalUse: "Geography education",
  learningResourceType: "Game",
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  description:
    "A puzzle-style geography game where children place countries in the right positions and learn flags, capitals, and map skills.",
  url: "https://exploringwithheidi.com/jigsaw",
};

export default function JigsawPage() {
  return (
    <main className="container py-10">
      <h1 className="mb-4 font-display text-3xl text-ui-charcoal md:text-4xl">Map Jigsaw Geography Game for Kids</h1>
      <p className="max-w-3xl text-ui-charcoal/80">
        Our upcoming map jigsaw activity helps kids learn country shapes and locations by placing pieces on a world map.
        This teaches map-reading confidence, continent awareness, and capital city recall through gentle puzzle play.
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} />
    </main>
  );
}
