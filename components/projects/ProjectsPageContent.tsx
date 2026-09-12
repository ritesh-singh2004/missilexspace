'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useTranslation } from 'react-i18next';
import { FolderKanban } from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

export default function ProjectsPageContent() {
  const { user } = useUser();
  const { t } = useTranslation('pages');

  return (
    <main className="min-h-screen bg-white pb-24">
      <PageBanner
        eyebrow={t('projects.eyebrow')}
        title={user?.firstName ? `${t('projects.title')} — ${user.firstName}` : t('projects.title')}
        description={t('projects.description')}
      />
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 xl:px-12">
        <div className="flex flex-col items-center justify-center border border-dashed border-line px-6 py-16 text-center">
          <FolderKanban className="h-6 w-6 text-isroBlue" />
          <p className="mt-3 font-semibold text-charcoal">{t('projects.empty')}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-steel">{t('projects.emptyDescription')}</p>
          <Link href="/research" className="mt-6 inline-flex items-center justify-center rounded bg-isroBlue px-6 py-3 text-sm font-semibold text-white transition hover:bg-isroBlueDark">
            {t('projects.submitCta')}
          </Link>
        </div>
      </div>
    </main>
  );
}
