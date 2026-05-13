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
    tone: "from-sky-200 via-cyan-200 to-teal-200",
  },
  {
    title: "Capital Quest",
    description: "Race through clues, reveal capitals, and collect smart explorer points.",
    href: "/capital-reveal",
    cta: "Begin Capital Quest",
    badge: "Most Popular",
    tone: "from-yellow-200 via-orange-200 to-rose-200",
  },
  {
    title: "Hunt Heidi",
    description: "Track Heidi across the world with warmer and colder hints on every guess.",
    href: "/hunting-heidi",
    cta: "Start Hunt Heidi",
    badge: "Adventure Mode",
    tone: "from-lime-200 via-emerald-200 to-teal-200",
  },
];

const destinations = [
  { title: "Africa", detail: "Safari trails, pyramids, and roaring discovery paths" },
  { title: "Asia", detail: "Great Wall wonders, lantern skies, and mountain routes" },
  { title: "Europe", detail: "Eiffel views, old castles, and capital-city stories" },
  { title: "North America", detail: "Niagara mist, Statue of Liberty, and bold adventures" },
  { title: "South America", detail: "Machu Picchu climbs, jungles, and map quests" },
  { title: "Oceania", detail: "Tropical islands, coral coasts, and sunny explorer missions" },
];

const trustHighlights = [
  "Built for tablets with large tap zones and easy child-friendly controls",
  "Short playful sessions that support school learning and home discovery",
  "Safe, warm world-exploration design for parent and teacher co-play",
];

const landmarkStickers = [
  "Great Wall of China",
  "Pyramids of Egypt",
  "Eiffel Tower",
  "Niagara Falls",
  "Statue of Liberty",
  "Machu Picchu",
];

function RouteDivider() {
  return (
    <div className="container mt-8" aria-hidden>
      <div className="relative h-16 overflow-hidden rounded-full border border-white/40 bg-white/40 backdrop-blur-sm">
        <svg viewBox="0 0 1200 100" className="h-full w-full">
          <path
            d="M0 78 C150 8, 300 92, 450 42 C600 -8, 750 95, 900 46 C1020 8, 1110 68, 1200 32"
            fill="none"
            stroke="#31424A"
            strokeDasharray="10 12"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
          <circle cx="190" cy="51" r="6" fill="#FF8A7A" />
          <circle cx="590" cy="41" r="6" fill="#7BC96F" />
          <circle cx="980" cy="42" r="6" fill="#8EDAF5" />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_12%,rgba(255,209,102,0.35),transparent_36%),radial-gradient(circle_at_80%_18%,rgba(142,218,245,0.45),transparent_40%),radial-gradient(circle_at_88%_88%,rgba(123,201,111,0.35),transparent_35%)]"
      />

      <section className="container relative pt-5 md:pt-8">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(160deg,rgba(42,121,165,0.78),rgba(114,208,225,0.55),rgba(255,249,232,0.8)),url('/branding/logo-badge.png')] bg-cover bg-center p-5 shadow-brand sm:p-7 md:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.42),transparent_34%),radial-gradient(circle_at_92%_10%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(to_top,rgba(49,66,74,0.45),transparent_58%)]"
          />

          <div aria-hidden className="pointer-events-none absolute -left-2 top-4 hidden rounded-3xl bg-white/85 px-3 py-2 text-xs font-bold text-ui-charcoal shadow-md sm:block">
            ☁ Clouds
          </div>
          <div aria-hidden className="pointer-events-none absolute right-4 top-4 hidden rounded-3xl bg-white/85 px-3 py-2 text-xs font-bold text-ui-charcoal shadow-md sm:block">
            🎈 Hot Air Balloons
          </div>
          <div aria-hidden className="pointer-events-none absolute bottom-5 left-5 rounded-3xl bg-white/85 px-3 py-2 text-xs font-bold text-ui-charcoal shadow-md">
            🗺 Adventure Map Routes
          </div>

          <div className="relative z-10 grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] md:items-center">
            <div>
              <p className="inline-flex min-h-11 items-center rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/90">
                Magical World Journey
              </p>

              <h1 className="mt-4 font-display text-4xl leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)] sm:text-5xl md:text-6xl">
                Where will Heidi explore today?
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-xl">
                Step into a giant world of landmarks, map paths, tropical islands, waterfalls, and sky-high adventures.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/games"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-heidi-orange/70 bg-heidi-orange px-6 py-3 font-display text-lg text-white shadow-brand transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Choose your next adventure
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white/80 bg-white/90 px-6 py-3 font-display text-lg text-ui-charcoal transition hover:-translate-y-0.5"
                >
                  Start guided learning
                </Link>
              </div>

              <p className="mt-4 inline-flex rounded-2xl border border-white/70 bg-white/80 px-4 py-2 text-sm text-ui-charcoal">
                Discover countries, flags and capitals while collecting passport stamps.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="relative rounded-[2rem] border-2 border-white/75 bg-white/30 p-4 backdrop-blur-sm shadow-brand">
                <div className="pointer-events-none absolute -right-4 -top-4 rounded-2xl bg-heidi-yellow px-3 py-2 font-display text-sm text-ui-charcoal shadow-md" aria-hidden>
                  Heidi&apos;s travel poster
                </div>
                <div className="relative mx-auto h-64 w-full max-w-[17rem] sm:h-72">
                  <Image
                    src="/branding/heidi-mascot.png"
                    alt="Heidi explorer mascot leading a world adventure"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 260px, 300px"
                    priority
                  />
                </div>
                <p className="mt-3 text-center font-display text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                  Heidi is ready to guide your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container relative mt-7" aria-label="Adventure modes">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(145deg,rgba(124,214,207,0.72),rgba(142,218,245,0.65),rgba(255,240,204,0.72))] p-5 shadow-brand sm:p-7">
          <div aria-hidden className="pointer-events-none absolute -right-14 bottom-0 h-44 w-44 rounded-full bg-emerald-300/35 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-sky-200/45 blur-2xl" />

          <div className="relative z-10 mb-5">
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Adventure Modes</h2>
            <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/90">Choose your route through world landmarks, clues, and playful geography quests.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {adventureModes.map((mode) => (
              <article
                key={mode.title}
                className={`group rounded-[2rem] border-2 border-white/80 bg-gradient-to-br ${mode.tone} p-5 shadow-brand transition hover:-translate-y-1`}
              >
                <p className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ui-charcoal/80">{mode.badge}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ui-charcoal">{mode.title}</h3>
                <p className="mt-3 min-h-20 text-base leading-relaxed text-ui-charcoal/90">{mode.description}</p>
                <Link
                  href={mode.href}
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white/90 px-4 py-2 font-display text-base text-ui-charcoal transition group-hover:bg-ui-cream"
                >
                  {mode.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-7" aria-label="Choose your destination">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(155deg,rgba(255,214,165,0.72),rgba(255,243,188,0.72),rgba(170,220,255,0.58))] p-5 shadow-brand sm:p-7">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.45),transparent_35%)]" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Choose Your Destination</h2>
            <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/90">From pyramid deserts to island coasts, pick the next stop on your world journey.</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {landmarkStickers.map((landmark) => (
                <span key={landmark} className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-bold text-ui-charcoal">
                  {landmark}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <div
                  key={destination.title}
                  className="rounded-3xl border-2 border-white/80 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5"
                >
                  <h3 className="font-display text-2xl text-ui-charcoal">{destination.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ui-charcoal/85">{destination.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-7" aria-label="Passport rewards teaser">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(150deg,rgba(255,209,102,0.7),rgba(255,154,120,0.65),rgba(255,215,173,0.72))] p-5 shadow-brand sm:p-7 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] md:items-center md:gap-5">
          <div aria-hidden className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-yellow-100/45 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-rose-200/40 blur-2xl" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Passport and Rewards</h2>
            <p className="mt-3 text-lg leading-relaxed text-ui-charcoal/90">
              Complete quests through waterfalls, mountains, and famous landmarks while your explorer passport fills with badges.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-white/75 bg-white/80 px-4 py-2 text-sm font-bold uppercase tracking-wide text-ui-charcoal/80">
              Storybook progress trail
            </p>
          </div>

          <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 md:mt-0">
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">12</p>
              <p className="text-sm text-ui-charcoal/85">Countries found</p>
            </div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">8</p>
              <p className="text-sm text-ui-charcoal/85">Flags mastered</p>
            </div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">5</p>
              <p className="text-sm text-ui-charcoal/85">Capital quests</p>
            </div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center">
              <p className="font-display text-3xl text-ui-charcoal">3</p>
              <p className="text-sm text-ui-charcoal/85">Explorer badges</p>
            </div>
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-7" aria-label="Parent and teacher trust">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(155deg,rgba(164,223,255,0.7),rgba(196,245,225,0.68),rgba(255,255,255,0.75))] p-5 shadow-brand sm:p-7">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white/45 to-transparent" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Trusted by Parents and Teachers</h2>
            <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/90">A safe, exciting exploration world with clear readability and tablet-friendly tap targets.</p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {trustHighlights.map((item) => (
                <article key={item} className="rounded-3xl border-2 border-white/80 bg-white/85 p-4">
                  <p className="text-base leading-relaxed text-ui-charcoal/90">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-7" aria-label="Final adventure call to action">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(140deg,rgba(113,210,239,0.75),rgba(126,218,181,0.72),rgba(255,218,127,0.72))] p-6 text-center shadow-brand sm:p-8">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.4),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.34),transparent_28%)]" />
          <div className="relative z-10">
            <h2 className="font-display text-4xl text-ui-charcoal sm:text-5xl">Ready for today&apos;s adventure?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-ui-charcoal/90">
              Join Heidi on a magical world-travel story and discover your next country challenge.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/games"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white/90 px-6 py-3 font-display text-lg text-ui-charcoal transition hover:bg-ui-cream"
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
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </main>
  );
}
