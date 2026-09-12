'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/patterns/SectionHeading';
import { quickAccessOrgs } from '@/lib/quick-access';

export default function QuickAccessPortal() {
  const { t } = useTranslation('home');

  return (
    <section className="border-t border-line bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
        <SectionHeading
          eyebrow={t('quickAccess.eyebrow')}
          title={t('quickAccess.title')}
          description={t('quickAccess.description')}
        />
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {quickAccessOrgs.map((org) => (
            <a
              key={org.abbr}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 bg-white p-5 transition hover:bg-mist"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-isroBlue">{org.abbr}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-charcoal">{org.name}</p>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-steel transition group-hover:text-isroBlue" />
              </div>
              <p className="text-xs leading-5 text-steel">{org.description}</p>
              <span className="mt-auto pt-1 text-xs font-semibold uppercase tracking-[0.2em] text-signal">
                {t('quickAccess.visit')}
              </span>
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-steel">{t('quickAccess.disclaimer')}</p>
      </div>
    </section>
  );
}
