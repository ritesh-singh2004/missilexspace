'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import { navItems } from '@/lib/nav-data';

const accountLinks = [
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/projects', label: 'My Projects' }
];

const utilityLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/feedback', label: 'Feedback' },
  { href: '/rti', label: 'Right to Information' },
  { href: '/tenders', label: 'Tenders & Procurement' },
  { href: '/government-portals', label: 'Government Defence & Space Portals' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' }
];

export default function SitemapPageContent() {
  const { t } = useTranslation(['pages', 'nav']);

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('pages:sitemap.eyebrow')} title={t('pages:sitemap.title')} description={t('pages:sitemap.description')} />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-3 xl:px-12">
        <div>
          <h2 className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-[0.2em] text-isroBlue">
            {t('pages:sitemap.sections.main')}
          </h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-charcoal transition hover:text-isroBlue">
                  {t(`nav:items.${item.i18nKey}`)}
                </Link>
                {item.children && (
                  <ul className="mt-1.5 ml-4 space-y-1.5 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className="text-xs text-steel transition hover:text-isroBlue">
                          {t(`nav:items.${child.i18nKey}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-[0.2em] text-isroBlue">
            {t('pages:sitemap.sections.account')}
          </h2>
          <ul className="mt-4 space-y-2">
            {accountLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-charcoal transition hover:text-isroBlue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="border-b border-line pb-3 text-sm font-semibold uppercase tracking-[0.2em] text-isroBlue">
            {t('pages:sitemap.sections.utility')}
          </h2>
          <ul className="mt-4 space-y-2">
            {utilityLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-charcoal transition hover:text-isroBlue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
