import type { Metadata } from "next";
import CapitalRevealGame from "@/components/capital-reveal/CapitalRevealGame";

export const metadata: Metadata = {
  title: "Country Flag and Capital Learning Game",
  description:
    "A geography learning activity for kids: view a country flag, read the country name, and reveal the capital city.",
  alternates: {
    canonical: "/capital-reveal",
  },
};

const educationalAppSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalApplication",
  name: "Country Flag and Capital Learning Game",
  applicationCategory: "EducationalApplication",
  educationalUse: "Geography education",
  learningResourceType: "Game",
  isAccessibleForFree: true,
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
  },
  description:
    "A kid-friendly activity where learners see a country and flag first, then reveal and remember the capital city.",
  url: "https://exploringwithheidi.com/capital-reveal",
};

export default function CapitalRevealPage() {
  return (
    <main className="container space-y-6 py-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ui-charcoal md:text-4xl">Country Flag and Capital Learning Game</h1>
        <p className="max-w-3xl text-ui-charcoal/75">
          Start with the flag and country name. Say your guess out loud, then reveal the capital city to check and
          build memory over time.
        </p>
      </header>
      <CapitalRevealGame />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }} />
    </main>
  );
}
