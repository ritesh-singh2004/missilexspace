'use client';

import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import Accordion from '@/components/patterns/Accordion';

const questionKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

export default function FaqPageContent() {
  const { t } = useTranslation('pages');

  const items = questionKeys.map((key) => ({
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`)
  }));

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('faq.eyebrow')} title={t('faq.title')} description={t('faq.description')} />
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 xl:px-12">
        <Accordion items={items} />
      </div>
    </main>
  );
}
