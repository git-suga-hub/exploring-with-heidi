import type { Metadata } from "next";
import FlagsQuizClient from "@/components/flags-quiz/FlagsQuizClient";

export const metadata: Metadata = {
  title: "Flags Geography Games for Kids",
  description:
    "Kids can learn world flags and country names with family-friendly geography activities, flashcards, and quick games.",
  alternates: {
    canonical: "/flags",
  },
};

const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "Flags Geography Games for Kids",
  applicationCategory: "EducationalApplication",
  educationalUse: "Geography education",
  learningResourceType: "Game",
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  description:
    "A child-friendly flags game where kids learn country flags, country names, and world geography through flashcards and quizzes.",
  url: "https://exploringwithheidi.com/flags",
};

export default function FlagsPage() {
  return (
    <main className="container py-8">
      <header className="space-y-3">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Flags Geography Games for Kids</h1>
        <p className="max-w-3xl text-ui-charcoal/80">
          This flags activity helps children recognize country flags, connect them with country names, and build world
          geography knowledge through play. Families can start in Learn mode, then move to quick challenges when kids
          are ready.
        </p>
      </header>

      <section className="mt-6">
        <FlagsQuizClient initialMode="learn" />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} />
    </main>
  );
}
