'use client';

import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import DataTable from '@/components/patterns/DataTable';

const orgRowKeys = ['type', 'focus', 'authority', 'contact'] as const;

export default function RtiPageContent() {
  const { t } = useTranslation('pages');

  const rows: [string, string][] = orgRowKeys.map((key) => {
    const [label, value] = t(`rti.orgRows.${key}`, { returnObjects: true }) as [string, string];
    return [label, value];
  });

  const steps = t('rti.howSteps', { returnObjects: true }) as string[];

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('rti.eyebrow')} title={t('rti.title')} description={t('rti.description')} />
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16 sm:px-8 xl:px-12">
        <div>
          <h2 className="border-b border-line pb-3 text-xl font-semibold text-charcoal">{t('rti.orgLabel')}</h2>
          <div className="mt-6">
            <DataTable rows={rows} />
          </div>
        </div>

        <div>
          <h2 className="border-b border-line pb-3 text-xl font-semibold text-charcoal">{t('rti.howLabel')}</h2>
          <ol className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 text-sm leading-7 text-steel">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-isroBlue text-xs font-semibold text-white">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
