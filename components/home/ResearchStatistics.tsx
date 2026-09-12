'use client';

import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/patterns/SectionHeading';
import { researchStatistics } from '@/lib/site-data';

export default function ResearchStatistics() {
  const { t } = useTranslation('home');

  return (
    <section className="border-t border-isroBlueDark bg-hero-band py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
        <SectionHeading eyebrow={t('statistics.eyebrow')} title={t('statistics.title')} tone="dark" />
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-3 lg:grid-cols-6">
          {researchStatistics.map((stat) => (
            <div key={stat.label} className="bg-[#07385F] px-4 py-6 text-center">
              <p className="text-3xl font-semibold tracking-tight text-signal">{stat.value}</p>
              <p className="mt-2 text-[11px] uppercase leading-4 tracking-[0.18em] text-white/65">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
