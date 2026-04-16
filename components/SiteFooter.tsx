import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/flags-quiz", label: "Flags Quiz" },
  { href: "/capitals-quiz", label: "Capitals" },
  { href: "/map-jigsaw", label: "Map Jigsaw" },
  { href: "/hunting-heidi", label: "Hunting Heidi" },
] as const;

export default function SiteFooter() {
  return (
    <footer className="border-t border-ui-gray bg-white/80">
      <div className="container py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-lg text-heidi-orange">Exploring with Heidi</p>
            <p className="mt-2 text-sm leading-relaxed text-ui-charcoal/80">
              Mini Globe Learners — free geography games for children. Learn flags, capitals, and where countries
              sit on the map, right in your browser.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 font-display text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ui-charcoal/90 underline-offset-4 hover:text-explorer-blue hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-ui-gray/80 pt-6 text-center text-xs text-ui-charcoal/55">
          © {new Date().getFullYear()} Exploring with Heidi · Mini Globe Learners
        </p>
      </div>
    </footer>
  );
}
