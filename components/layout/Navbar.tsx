'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUser, useClerk } from '@clerk/nextjs';
import { Menu, X, Radar, ChevronDown, Compass, Rocket, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navItems } from '@/lib/nav-data';
import TopUtilityBar from '@/components/layout/TopUtilityBar';
import SiteSearch from '@/components/layout/SiteSearch';

const getDropdownIcon = (href: string) => {
  if (href === '/about') return Compass;
  if (href === '/isro-leadership') return Rocket;
  if (href === '/apj-abdul-kalam') return Award;
  return null;
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { t } = useTranslation('nav');

  return (
    <>
      <TopUtilityBar />

      <header className="sticky top-0 z-40 transition-shadow">
        <div className="border-b border-line bg-white/95 py-2.5 backdrop-blur-md shadow-xs">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 sm:px-8 xl:px-12">
          <Link href="/" className="group flex items-center gap-3 active:scale-[0.98] transition-transform">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-isroBlue/20 bg-isroBlue text-white shadow-md transition-transform group-hover:scale-105">
              <Radar className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-bold leading-tight text-charcoal sm:text-lg">{t('orgTitleHi')}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-steel font-medium">{t('orgTitle')}</p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            <SiteSearch />
            {isLoaded && isSignedIn ? (
              <>
                <Link href="/profile" className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/70 py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-slate-800 transition hover:border-isroBlue/30 hover:bg-slate-100/70 active:scale-[0.98]">
                  {user.imageUrl ? (
                    <Image src={user.imageUrl} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200" unoptimized />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-isroBlue/10 text-xs font-semibold text-isroBlue">
                      {(user.fullName ?? user.primaryEmailAddress?.emailAddress ?? '?').charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate">{user.fullName ?? user.primaryEmailAddress?.emailAddress}</span>
                </Link>
                <Link href="/dashboard" className="rounded-xl border border-isroBlue/30 px-4 py-2 text-sm font-semibold text-isroBlue transition hover:bg-isroBlue/5 active:scale-[0.98]">
                  {t('dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ redirectUrl: '/' })}
                  className="rounded-xl bg-[#E67300] px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#CF5F00] active:scale-[0.98]"
                >
                  {t('logout')}
                </button>
              </>
            ) : isLoaded ? (
              <>
                <Link href="/login" className="rounded-xl border border-isroBlue/30 px-4 py-2 text-sm font-semibold text-isroBlue transition hover:bg-isroBlue/5 active:scale-[0.98]">
                  {t('login')}
                </Link>
                <Link href="/register" className="rounded-xl bg-isroBlue px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-[0.98]">
                  {t('createAccount')}
                </Link>
              </>
            ) : null}
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center rounded border border-line bg-mist p-2 text-charcoal lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav aria-label="Primary" className="hidden border-b border-white/10 bg-isroBlue lg:block">
        <ul className="mx-auto flex max-w-7xl flex-nowrap items-center px-3 py-1 sm:px-4 xl:px-6">
          {navItems.map((item) => {
            const isChildActive = item.children?.some(c => pathname === c.href || (c.href !== '/' && pathname.startsWith(c.href + '/')));
            const isActive = (item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/')) || !!isChildActive;
            const hasChildren = !!item.children;
            const isOpen = openMenu === item.href;

            return (
              <li
                key={item.href}
                className="relative shrink-0"
                onMouseEnter={() => hasChildren && setOpenMenu(item.href)}
                onMouseLeave={() => hasChildren && setOpenMenu(null)}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(item.href)}
                    className={`relative flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all active:scale-[0.98] xl:px-3 ${
                      isActive || isOpen
                        ? 'bg-white/20 text-white font-bold shadow-inner'
                        : 'text-white/85 hover:bg-white/12 hover:text-white'
                    }`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {t(`items.${item.i18nKey}`)}
                    <ChevronDown className={`h-3 w-3 opacity-75 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#E67300]" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`relative flex items-center gap-1 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition-all active:scale-[0.98] xl:px-3 ${
                      isActive
                        ? 'bg-white/20 text-white font-bold shadow-inner'
                        : 'text-white/85 hover:bg-white/12 hover:text-white'
                    }`}
                  >
                    {t(`items.${item.i18nKey}`)}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#E67300]" />
                    )}
                  </Link>
                )}

                {hasChildren && isOpen && (
                  <div className="absolute left-0 top-full z-50 w-[380px] rounded-2xl border border-slate-200/90 bg-white p-2.5 shadow-[0_20px_50px_rgba(15,23,42,0.22)] mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']">
                    {item.children!.map((child) => {
                      const Icon = getDropdownIcon(child.href);
                      const isCurrent = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          prefetch={true}
                          onClick={() => setOpenMenu(null)}
                          className={`group flex items-start gap-3 rounded-xl p-3 transition-all active:scale-[0.98] ${
                            isCurrent
                              ? 'bg-blue-50/90 border border-blue-200/80 shadow-xs'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          {Icon && (
                            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isCurrent
                                ? 'bg-isroBlue text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100/70 group-hover:text-isroBlue'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className={`text-sm font-bold transition-colors ${
                              isCurrent ? 'text-isroBlue' : 'text-slate-900 group-hover:text-isroBlue'
                            }`}>
                              {t(`items.${child.i18nKey}`)}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                              {t(`items.${child.i18nKey}Desc`)}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {mobileOpen ? (
        <div className="max-h-[75vh] overflow-y-auto border-t border-line bg-white px-6 py-5 lg:hidden">
          <div className="mb-4">
            <SiteSearch />
          </div>
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  {item.children ? (
                    <button
                      type="button"
                      aria-label={`Toggle ${t(`items.${item.i18nKey}`)} submenu`}
                      onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                      className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-charcoal transition hover:text-isroBlue"
                    >
                      <span className="font-semibold text-slate-800">{t(`items.${item.i18nKey}`)}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === item.href ? 'rotate-180 text-isroBlue' : 'text-steel'}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="flex-1 py-2.5 text-sm font-medium text-charcoal transition hover:text-isroBlue"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(`items.${item.i18nKey}`)}
                    </Link>
                  )}
                </div>
                {item.children && mobileExpanded === item.href && (
                  <div className="ml-2 mb-2 flex flex-col gap-1.5 border-l-2 border-isroBlue/30 pl-3 pt-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        prefetch={true}
                        className={`rounded-lg py-2 px-2 text-sm transition hover:bg-slate-50 ${pathname === child.href ? 'bg-blue-50/80 font-bold text-isroBlue' : 'text-slate-700'}`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <p className="text-sm font-semibold text-slate-900">{t(`items.${child.i18nKey}`)}</p>
                        <p className="text-xs text-slate-500 leading-snug">{t(`items.${child.i18nKey}Desc`)}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
              {isLoaded && isSignedIn ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded border border-isroBlue/25 px-4 py-2 text-sm font-medium text-isroBlue"
                  >
                    {user.imageUrl ? (
                      <Image src={user.imageUrl} alt="" width={24} height={24} className="h-6 w-6 rounded-full object-cover" unoptimized />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-isroBlue/10 text-xs font-semibold text-isroBlue">
                        {(user.fullName ?? user.primaryEmailAddress?.emailAddress ?? '?').charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="truncate">{user.fullName ?? user.primaryEmailAddress?.emailAddress}</span>
                  </Link>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded border border-isroBlue/25 px-4 py-2 text-center text-sm font-medium text-isroBlue">
                    {t('dashboard')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => signOut({ redirectUrl: '/' })}
                    className="rounded bg-signal px-4 py-2 text-sm font-semibold text-white"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : isLoaded ? (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded border border-isroBlue/25 px-4 py-2 text-center text-sm font-medium text-isroBlue">
                    {t('login')}
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="rounded bg-isroBlue px-4 py-2 text-center text-sm font-semibold text-white">
                    {t('createAccount')}
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
    </>
  );
}
