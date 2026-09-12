'use client';

import { useUser } from '@clerk/nextjs';
import { useTranslation } from 'react-i18next';
import { ShieldAlert, Users, FileCheck, Newspaper } from 'lucide-react';
import Link from 'next/link';
import PageBanner from '@/components/patterns/PageBanner';
import { deriveRole } from '@/lib/roles';

const adminToolKeys = [
  { icon: Users, key: 'manageUsers' },
  { icon: FileCheck, key: 'approveProjects' },
  { icon: Newspaper, key: 'manageNews' }
] as const;

export default function AdminPageContent() {
  const { user, isLoaded } = useUser();
  const { t } = useTranslation('pages');
  const role = deriveRole(user?.primaryEmailAddress?.emailAddress);

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
          <p className="text-sm text-steel">{t('admin.loading')}</p>
        </div>
      </main>
    );
  }

  if (role !== 'Admin') {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
          <ShieldAlert className="mx-auto h-8 w-8 text-signalDark" />
          <h1 className="mt-4 text-2xl font-semibold text-charcoal">{t('admin.restrictedTitle')}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-steel">{t('admin.restrictedDescription')}</p>
          <Link href="/dashboard" className="mt-6 inline-flex items-center justify-center rounded bg-isroBlue px-6 py-3 text-sm font-semibold text-white transition hover:bg-isroBlueDark">
            {t('admin.backToDashboard')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      <PageBanner eyebrow={t('admin.eyebrow')} title={t('admin.title')} description={t('admin.description')} />
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 xl:px-12">
        <ul className="divide-y divide-line border-y border-line">
          {adminToolKeys.map((tool) => {
            const Icon = tool.icon;
            return (
              <li key={tool.key} className="flex items-center gap-4 py-5">
                <Icon className="h-5 w-5 shrink-0 text-isroBlue" />
                <div>
                  <p className="font-semibold text-charcoal">{t(`dashboard.adminTools.${tool.key}.title`)}</p>
                  <p className="text-sm text-steel">{t(`dashboard.adminTools.${tool.key}.description`)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
