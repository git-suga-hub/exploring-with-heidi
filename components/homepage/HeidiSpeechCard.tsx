import Image from "next/image";

type HeidiSpeechCardProps = {
  title: string;
  message: string;
  tone?: "pink" | "blue" | "green";
  imageSrc?: string;
};

const toneClass = {
  pink: "from-pink-200 to-rose-200",
  blue: "from-sky-200 to-cyan-200",
  green: "from-lime-200 to-emerald-200",
};

export default function HeidiSpeechCard({ title, message, tone = "pink", imageSrc }: HeidiSpeechCardProps) {
  return (
    <div className={`rounded-3xl border-2 border-white/85 bg-gradient-to-br ${toneClass[tone]} p-4 shadow-sm`}>
      {imageSrc ? (
        <div className="relative mx-auto h-24 w-24">
          <Image src={imageSrc} alt={`${title} Heidi reaction`} fill className="object-contain" sizes="96px" />
        </div>
      ) : null}
      <p className="mt-2 text-center font-display text-xl text-ui-charcoal">{title}</p>
      <p className="mt-2 text-center text-sm text-ui-charcoal/90">{message}</p>
    </div>
  );
}
