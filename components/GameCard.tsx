import Link from "next/link";
import cn from "classnames";

export default function GameCard({
  href,
  title,
  description,
  icon,
  className,
  status = "Play now",
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  status?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl border-2 border-explorer-blue/35 bg-white/90 p-5 shadow-brand transition hover:-translate-y-1 hover:shadow-xl",
        "focus-visible:outline-none",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ui-cream text-3xl shadow-sm" aria-hidden>
            {icon}
          </span>
          <h3 className="font-display text-2xl text-ui-charcoal">{title}</h3>
        </div>
        <span className="rounded-full bg-discovery-green/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ui-charcoal/80">
          {status}
        </span>
      </div>

      <p className="mt-4 text-lg leading-relaxed text-ui-charcoal/85">{description}</p>

      <div className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-explorer-blue px-5 py-3 font-display text-lg text-white transition group-hover:bg-heidi-orange">
        Start adventure
      </div>
    </Link>
  );
}
