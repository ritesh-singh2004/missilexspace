'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { searchSite, type SearchEntry } from '@/lib/search-index';

export default function SiteSearch() {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setResults(searchSite(query, i18n.language as 'en' | 'hi'));
  }, [query, i18n.language]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <div ref={containerRef} className="relative">
      {open ? (
        <div className="flex items-center gap-2.5 rounded-xl border border-blue-300 bg-white px-3.5 py-1.5 shadow-md">
          <Search className="h-4 w-4 text-isroBlue shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) {
                navigateTo(results[0].href);
              }
              if (event.key === 'Escape') {
                setOpen(false);
              }
            }}
            placeholder="Search missions, missiles, rockets..."
            aria-label={t('search')}
            className="w-64 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none sm:w-80"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t('search')}
          className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-sm text-slate-700 shadow-sm transition hover:border-blue-300 hover:bg-white active:scale-[0.98]"
        >
          <Search className="h-4 w-4 text-slate-500" />
          <span className="hidden sm:inline font-medium">{t('search')}</span>
          <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 sm:inline shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      )}

      {open && query.trim() && (
        <div className="absolute right-0 top-full z-50 mt-2 w-96 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
          <div className="border-b border-slate-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Results ({results.length})
          </div>
          {results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto divide-y divide-slate-50">
              {results.map((entry) => (
                <li key={`${entry.category}-${entry.label}`}>
                  <button
                    type="button"
                    onClick={() => navigateTo(entry.href)}
                    className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-800 transition hover:bg-blue-50/70"
                  >
                    <span className="font-medium">{entry.label}</span>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                      {entry.category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-slate-500">{t('searchNoResults')}</p>
          )}
        </div>
      )}
    </div>
  );
}
