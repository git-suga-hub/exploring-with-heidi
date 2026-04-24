import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/flags-quiz", label: "Flags" },
  { href: "/capitals-quiz", label: "Capitals" },
  { href: "/map-jigsaw", label: "Jigsaw" },
  { href: "/hunting-heidi", label: "Hunting Heidi" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-explorer-blue/25 bg-ui-cream/95 backdrop-blur">
      <div className="container py-3 md:py-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/85 px-3 py-2 shadow-sm">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-explorer-blue/30 bg-white">
              <Image
                src="/branding/heidi-mascot.png"
                alt="Heidi mascot"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-xl leading-tight text-ui-charcoal">Exploring with Heidi</p>
              <p className="truncate text-sm text-ui-charcoal/75">Family geography adventures</p>
            </div>
          </Link>

          <nav className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end" aria-label="Main">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-explorer-blue/35 bg-white px-4 py-2 font-display text-base text-ui-charcoal transition hover:bg-sky-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
