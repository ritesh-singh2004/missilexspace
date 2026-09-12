'use client';

import Link from 'next/link';
import { Radar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('footer');

  const footerLinks = [
    { key: 'programs', href: '/programs' },
    { key: 'research', href: '/research' },
    { key: 'news', href: '/news' },
    { key: 'contact', href: '/contact' }
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-hero-band px-6 py-12 sm:px-8 xl:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white border border-white/20 shadow-sm">
              <Radar className="h-4.5 w-4.5 text-amber-400" />
            </span>
            <div>
              <p className="text-base font-bold text-white tracking-wide">मिसाइलX रॉकेट स्पेस अनुसंधान</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-300">MissileX Rocket Space</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-white/75 pt-1">{t('tagline')}</p>
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">{t('rights')}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{t('quickLinks')}</p>
            <div className="flex flex-col gap-2.5 text-sm text-white/75">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition-all duration-150 hover:text-white hover:translate-x-0.5">
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{t('resources')}</p>
            <div className="flex flex-col gap-2.5 text-sm text-white/75">
              <Link href="/privacy" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.privacy')}</Link>
              <Link href="/terms" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.terms')}</Link>
              <Link href="/careers" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.careers')}</Link>
              <Link href="/government-portals" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.govPortals')}</Link>
              <Link href="/faq" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.faq')}</Link>
              <Link href="/feedback" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.feedback')}</Link>
              <Link href="/rti" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.rti')}</Link>
              <Link href="/tenders" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.tenders')}</Link>
              <Link href="/sitemap-page" className="transition-all duration-150 hover:text-white hover:translate-x-0.5">{t('resourceLinks.sitemap')}</Link>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{t('contact')}</p>
            <p className="text-sm text-white/75">missilexrocketspace@gmail.com</p>
            <p className="text-sm text-white/75">+91 9199326333</p>
            <p className="text-sm text-white/75">{t('location')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
