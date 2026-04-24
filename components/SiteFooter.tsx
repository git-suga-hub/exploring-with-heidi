import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/flags-quiz", label: "Flags" },
  { href: "/capitals-quiz", label: "Capitals" },
  { href: "/map-jigsaw", label: "Jigsaw" },
  { href: "/hunting-heidi", label: "Hunting Heidi" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t-2 border-explorer-blue/25 bg-ui-cream/90">
      <div className="container py-8">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <div className="rounded-2xl border-2 border-heidi-yellow/55 bg-yellow-100/70 p-5">
            <p className="font-display text-2xl text-ui-charcoal">Exploring with Heidi</p>
            <p className="mt-2 text-lg leading-relaxed text-ui-charcoal/85">
              Safe, playful geography games for children and families.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border-2 border-explorer-blue/30 bg-white px-4 py-2 font-display text-base text-ui-charcoal transition hover:bg-sky-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 border-t border-explorer-blue/20 pt-4 text-center text-sm text-ui-charcoal/70">
          © {new Date().getFullYear()} Exploring with Heidi
        </p>
      </div>
    </footer>
  );
}
