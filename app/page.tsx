import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import GameCard from "@/components/GameCard";

export const metadata: Metadata = {
  title: "Geography Games for Kids",
  description:
    "Family-friendly geography games for kids to learn flags, capitals, and world map skills through playful activities.",
  alternates: {
    canonical: "/",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Exploring with Heidi",
  url: "https://exploringwithheidi.com/",
  description: "Geography games for kids and families with flags, capitals, and map-based learning.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Where should first-time players start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with Learn Geography. Begin with Flags Learning, then move to Capital Reveal for step-by-step practice.",
      },
    },
    {
      "@type": "Question",
      name: "Are these games suitable for tablet use with young children?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The layout is tablet-first with large tap targets and clear sections for adult-supervised use.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="pb-14">
      <section className="container pt-7 md:pt-10">
        <div className="grid gap-6 rounded-2xl border-2 border-explorer-blue/30 bg-gradient-to-br from-sky-100 via-ui-cream to-yellow-100 p-6 shadow-brand md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:items-center md:p-8">
          <div>
            <p className="inline-flex min-h-10 items-center rounded-full bg-white/90 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/80">
              Welcome explorers
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ui-charcoal md:text-5xl">
              Geography Games for Kids and Families
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ui-charcoal/85 md:text-xl">
              Learn flags, capitals, and world map skills in short, friendly activities children can play with adult support.
            </p>
            <p className="mt-3 rounded-xl border border-explorer-blue/30 bg-white/80 px-4 py-3 text-sm text-ui-charcoal/80">
              Adult tip: start with <strong>Learn Geography</strong> for first-time players.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/learn"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-heidi-orange px-6 py-3 font-display text-lg text-white shadow-brand transition hover:brightness-105"
              >
                Start Learning
              </Link>
              <Link
                href="/games"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-explorer-blue/40 bg-white px-6 py-3 font-display text-lg text-ui-charcoal transition hover:bg-sky-50"
              >
                Play Games
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-sm font-bold text-ui-charcoal shadow-sm">
              New adventures weekly
            </div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-explorer-blue/30 bg-white p-4 shadow-brand">
              <div className="relative mx-auto h-56 w-full max-w-[16rem] md:h-64">
                <Image
                  src="/branding/heidi-mascot.png"
                  alt="Heidi explorer mascot for kids geography games"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 260px, 300px"
                  priority
                />
              </div>
              <p className="mt-2 text-center text-lg font-bold text-ui-charcoal">Heidi is ready to guide your trip</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-10" aria-label="Start paths">
        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/learn"
            className="block rounded-2xl border-2 border-discovery-green/45 bg-gradient-to-b from-white to-green-50 p-6 shadow-brand transition hover:-translate-y-1"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-ui-charcoal/70">Path 1</p>
            <h2 className="mt-2 font-display text-3xl text-ui-charcoal">Learn Geography</h2>
            <p className="mt-2 text-lg text-ui-charcoal/85">Start calm and guided: flags first, then capitals.</p>
            <p className="mt-4 inline-flex rounded-xl bg-discovery-green px-4 py-2 font-display text-white">Start learning</p>
          </Link>

          <Link
            href="/games"
            className="block rounded-2xl border-2 border-heidi-orange/45 bg-gradient-to-b from-white to-amber-50 p-6 shadow-brand transition hover:-translate-y-1"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-ui-charcoal/70">Path 2</p>
            <h2 className="mt-2 font-display text-3xl text-ui-charcoal">Play Geography Games</h2>
            <p className="mt-2 text-lg text-ui-charcoal/85">Try challenge rounds when children are ready for faster play.</p>
            <p className="mt-4 inline-flex rounded-xl bg-heidi-orange px-4 py-2 font-display text-white">Open games</p>
          </Link>
        </div>
      </section>

      <section className="container mt-12 md:mt-14" id="adventures">
        <div className="mb-5">
          <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Popular Right Now</h2>
          <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/85">
            Quick picks for shared play. For new learners, begin in the Learn Geography path above.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <GameCard
            href="/flags"
            title="Flags Learning"
            description="Learn country flags and names with guided flashcards."
            status="Recommended first"
            icon={<span aria-hidden>FL</span>}
            className="bg-gradient-to-b from-white to-sky-50"
          />

          <GameCard
            href="/capital-reveal"
            title="Capital Reveal"
            description="See a country and flag first, then reveal the capital city."
            status="Step 2"
            icon={<span aria-hidden>CR</span>}
            className="bg-gradient-to-b from-white to-indigo-50"
          />

          <GameCard
            href="/hunting-heidi"
            title="Find Heidi"
            description="Guess where Heidi is hiding with warmer and colder clues."
            status="Challenge"
            icon={<span aria-hidden>HH</span>}
            className="bg-gradient-to-b from-white to-amber-50"
          />
        </div>
      </section>

      <section className="container mt-12 md:mt-14">
        <div className="rounded-2xl border-2 border-explorer-blue/30 bg-white p-6 shadow-brand md:p-8">
          <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Geography Games for Kids FAQ</h2>
          <div className="mt-4 space-y-4 text-ui-charcoal/85">
            <div>
              <h3 className="font-display text-xl">Where should we start?</h3>
              <p>Open Learn Geography and begin with Flags Learning, then move to Capital Reveal.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">Can children use this with a parent or teacher?</h3>
              <p>Yes. Activities are designed for adult-supervised play at home or in class.</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}

