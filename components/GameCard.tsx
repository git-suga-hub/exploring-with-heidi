import Link from 'next/link';
import cn from 'classnames';

export default function GameCard({
  href,
  title,
  description,
  icon,
  className
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode; // emoji or svg
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'block rounded-[var(--radius-brand)] bg-white p-6 shadow-brand hover:-translate-y-1 hover:shadow-lg transition',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      <p className="mt-3 text-gray-700">{description}</p>
    </Link>
  );
}