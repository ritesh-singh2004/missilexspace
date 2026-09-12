'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { newsArticles } from '@/lib/news';

export default function FlashNewsTicker() {
  const { t } = useTranslation('home');
  const items = newsArticles.slice(0, 6);
  const loop = [...items, ...items];

  return (
    <div className="border-b border-white/10 bg-isroBlueDark">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-[#E67300] px-4 py-2.5 shadow-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <Radio className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t('ticker.label')}</span>
        </div>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap">
            {loop.map((item, index) => (
              <Link
                key={`${item.title}-${index}`}
                href="/news"
                className="flex items-center gap-2 text-xs font-medium text-white/85 transition hover:text-white"
              >
                <span className="text-white/40">{item.date}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
