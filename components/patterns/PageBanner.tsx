import Link from 'next/link';
import { ChevronRight, Radio } from 'lucide-react';

export default function PageBanner({
  eyebrow,
  title,
  description,
  breadcrumbs
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  return (
    <div className="relative overflow-hidden border-b border-isroBlueDark bg-gradient-to-r from-[#072B52] via-[#0A4D8C] to-[#083863]">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="home-blueprint h-full w-full" />
      </div>
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12">
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-blue-200/70">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <ChevronRight className="h-3 w-3 text-blue-300/40" aria-hidden="true" />
          {breadcrumbs?.map((crumb, i) => (
            <span key={crumb.label} className="flex items-center gap-1.5">
              {crumb.href ? (
                <Link href={crumb.href} className="transition hover:text-white">{crumb.label}</Link>
              ) : (
                <span className="text-white/90">{crumb.label}</span>
              )}
              {i < (breadcrumbs.length - 1) && <ChevronRight className="h-3 w-3 text-blue-300/40" aria-hidden="true" />}
            </span>
          )) || <span className="text-white/90">{eyebrow}</span>}
        </nav>

        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 backdrop-blur-sm">
          <Radio className="h-3 w-3 text-amber-400 animate-pulse" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-amber-300">{eyebrow}</span>
        </div>

        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/85 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
