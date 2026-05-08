import type { Metadata } from "next";
import CapitalsQuizGame from "@/components/capitals-quiz/CapitalsQuizGame";

export const metadata: Metadata = {
  title: "Capital Cities Geography Game for Kids",
  description:
    "Practice capital cities in a playful world geography game for kids with clues, guesses, and family learning moments.",
  alternates: {
    canonical: "/capitals",
  },
};

const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "Capital Cities Geography Game for Kids",
  applicationCategory: "EducationalApplication",
  educationalUse: "Geography education",
  learningResourceType: "Game",
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  description:
    "An educational capitals game where children guess world capital cities and learn through clues and distance-based feedback.",
  url: "https://exploringwithheidi.com/capitals",
};

export default function CapitalsPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Capital Cities Geography Game for Kids</h1>
        <p className="max-w-3xl text-ui-charcoal/80">
          Children practice capital cities by making guesses, reading clues, and learning where each city sits in the
          world. It is designed for shared learning at home or in class, with clear steps and tablet-friendly controls.
        </p>
      </header>

      <CapitalsQuizGame />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} />
    </main>
  );
}
