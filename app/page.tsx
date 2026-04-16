import Link from 'next/link';
import GameCard from '@/components/GameCard';

export default function Home() {
  return (
    <main>
      <section className="bg-explorer-blue text-white">
        <div className="container py-12 md:py-20">
          <p className="font-display text-sm uppercase tracking-widest text-white/80">Mini Globe Learners</p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl">Exploring with Heidi</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95 md:text-xl">
            Welcome to our geography website — play free games in your browser, no download needed. Learn flags,
            practise capitals, and explore the world map with Heidi as your guide.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#games"
              className="inline-block rounded-[var(--radius-brand)] bg-heidi-orange px-6 py-3 font-display text-white shadow-brand transition hover:brightness-110"
            >
              Browse the games
            </Link>
            <Link
              href="/flags-quiz"
              className="inline-block rounded-[var(--radius-brand)] border-2 border-white/80 bg-white/10 px-6 py-3 font-display text-white backdrop-blur transition hover:bg-white/20"
            >
              Jump to Flags Quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ui-gray/60 bg-white/60 py-10">
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">Built for curious kids</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Every game runs on this site — use the menu above to switch between activities, or scroll down to pick
            one. More puzzles and quizzes are on the way.
          </p>
        </div>
      </section>

      <section id="games" className="py-12 md:py-14">
        <div className="container">
          <h2 className="font-display text-2xl text-ui-charcoal md:text-3xl">Games</h2>
          <p className="mt-2 max-w-2xl text-gray-700">Choose a game to start playing.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <GameCard
              href="/flags-quiz"
              title="Flags Quiz"
              description="Flashcards, quickfire, and memory match — learn flags from around the world."
              icon={<span aria-label="World Map" title="World Map">🗺️</span>}
            />

            <GameCard
              href="/capitals-quiz"
              title="Capital Cities"
              description="Coming soon: multiple choice and type-the-answer with continent filters."
              icon={<span aria-label="Capitol" title="Capitol">🏛️</span>}
            />

            <GameCard
              href="/map-jigsaw"
              title="Map Jigsaw"
              description="Coming soon: drag countries into place by continent with hints."
              icon={<span aria-label="Puzzle Piece" title="Puzzle Piece">🧩</span>}
            />

            <GameCard
              href="/hunting-heidi"
              title="Hunting Heidi"
              description="Guess the country — warmer and colder clues as you hunt for Heidi on the globe."
              icon={<span aria-label="Compass" title="Compass">🧭</span>}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
