import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  linkHref,
  linkLabel,
  tone = 'light'
}: {
  eyebrow: string;
  title: string;
  description?: string;
  linkHref?: string;
  linkLabel?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <div className={`flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between ${isDark ? 'border-white/15' : 'border-slate-200/90'}`}>
      <div>
        <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' : 'bg-blue-50 text-isroBlue border border-blue-100'}`}>
          {eyebrow}
        </span>
        <h2 className={`mt-2.5 max-w-3xl text-balance text-2xl font-bold tracking-tight sm:text-3xl ${isDark ? 'text-white' : 'text-slate-950'}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-2.5 max-w-2xl text-sm leading-7 ${isDark ? 'text-white/75' : 'text-slate-600'}`}>
            {description}
          </p>
        )}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className={`group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold transition-all duration-200 active:scale-[0.98] ${isDark ? 'text-blue-200 hover:text-white' : 'text-isroBlue hover:text-isroBlueDark'}`}
        >
          {linkLabel}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
