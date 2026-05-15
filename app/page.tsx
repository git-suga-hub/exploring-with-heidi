import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ExplorerBadge from "@/components/homepage/ExplorerBadge";
import HeidiBubble from "@/components/homepage/HeidiBubble";
import HeidiExplorerCard from "@/components/homepage/HeidiExplorerCard";
import HeidiHero from "@/components/homepage/HeidiHero";
import HeidiSpeechCard from "@/components/homepage/HeidiSpeechCard";
import PassportStamp from "@/components/homepage/PassportStamp";

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
    imageSrc: "/heidi-assets/journey-card-pick-place.png",
  },
  {
    title: "Capital Quest",
    description: "Race through clues, reveal capitals, and collect smart explorer points.",
    href: "/capital-reveal",
    cta: "Begin Capital Quest",
    badge: "Most Popular",
    tone: "from-yellow-200 via-orange-200 to-rose-200",
    imageSrc: "/heidi-assets/journey-card-paris.png",
  },
  {
    title: "Hunt Heidi",
    description: "Track Heidi across the world with warmer and colder hints on every guess.",
    href: "/hunting-heidi",
    cta: "Start Hunt Heidi",
    badge: "Adventure Mode",
    tone: "from-lime-200 via-emerald-200 to-teal-200",
    imageSrc: "/heidi-assets/journey-card-waterfall.png",
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
  { label: "Great Wall", imageSrc: "/heidi-assets/logo-explorer-badge.png" },
  { label: "Pyramids", imageSrc: "/heidi-assets/logo-icon-circle.png" },
  { label: "Eiffel Tower", imageSrc: "/heidi-assets/logo-sticker-wide.png" },
  { label: "Niagara Falls", imageSrc: "/heidi-assets/logo-explorer-badge.png" },
  { label: "Statue of Liberty", imageSrc: "/heidi-assets/logo-icon-circle.png" },
  { label: "Machu Picchu", imageSrc: "/heidi-assets/logo-sticker-wide.png" },
];

const explorerBadges = [
  { label: "Flag Finder", imageSrc: "/heidi-assets/badge-flag-finder.png" },
  { label: "Capital Champ", imageSrc: "/heidi-assets/badge-capital-champ.png" },
  { label: "Map Maker", imageSrc: "/heidi-assets/badge-map.png" },
  { label: "World Explorer", imageSrc: "/heidi-assets/badge-world-explorer.png" },
  { label: "Culture Discoverer", imageSrc: "/heidi-assets/badge-culture-discoverer.png" },
];

const journeyScenes = [
  { title: "Pick a place!", detail: "Where shall we explore today?", imageSrc: "/heidi-assets/journey-card-pick-place.png" },
  { title: "Learn cool facts!", detail: "The Great Wall is amazing!", imageSrc: "/heidi-assets/journey-card-great-wall.png" },
  { title: "Explore landmarks!", detail: "Bonjour from Paris!", imageSrc: "/heidi-assets/journey-card-paris.png" },
  { title: "Discover nature!", detail: "Look at this beautiful waterfall!", imageSrc: "/heidi-assets/journey-card-waterfall.png" },
  { title: "Collect badges!", detail: "Passport stamp earned!", imageSrc: "/heidi-assets/journey-card-passport.png" },
];

function RouteDivider() {
  return (
    <div className="container mt-6" aria-hidden>
      <div className="relative h-20 overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),rgba(255,245,210,0.5),rgba(191,233,255,0.5))] backdrop-blur-sm">
        <svg viewBox="0 0 1200 110" className="h-full w-full">
          <path
            d="M0 88 C140 10, 285 95, 430 48 C580 -10, 740 102, 890 54 C1030 18, 1110 72, 1200 42"
            fill="none"
            stroke="#31424A"
            strokeDasharray="10 12"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
          <text x="260" y="34" fontSize="24" fill="#31424A" opacity="0.6">✈</text>
          <text x="610" y="34" fontSize="18" fill="#31424A" opacity="0.6">✦</text>
          <text x="960" y="34" fontSize="18" fill="#31424A" opacity="0.6">✦</text>
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
        <HeidiHero
          title="Where will Heidi explore today?"
          subtitle="Step into a cinematic world of globes, landmarks, map trails, and storybook travel adventures."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
          <HeidiBubble text="Where shall we go today?" mood="excited" side="left" imageSrc="/heidi-assets/pose-look-over-there.png" />
        </div>
      </section>

      <RouteDivider />

      <section className="container relative mt-6" aria-label="Adventure modes">
        <div className="relative overflow-visible rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(145deg,rgba(124,214,207,0.72),rgba(142,218,245,0.65),rgba(255,240,204,0.72))] p-5 shadow-brand sm:p-7">
          <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Adventure Modes</h2>
              <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/90">Choose your route through world landmarks, clues, and playful geography quests.</p>
            </div>
            <HeidiBubble text="Great job explorer! Pick your first mode." mood="happy" imageSrc="/heidi-assets/pose-hi-there.png" />
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {adventureModes.map((mode) => (
              <HeidiExplorerCard key={mode.title} {...mode} />
            ))}
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Choose your destination">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(155deg,rgba(255,214,165,0.72),rgba(255,243,188,0.72),rgba(170,220,255,0.58))] p-5 shadow-brand sm:p-7">
          <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Choose Your Destination</h2>
          <p className="mt-2 max-w-2xl text-lg text-ui-charcoal/90">From pyramid deserts to island coasts, pick the next stop on your world journey.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {landmarkStickers.map((landmark) => (
              <PassportStamp key={landmark.label} label={landmark.label} imageSrc={landmark.imageSrc} />
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.title} className="rounded-3xl border-2 border-white/80 bg-white/80 p-4 shadow-sm">
                <h3 className="font-display text-2xl text-ui-charcoal">{destination.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ui-charcoal/85">{destination.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Passport rewards teaser">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(150deg,rgba(255,209,102,0.7),rgba(255,154,120,0.65),rgba(255,215,173,0.72))] p-5 shadow-brand sm:p-7 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,.95fr)] md:items-center md:gap-5">
          <div>
            <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Passport and Rewards</h2>
            <p className="mt-3 text-lg leading-relaxed text-ui-charcoal/90">Complete quests through waterfalls, mountains, and famous landmarks while your explorer passport fills with badges.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <PassportStamp label="Passport Stamp" imageSrc="/heidi-assets/journey-card-passport.png" />
              <PassportStamp label="Explorer Badge" imageSrc="/heidi-assets/badge-world-explorer.png" />
            </div>
            <HeidiBubble text="You unlocked a new adventure!" mood="excited" className="mt-4" imageSrc="/heidi-assets/pose-lets-go.png" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 md:mt-0">
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center"><p className="font-display text-3xl text-ui-charcoal">12</p><p className="text-sm text-ui-charcoal/85">Countries found</p></div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center"><p className="font-display text-3xl text-ui-charcoal">8</p><p className="text-sm text-ui-charcoal/85">Flags mastered</p></div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center"><p className="font-display text-3xl text-ui-charcoal">5</p><p className="text-sm text-ui-charcoal/85">Capital quests</p></div>
            <div className="rounded-3xl border-2 border-white/80 bg-white/85 p-4 text-center"><p className="font-display text-3xl text-ui-charcoal">3</p><p className="text-sm text-ui-charcoal/85">Explorer badges</p></div>
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Explorer badges">
        <div className="rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(135deg,rgba(163,214,255,0.68),rgba(229,246,255,0.82),rgba(255,255,255,0.8))] p-5 shadow-brand sm:p-7">
          <h2 className="text-center font-display text-3xl text-ui-charcoal sm:text-4xl">Explorer Badges</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {explorerBadges.map((badge) => (
              <ExplorerBadge key={badge.label} label={badge.label} imageSrc={badge.imageSrc} />
            ))}
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Parent and teacher trust">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(155deg,rgba(164,223,255,0.7),rgba(196,245,225,0.68),rgba(255,255,255,0.75))] p-5 shadow-brand sm:p-7">
          <h2 className="font-display text-3xl text-ui-charcoal sm:text-4xl">Trusted by Parents and Teachers</h2>
          <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/90">A safe, exciting exploration world with clear readability and tablet-friendly tap targets.</p>
          <HeidiBubble text="This world is made for family play and classroom discovery." mood="curious" side="left" className="mt-4" imageSrc="/heidi-assets/avatar-curious.png" />
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {trustHighlights.map((item) => (
              <article key={item} className="rounded-3xl border-2 border-white/80 bg-white/85 p-4"><p className="text-base leading-relaxed text-ui-charcoal/90">{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Heidi journey scenes">
        <div className="rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(140deg,rgba(173,223,255,0.7),rgba(255,229,176,0.7),rgba(194,240,208,0.66))] p-5 shadow-brand sm:p-7">
          <h2 className="text-center font-display text-3xl text-ui-charcoal sm:text-4xl">Heidi On Your Journey</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {journeyScenes.map((scene) => (
              <article key={scene.title} className="overflow-hidden rounded-3xl border-2 border-white/80 bg-white/85 p-2">
                <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-white/80">
                  <Image src={scene.imageSrc} alt={`${scene.title} journey card`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />
                </div>
                <p className="mt-2 rounded-xl bg-ui-cream px-2 py-1 text-center text-sm font-semibold text-ui-charcoal">{scene.detail}</p>
                <p className="mt-2 text-center font-display text-xl text-ui-charcoal">{scene.title}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <HeidiSpeechCard title="Happy" message="Great job explorer!" tone="green" imageSrc="/heidi-assets/reaction-great-job.png" />
            <HeidiSpeechCard title="Curious" message="Where shall we go today?" tone="blue" imageSrc="/heidi-assets/reaction-lets-explore.png" />
            <HeidiSpeechCard title="Excited" message="You found it!" tone="pink" imageSrc="/heidi-assets/reaction-you-found-it.png" />
          </div>
        </div>
      </section>

      <RouteDivider />

      <section className="container mt-6" aria-label="Final adventure call to action">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/60 bg-[linear-gradient(140deg,rgba(113,210,239,0.75),rgba(126,218,181,0.72),rgba(255,218,127,0.72))] p-6 text-center shadow-brand sm:p-8">
          <h2 className="font-display text-4xl text-ui-charcoal sm:text-5xl">Ready for today&apos;s adventure?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-ui-charcoal/90">Join Heidi on a magical world-travel story and discover your next country challenge.</p>
          <HeidiBubble text="Let’s explore together!" mood="excited" className="mt-4" imageSrc="/heidi-assets/pose-hi-there.png" />
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/games" className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white/90 px-6 py-3 font-display text-lg text-ui-charcoal transition hover:bg-ui-cream">Start an adventure</Link>
            <Link href="/learn" className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-white/80 bg-heidi-orange px-6 py-3 font-display text-lg text-white transition hover:brightness-105">Explore learning path</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </main>
  );
}
