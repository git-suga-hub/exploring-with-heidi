import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

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

const adventureModes = [
  {
    title: "Flag Challenge",
    description: "Flip through colourful flags and learn each country like a globe-trotting detective.",
    href: "/flags",
    cta: "Play Flag Challenge",
    badge: "Quick Start",
    tone: "from-sky-100 via-cyan-100 to-teal-100",
  },
  {
    title: "Capital Quest",
    description: "Race through clues, reveal capitals, and collect smart explorer points.",
    href: "/capital-reveal",
    cta: "Begin Capital Quest",
    badge: "Most Popular",
    tone: "from-yellow-100 via-orange-100 to-rose-100",
  },
  {
    title: "Hunt Heidi",
    description: "Track Heidi across the world with warmer and colder hints on every guess.",
    href: "/hunting-heidi",
    cta: "Start Hunt Heidi",
    badge: "Adventure Mode",
    tone: "from-lime-100 via-emerald-100 to-teal-100",
  },
];

const destinations = [
  { title: "Africa", detail: "Wildlife trails and giant geography discoveries" },
  { title: "Asia", detail: "Megacities, mountains, and amazing cultures" },
  { title: "Europe", detail: "Castles, capitals, and classic landmarks" },
  { title: "North America", detail: "Parks, coasts, and buzzing capital cities" },
  { title: "South America", detail: "Rainforests, rivers, and flag adventures" },
  { title: "Oceania", detail: "Island hopping with sunny explorer missions" },
];

const trustHighlights = [
  "Built for tablets with large tap zones and clear game choices",
  "Short playful sessions that support classroom and home learning",
  "Friendly structure for parent, carer, and teacher co-play",
];

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-200/70 via-sky-200/70 to-teal-200/70 blur-3xl"
      />

      <section className="container relative pt-6 md:pt-10">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-explorer-blue/35 bg-gradient-to-br from-sky-200 via-ui-cream to-heidi-yellow/70 p-5 shadow-brand sm:p-7 md:p-9">
          <div className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-white/60" aria-hidden />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-heidi-orange/35" aria-hidden />

          <div className="grid gap-7 md:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] md:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-white/75 bg-white/90 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/80">
                Adventure starts now
              </p>

              <h1 className="mt-4 font-display text-4xl leading-tight text-ui-charcoal sm:text-5xl">
                Where will Heidi explore today?
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ui-charcoal/90 sm:text-xl">
                Discover countries, flags, and capitals in a colourful world of mini adventures designed for curious kids.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/games"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-heidi-orange/60 bg-heidi-orange px-6 py-3 font-display text-lg text-white shadow-brand transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Choose your next adventure
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-explorer-blue/40 bg-white px-6 py-3 font-display text-lg text-ui-charcoal transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  Start guided learning
                </Link>
              </div>

              <p className="mt-4 inline-flex rounded-2xl border border-ui-teal/45 bg-white/85 px-4 py-2 text-sm text-ui-charcoal/80">
                Collect passport stamps as you learn.
              </p>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="relative rounded-[2rem] border-2 border-white/70 bg-white/80 p-4 shadow-brand">
                <div className="pointer-events-none absolute -right-4 -top-4 rounded-2xl bg-heidi-yellow px-3 py-2 font-display text-sm text-ui-charcoal shadow-md" aria-hidden>
                  New mission
                </div>
                <div className="relative mx-auto h-60 w-full max-w-[16rem] sm:h-64">
                  <Image
                    src="/branding/heidi-mascot.png"
                    alt="Heidi explorer mascot"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 240px, 280px"
                    priority
                  />
                </div>
                <p className="mt-3 text-center font-display text-2xl text-ui-charcoal">Pack your curiosity and tap to explore.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container relative mt-10" aria-label="Adventure modes">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Adventure Modes</h2>
            <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/85">Pick a game mode, chase clues, and keep your explorer streak going.</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {adventureModes.map((mode) => (
            <article
              key={mode.title}
              className={`group rounded-[2rem] border-2 border-white/75 bg-gradient-to-br ${mode.tone} p-5 shadow-brand transition hover:-translate-y-1`}
            >
              <p className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ui-charcoal/75">{mode.badge}</p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-ui-charcoal">{mode.title}</h3>
              <p className="mt-3 min-h-20 text-base leading-relaxed text-ui-charcoal/85">{mode.description}</p>
              <Link
                href={mode.href}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white px-4 py-2 font-display text-base text-ui-charcoal transition group-hover:bg-ui-cream"
              >
                {mode.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="container mt-11" aria-label="Choose your destination">
        <div className="rounded-[2rem] border-2 border-ui-teal/45 bg-gradient-to-br from-teal-100 via-white to-sky-100 p-5 shadow-brand sm:p-7">
          <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Choose Your Destination</h2>
          <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/85">Tap a region and jump into your next world adventure.</p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div
                key={destination.title}
                className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5"
              >
                <h3 className="font-display text-2xl text-ui-charcoal">{destination.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ui-charcoal/80">{destination.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-11" aria-label="Passport rewards teaser">
        <div className="grid gap-5 rounded-[2rem] border-2 border-heidi-yellow/50 bg-gradient-to-br from-yellow-100 via-orange-100 to-rose-100 p-5 shadow-brand sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] md:items-center">
          <div>
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Passport and Rewards</h2>
            <p className="mt-3 text-lg leading-relaxed text-ui-charcoal/85">
              Complete quests, discover new countries, and watch your passport fill up with stars, stamps, and explorer badges.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/70">
              Progress teaser
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl border-2 border-white/75 bg-white/90 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">12</p>
              <p className="text-sm text-ui-charcoal/80">Countries found</p>
            </div>
            <div className="rounded-3xl border-2 border-white/75 bg-white/90 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">8</p>
              <p className="text-sm text-ui-charcoal/80">Flags mastered</p>
            </div>
            <div className="rounded-3xl border-2 border-white/75 bg-white/90 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">5</p>
              <p className="text-sm text-ui-charcoal/80">Capital quests</p>
            </div>
            <div className="rounded-3xl border-2 border-white/75 bg-white/90 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">3</p>
              <p className="text-sm text-ui-charcoal/80">Explorer badges</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-11" aria-label="Parent and teacher trust">
        <div className="rounded-[2rem] border-2 border-explorer-blue/35 bg-white/90 p-5 shadow-brand sm:p-7">
          <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Trusted by Parents and Teachers</h2>
          <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/85">A warm, safe, and easy-to-use geography playground for guided learning.</p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {trustHighlights.map((item) => (
              <article key={item} className="rounded-3xl border-2 border-ui-gray bg-ui-cream/80 p-4">
                <p className="text-base leading-relaxed text-ui-charcoal/85">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-11" aria-label="Final adventure call to action">
        <div className="rounded-[2rem] border-2 border-ui-teal/50 bg-gradient-to-r from-cyan-200 via-sky-200 to-lime-200 p-6 text-center shadow-brand sm:p-8">
          <h2 className="font-display text-4xl text-ui-charcoal sm:text-5xl">Ready for today&apos;s adventure?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-ui-charcoal/85">Grab your explorer hat, pick a mission, and see how many places you can discover together.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/games"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white px-6 py-3 font-display text-lg text-ui-charcoal transition hover:bg-ui-cream"
            >
              Start an adventure
            </Link>
            <Link
              href="/learn"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white/80 bg-heidi-orange px-6 py-3 font-display text-lg text-white transition hover:brightness-105"
            >
              Explore learning path
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </main>
  );
}
