import Image from "next/image";

type ExplorerBadgeProps = {
  label: string;
  imageSrc?: string;
};

export default function ExplorerBadge({ label, imageSrc }: ExplorerBadgeProps) {
  return (
    <div className="rounded-3xl border-2 border-white/85 bg-white/90 px-3 py-3 text-center shadow-sm">
      {imageSrc ? (
        <div className="relative mx-auto h-20 w-20">
          <Image src={imageSrc} alt={`${label} badge`} fill className="object-contain" sizes="80px" />
        </div>
      ) : null}
      <p className="mt-2 font-display text-lg leading-tight text-ui-charcoal">{label}</p>
    </div>
  );
}
