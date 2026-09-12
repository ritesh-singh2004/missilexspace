'use client';

import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import GovPortalsSection from '@/components/govPortals/GovPortalsSection';

export default function GovPortalsPageContent() {
  const { t } = useTranslation('pages');

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('govPortals.eyebrow')} title={t('govPortals.title')} description={t('govPortals.description')} />
      <GovPortalsSection showHeading={false} />
    </main>
  );
}
