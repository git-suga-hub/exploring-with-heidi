import Image from "next/image";
import Link from "next/link";
import GameCard from "@/components/GameCard";

const highlights = [
  {
    title: "Learn by playing",
    body: "Children explore countries through games, clues, and playful challenges.",
    tone: "bg-sky-100 border-explorer-blue/35",
    icon: "🧭",
  },
  {
    title: "Tablet first",
    body: "Big buttons and roomy layouts are easy to tap on iPad and tablets.",
    tone: "bg-yellow-100 border-heidi-yellow/55",
    icon: "📱",
  },
  {
    title: "Family friendly",
    body: "Safe design, gentle language, and activities parents and children can do together.",
    tone: "bg-green-100 border-discovery-green/50",
    icon: "👨‍👩‍👧",
  },
] as const;

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
              A friendly world adventure for kids and families
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
                  alt="Heidi explorer mascot"
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
            <h2 className="font-display text-3xl text-ui-charcoal md:text-4xl">Choose your next adventure</h2>
            <p className="mt-2 max-w-3xl text-lg text-ui-charcoal/85">
              Pick an activity and jump straight in. Big cards make it easy for children to choose on iPad.
            </p>
          </div>
          <Link
            href="/flags-quiz"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-discovery-green/55 bg-green-100 px-5 py-3 font-display text-lg text-ui-charcoal transition hover:bg-green-200"
          >
            Quick start: Flags Quiz
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <GameCard
            href="/flags-quiz"
            title="Flags Quiz"
            description="Flip cards, quickfire rounds, and memory games to learn flags from around the world."
            status="Ready"
            icon={<span aria-hidden>🏁</span>}
            className="bg-gradient-to-b from-white to-sky-50"
          />

          <GameCard
            href="/hunting-heidi"
            title="Hunting Heidi"
            description="Guess countries on the globe with warmer and colder clues. Great for family game time."
            status="Popular"
            icon={<span aria-hidden>🔎</span>}
            className="bg-gradient-to-b from-white to-amber-50"
          />

          <GameCard
            href="/capitals-quiz"
            title="Capital Cities"
            description="Type capital city guesses and follow clues to find Heidi&apos;s hidden city."
            status="Hard mode"
            icon={<span aria-hidden>🏛️</span>}
            className="bg-gradient-to-b from-white to-rose-50"
          />

          <GameCard
            href="/map-jigsaw"
            title="Map Jigsaw"
            description="Puzzle-style geography play. New levels and drag-and-drop challenges are on the way."
            status="Coming soon"
            icon={<span aria-hidden>🧩</span>}
            className="bg-gradient-to-b from-white to-green-50"
          />
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
    </main>
  );
}
