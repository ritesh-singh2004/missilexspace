'use client';

import { ExternalLink, Landmark, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/patterns/SectionHeading';
import { govDefenceSpacePortals } from '@/lib/gov-portals';

export default function GovPortalsSection({ headingLinkHref, showHeading = true }: { headingLinkHref?: string; showHeading?: boolean }) {
  const { t } = useTranslation('pages');

  return (
    <section className="border-t border-slate-200/80 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
        {showHeading && (
          <SectionHeading
            eyebrow={t('govPortals.eyebrow')}
            title={t('govPortals.title')}
            description={t('govPortals.description')}
            linkHref={headingLinkHref}
            linkLabel={headingLinkHref ? t('govPortals.viewAll') : undefined}
          />
        )}

        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${showHeading ? 'mt-10' : ''}`}>
          {govDefenceSpacePortals.map((portal) => (
            <article
              key={portal.abbr}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(10,77,140,0.12)]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-isroBlue transition-colors group-hover:bg-isroBlue group-hover:text-white">
                    <Landmark className="h-5 w-5" />
                  </span>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                    {portal.abbr}
                  </span>
                </div>

                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{portal.category}</p>
                <h3 className="mt-1 text-base font-bold leading-snug text-slate-950 group-hover:text-isroBlue transition-colors">
                  {portal.name}
                </h3>
                <p className="mt-2.5 text-xs leading-5 text-slate-600">
                  {portal.description}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('govPortals.visitButton')} — ${portal.name}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-isroBlue px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-200 hover:bg-isroBlueDark hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-200"
                >
                  {t('govPortals.visitButton')}
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  <span className="sr-only"> ({t('govPortals.opensNewTab')})</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-5 shadow-sm">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#E67300]" aria-hidden="true" />
          <p className="text-xs leading-6 font-medium text-slate-800">{t('govPortals.notice')}</p>
        </div>
      </div>
    </section>
  );
}
