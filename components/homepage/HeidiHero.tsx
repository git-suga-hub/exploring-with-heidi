import Image from "next/image";

type HeidiHeroProps = {
  title: string;
  subtitle: string;
};

export default function HeidiHero({ title, subtitle }: HeidiHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/65 bg-[linear-gradient(155deg,rgba(67,142,194,0.72),rgba(120,214,233,0.52),rgba(255,250,223,0.7))] p-5 shadow-brand sm:p-8 md:p-10">
      <Image
        src="/heidi-assets/hero-main-heidi-world-landmarks.png"
        alt=""
        fill
        aria-hidden
        className="pointer-events-none object-cover opacity-55"
        sizes="100vw"
        priority
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.4),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(to_top,rgba(49,66,74,0.46),transparent_58%)]" />
      <div className="relative z-10 grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:items-end">
        <div>
          <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ui-charcoal">Join Heidi On A World Adventure</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.42)] sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-xl">{subtitle}</p>
        </div>
        <div className="relative mx-auto h-64 w-full max-w-[18rem] sm:h-72">
          <Image src="/heidi-assets/heidi-full-body-hero.png" alt="Heidi in explorer outfit" fill className="object-contain" sizes="(max-width: 768px) 260px, 320px" priority />
        </div>
      </div>
    </div>
  );
}
