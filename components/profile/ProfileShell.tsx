'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Bookmark, Calendar, Mail, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { deriveRole } from '@/lib/roles';

export default function ProfileShell() {
  const { user } = useUser();
  const { t } = useTranslation('pages');
  const role = deriveRole(user?.primaryEmailAddress?.emailAddress);
  const email = user?.primaryEmailAddress?.emailAddress;
  const createdAt = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div>
      <div className="border-b border-isroBlueDark bg-hero-band px-8 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-signal">{t('profile.title')}</p>
        <div className="mt-4 flex items-center gap-4">
          {user?.imageUrl ? (
            <Image src={user.imageUrl} alt="" width={64} height={64} className="h-16 w-16 rounded-full border border-white/20 object-cover" unoptimized />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl font-semibold text-white">
              {(user?.fullName ?? email ?? '?').charAt(0).toUpperCase()}
            </span>
          )}
          <h1 className="text-3xl font-semibold text-white">{user?.fullName || email}</h1>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            <ShieldCheck className="h-3.5 w-3.5" /> {role}
          </span>
          <span className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            <Mail className="h-3.5 w-3.5" /> {email}
          </span>
          {createdAt && (
            <span className="inline-flex items-center gap-2 rounded border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              <Calendar className="h-3.5 w-3.5" /> {t('profile.memberSince')} {createdAt}
            </span>
          )}
        </div>
      </div>

      <div className="border border-t-0 border-line px-8 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-isroBlue">{t('profile.quickActions')}</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li><Link href="/dashboard" className="text-charcoal transition hover:text-isroBlue">{t('profile.goToDashboard')} →</Link></li>
          <li><Link href="/research" className="text-charcoal transition hover:text-isroBlue">{t('profile.submitResearchProject')} →</Link></li>
          <li><Link href="/programs" className="text-charcoal transition hover:text-isroBlue">{t('profile.browsePrograms')} →</Link></li>
        </ul>
      </div>

      <div className="border border-t-0 border-line px-8 py-10 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-isroBlue">{t('profile.savedProjects')}</p>
        <div className="mt-5 flex flex-col items-center justify-center border border-dashed border-line px-6 py-10 text-center">
          <Bookmark className="h-6 w-6 text-isroBlue" />
          <p className="mt-3 font-semibold text-charcoal">{t('profile.noSavedProjects')}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-steel">{t('profile.noSavedProjectsDesc')}</p>
          <Link href="/missiles" className="mt-4 rounded bg-isroBlue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-isroBlueDark">
            {t('profile.browseMissiles')}
          </Link>
        </div>
      </div>
    </div>
  );
}
