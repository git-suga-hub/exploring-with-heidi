import Image from "next/image";
import Link from "next/link";

type HeidiExplorerCardProps = {
  title: string;
  description: string;
  badge: string;
  tone: string;
  href: string;
  cta: string;
  imageSrc?: string;
};

export default function HeidiExplorerCard({ title, description, badge, tone, href, cta, imageSrc }: HeidiExplorerCardProps) {
  return (
    <article className={`group rounded-[2rem] border-2 border-white/80 bg-gradient-to-br ${tone} p-5 shadow-brand transition hover:-translate-y-1`}>
      {imageSrc ? (
        <div className="relative mb-3 h-28 w-full overflow-hidden rounded-2xl border-2 border-white/80">
          <Image src={imageSrc} alt={`${title} journey preview`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
        </div>
      ) : null}
      <p className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ui-charcoal/80">{badge}</p>
      <h3 className="mt-3 font-display text-3xl leading-tight text-ui-charcoal">{title}</h3>
      <p className="mt-3 min-h-20 text-base leading-relaxed text-ui-charcoal/90">{description}</p>
      <Link href={href} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl border-2 border-ui-charcoal/20 bg-white/90 px-4 py-2 font-display text-base text-ui-charcoal transition group-hover:bg-ui-cream">
        {cta}
      </Link>
    </article>
  );
}
