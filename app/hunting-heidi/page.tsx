import type { Metadata } from "next";
import HuntingHeidiGame from "@/components/hunting-heidi/HuntingHeidiGame";

export const metadata: Metadata = {
  title: "Hunting Heidi Geography Game for Kids",
  description:
    "A world geography guessing game for kids where children use warmer and colder clues to find Heidi's hidden country.",
  alternates: {
    canonical: "/hunting-heidi",
  },
};

const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "Hunting Heidi Geography Game for Kids",
  applicationCategory: "EducationalApplication",
  educationalUse: "Geography education",
  learningResourceType: "Game",
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  description:
    "A child-friendly geography game that teaches world country awareness through clues, guessing, and map feedback.",
  url: "https://exploringwithheidi.com/hunting-heidi",
};

export default function HuntingHeidiPage() {
  return (
    <main className="container py-8 md:py-10">
      <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Hunting Heidi Geography Game for Kids</h1>
      <p className="mt-2 max-w-3xl text-gray-700">
        Heidi is hiding somewhere in the world and any country counts. Search above the globe, then use your guess list
        below the globe to get warmer and colder.
      </p>
      <p className="mt-3 max-w-3xl text-gray-700">
        This game builds geography skills by helping children compare distances between countries, spot world regions,
        and talk through map clues as a team.
      </p>
      <p className="mt-3 inline-flex rounded-brand bg-ui-cream px-4 py-2 text-sm text-ui-charcoal/80">
        Best flow for tablets: search first, explore second, review guesses third.
      </p>

      <div className="mt-8 md:mt-10">
        <HuntingHeidiGame />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} />
    </main>
  );
}
