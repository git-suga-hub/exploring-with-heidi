import Image from 'next/image';
import Link from 'next/link';

const links = [
  { href: '/flags-quiz', label: 'Flags' },
  { href: '/capitals-quiz', label: 'Capitals' },
  { href: '/map-jigsaw', label: 'Jigsaw' },
  { href: '/hunting-heidi', label: 'Hunting Heidi' },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ui-gray bg-white/90 backdrop-blur">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="flex min-w-0 shrink items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-ui-gray/60 bg-white sm:h-11 sm:w-11">
            <Image
              src="/branding/heidi-mascot.png"
              alt=""
              fill
              className="object-cover"
              sizes="44px"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-base leading-tight text-explorer-blue sm:text-lg">
              Exploring with Heidi
            </p>
            <p className="truncate text-[11px] leading-tight text-ui-charcoal/70 sm:text-xs">
              Mini Globe Learners
            </p>
          </div>
        </Link>

        <nav
          className="flex max-w-full flex-wrap items-center justify-end gap-x-3 gap-y-1 font-display text-sm sm:gap-x-4 sm:text-base"
          aria-label="Main"
        >
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-ui-charcoal underline-offset-4 hover:text-explorer-blue hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
