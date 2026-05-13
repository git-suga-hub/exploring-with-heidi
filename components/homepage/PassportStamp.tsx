import Image from "next/image";

type PassportStampProps = {
  label: string;
  imageSrc?: string;
};

export default function PassportStamp({ label, imageSrc }: PassportStampProps) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/90 bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-ui-charcoal shadow-sm">
      {imageSrc ? (
        <span className="relative h-5 w-5">
          <Image src={imageSrc} alt="Stamp icon" fill className="object-contain" sizes="20px" />
        </span>
      ) : null}
      {label}
    </span>
  );
}
