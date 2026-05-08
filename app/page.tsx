import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import GameCard from "@/components/GameCard";

const highlights = [
  {
    title: "Learn by playing",
    body: "Children explore countries through games, clues, and playful challenges.",
    tone: "bg-sky-100 border-explorer-blue/35",
    icon: "??",
  },
  {
    title: "Tablet first",
    body: "Big buttons and roomy layouts are easy to tap on iPad and tablets.",
    tone: "bg-yellow-100 border-heidi-yellow/55",
    icon: "??",
  },
  {
    title: "Family friendly",
    body: "Safe design, gentle language, and activities parents and children can do together.",
    tone: "bg-green-100 border-discovery-green/50",
    icon: "????????",
  },
] as const;

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
      name: "What age group is Exploring with Heidi for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Exploring with Heidi is designed for children in primary school and for family learning with parent support.",
      },
    },
    {
      "@type": "Question",
      name: "Do kids learn real geography facts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Children practice real country names, world flags, and capital cities through interactive geography games.",
      },
    },
    {
      "@type": "Question",
      name: "Can we use the games on tablets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The site is built tablet-first with large tap targets and clear layouts for shared learning.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="pb-14">
      <section className="container pt-7 md:pt-10">
        <div className="grid gap-6 rounded-2xl border-2 border-explorer-blue/30 bg-gradient-to-br from-sky-100 via-ui-cream to-yellow-100 p-6 shadow-brand md:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] md:items-center md:p-8">
          <div>
            <p className="inline-flex min-h-10 items-center rounded-full bg-white/90 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/80">
              Welcome explorers
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ui-charcoal md:text-5xl">
              Geography Games for Kids and Families
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ui-charcoal/85 md:text-xl">
              Explore flags, capitals, maps, and Heidi&apos;s hide and seek challenge. Tap, play, and learn together.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#adventures"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-heidi-orange px-6 py-3 font-display text-lg text-white shadow-brand transition hover:brightness-105"
              >
                Start exploring
              </Link>
              <Link
                href="/hunting-heidi"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-explorer-blue/40 bg-white px-6 py-3 font-display text-lg text-ui-charcoal transition hover:bg-sky-50"
              >
                Play Hunting Heidi
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -left-3 -top-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-ui-charcoal shadow-sm">
              New adventures weekly
            </div>
            <div className="relative overflow-hidden rounded-2xl border-2 border-explorer-blue/30 bg-white p-4 shadow-brand">
              <div className="relative mx-auto h-56 w-full max-w-[16rem]">
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

      <section className="container mt-8 md:mt-10">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className={`rounded-2xl border-2 p-5 shadow-sm ${item.tone}`}>
              <div className="text-3xl" aria-hidden>
                {item.icon}
              </div>
              <h2 className="mt-2 font-display text-2xl text-ui-charcoal">{item.title}</h2>
              <p className="mt-2 text-lg leading-relaxed text-ui-charcoal/85">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="adventures" className="container mt-12 md:mt-14">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Explore by category</h2>
            <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/85">
              We now group activities into core features, learning, and games so children can choose the right mode.
            </p>
          </div>
          <Link
            href="/flags"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-discovery-green/55 bg-green-100 px-5 py-3 font-display text-lg text-ui-charcoal transition hover:bg-green-200"
          >
            Quick start: Learning
          </Link>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-2xl text-ui-charcoal md:text-3xl">Core Features</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border-2 border-explorer-blue/30 bg-sky-50 p-4 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-ui-charcoal/65">Learning first</p>
              <p className="mt-2 text-ui-charcoal/85">Calm, reveal-style activities to build confidence.</p>
            </article>
            <article className="rounded-2xl border-2 border-heidi-orange/30 bg-amber-50 p-4 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-ui-charcoal/65">Game challenge</p>
              <p className="mt-2 text-ui-charcoal/85">Fast rounds and clue games for higher-energy play.</p>
            </article>
            <article className="rounded-2xl border-2 border-discovery-green/35 bg-green-50 p-4 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-ui-charcoal/65">Family friendly</p>
              <p className="mt-2 text-ui-charcoal/85">Big tap targets and shared play for home and class.</p>
            </article>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-display text-2xl text-ui-charcoal md:text-3xl">Learning</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <GameCard
              href="/flags"
              title="Flags Learning"
              description="Explore flag flashcards and country facts at a gentle pace for younger learners."
              status="Learning"
              icon={<span aria-hidden>??</span>}
              className="bg-gradient-to-b from-white to-sky-50"
            />

            <GameCard
              href="/capital-reveal"
              title="Capital Reveal"
              description="See a flag and country first, guess together, then reveal the capital city."
              status="Learning"
              icon={<span aria-hidden>???</span>}
              className="bg-gradient-to-b from-white to-indigo-50"
            />
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-display text-2xl text-ui-charcoal md:text-3xl">Games</h3>
          <div className="grid gap-5 md:grid-cols-2">
            <GameCard
              href="/flags"
              title="Flags Quiz Challenge"
              description="Play quickfire and memory modes to test how well you know world flags."
              status="Game"
              icon={<span aria-hidden>??</span>}
              className="bg-gradient-to-b from-white to-sky-50"
            />

            <GameCard
              href="/hunting-heidi"
              title="Hunting Heidi"
              description="Guess countries on the globe with warmer and colder clues. Great for family game time."
              status="Popular"
              icon={<span aria-hidden>??</span>}
              className="bg-gradient-to-b from-white to-amber-50"
            />

            <GameCard
              href="/capitals"
              title="Capital Cities"
              description="Type capital city guesses and follow clues to find Heidi&apos;s hidden city."
              status="Hard mode"
              icon={<span aria-hidden>???</span>}
              className="bg-gradient-to-b from-white to-rose-50"
            />

            <GameCard
              href="/jigsaw"
              title="Map Jigsaw"
              description="Puzzle-style geography play. New levels and drag-and-drop challenges are on the way."
              status="Coming soon"
              icon={<span aria-hidden>??</span>}
              className="bg-gradient-to-b from-white to-green-50"
            />
          </div>
        </div>
      </section>

      <section className="container mt-12 md:mt-14">
        <div className="rounded-2xl border-2 border-heidi-orange/35 bg-gradient-to-r from-ui-cream to-yellow-100 p-6 shadow-brand md:p-8">
          <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Grown-up corner</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ui-charcoal/85">
            No downloads, no account needed, just open and play. Designed for shared learning at home or in class.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-heidi-orange px-5 py-3 font-display text-lg text-white"
            >
              Explore together
            </Link>
            <Link
              href="#adventures"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-explorer-blue/35 bg-white px-5 py-3 font-display text-lg text-ui-charcoal"
            >
              Browse activities
            </Link>
          </div>
        </div>
      </section>

      <section className="container mt-12 md:mt-14">
        <div className="rounded-2xl border-2 border-explorer-blue/30 bg-white p-6 shadow-brand md:p-8">
          <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Geography Games for Kids FAQ</h2>
          <div className="mt-4 space-y-4 text-ui-charcoal/85">
            <div>
              <h3 className="font-display text-xl">What age group is this for?</h3>
              <p>Exploring with Heidi is designed for primary school children and family learning time.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">Do children learn real flags and capitals?</h3>
              <p>Yes. Activities use real country flags, real capital cities, and map-based geography practice.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">Is the site good on tablets?</h3>
              <p>Yes. The interface is tablet-first, with large buttons and clear visuals for younger learners.</p>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
