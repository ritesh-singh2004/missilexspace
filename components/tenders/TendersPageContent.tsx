'use client';

import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import { tenders, type Tender } from '@/lib/tenders';

const statusStyles: Record<Tender['status'], string> = {
  Open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-mist text-steel border-line',
  Awarded: 'bg-isroBlue/10 text-isroBlue border-isroBlue/20'
};

export default function TendersPageContent() {
  const { t } = useTranslation('pages');

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('tenders.eyebrow')} title={t('tenders.title')} description={t('tenders.description')} />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 xl:px-12">
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-isroBlue text-white">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]">{t('tenders.table.id')}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]">{t('tenders.table.title')}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]">{t('tenders.table.category')}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]">{t('tenders.table.closing')}</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em]">{t('tenders.table.status')}</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender, index) => (
                <tr key={tender.id} className={index % 2 === 0 ? 'bg-white' : 'bg-mist/60'}>
                  <td className="border-b border-line px-4 py-3 font-mono text-xs text-charcoal">{tender.id}</td>
                  <td className="border-b border-line px-4 py-3 text-charcoal">{tender.title}</td>
                  <td className="border-b border-line px-4 py-3 text-steel">{tender.category}</td>
                  <td className="border-b border-line px-4 py-3 text-steel">{tender.closingDate}</td>
                  <td className="border-b border-line px-4 py-3">
                    <span className={`inline-flex items-center rounded border px-2.5 py-1 text-xs font-semibold ${statusStyles[tender.status]}`}>
                      {tender.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 max-w-2xl">
          <h2 className="text-lg font-semibold text-charcoal">{t('tenders.participateLabel')}</h2>
          <p className="mt-3 text-sm leading-7 text-steel">{t('tenders.participateBody')}</p>
        </div>
      </div>
    </main>
  );
}
