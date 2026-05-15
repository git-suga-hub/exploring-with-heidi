import Image from "next/image";

type HeidiBubbleProps = {
  text: string;
  mood?: "happy" | "curious" | "excited";
  side?: "left" | "right";
  className?: string;
  imageSrc?: string;
};

const moodTone: Record<NonNullable<HeidiBubbleProps["mood"]>, string> = {
  happy: "bg-pink-100 border-pink-200",
  curious: "bg-sky-100 border-sky-200",
  excited: "bg-yellow-100 border-yellow-200",
};

export default function HeidiBubble({ text, mood = "happy", side = "right", className = "", imageSrc }: HeidiBubbleProps) {
  const direction = side === "left" ? "sm:flex-row" : "sm:flex-row-reverse";

  return (
    <div className={`flex flex-col items-center gap-3 ${direction} ${className}`}>
      <div className="relative h-20 w-20 shrink-0 rounded-2xl border-2 border-white/80 bg-white/92 p-1 shadow-md">
        <Image
          src={
            imageSrc ??
            (mood === "happy"
              ? "/heidi-assets/avatar-happy.png"
              : mood === "curious"
                ? "/heidi-assets/avatar-curious.png"
                : "/heidi-assets/avatar-excited.png")
          }
          alt="Heidi mascot"
          fill
          className="object-contain"
          sizes="80px"
        />
      </div>
      <p className={`max-w-[20rem] rounded-2xl border-2 px-4 py-2 text-sm font-semibold text-ui-charcoal shadow-sm ${moodTone[mood]}`}>{text}</p>
    </div>
  );
}
