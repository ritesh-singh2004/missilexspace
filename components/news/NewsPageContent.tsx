'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Radio, Calendar, ArrowRight, ArrowUpRight, Newspaper, Bell, Sparkles, Filter } from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';
import { newsArticles, type NewsArticle } from '@/lib/news';

const categories = ['All', 'Programme', 'Technology', 'Announcement', 'Research'] as const;

export default function NewsPageContent() {
  const { t } = useTranslation('pages');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [lead, ...rest] = newsArticles;

  const filteredArticles = rest.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.tag.toLowerCase() === activeCategory.toLowerCase();
  });

  const getBadgeClass = (tag: string) => {
    const l = tag.toLowerCase();
    if (l.includes('programme')) return 'bg-blue-50 text-isroBlue border-blue-200';
    if (l.includes('technology')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (l.includes('announcement')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    return 'bg-purple-50 text-purple-700 border-purple-200';
  };

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      <PageBanner
        eyebrow={t('news.eyebrow')}
        title={t('news.title')}
        description={t('news.description')}
        breadcrumbs={[
          { label: 'Public Communications', href: '/news' },
          { label: 'National Gazettes & Technology Updates' }
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 xl:px-12">
        {/* Featured Editorial Lead Story */}
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-blue-300 hover:shadow-[0_24px_50px_rgba(10,77,140,0.1)]">
          <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />

          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(lead.tag)}`}>
                  {lead.tag}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  {lead.date}
                </span>
                <span className="rounded-full bg-amber-100/80 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-900">
                  Lead Dispatch
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl group-hover:text-isroBlue transition-colors">
                {lead.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                {lead.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                <span className="text-xs font-semibold text-slate-500">Official Directorate Dispatch</span>
                <span className="font-mono text-xs text-slate-400">DOC-ID: MX-2026-07</span>
              </div>
            </div>

            {lead.image && (
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src={lead.image}
                  alt={lead.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-xs font-semibold">
                  Vehicle Assembly &amp; Cleanroom Integration Facility
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Category Filters Control Strip */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-isroBlue text-white shadow-md'
                      : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredArticles.length}</span> dispatches
          </p>
        </div>

        {/* Secondary Articles Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <article
              key={article.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(10,77,140,0.08)]"
            >
              <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-isroBlue to-[#E67300] opacity-80" />

              <div>
                <div className="flex items-center justify-between">
                  <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(article.tag)}`}>
                    {article.tag}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {article.date}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400 font-mono text-[10px]">VERIFIED BRIEF</span>
                <span className="text-isroBlue group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-bold">
                  Read details <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Dispatch Subscription Strip */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-r from-[#002B5C] via-[#073B75] to-[#0A4D94] p-8 sm:p-12 text-white shadow-xl relative isolate">
          <div className="home-grid absolute inset-0 -z-10 opacity-20" aria-hidden="true" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 backdrop-blur-sm">
                <Bell className="h-3.5 w-3.5 text-amber-400" />
                Gazette Bulletins
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                Receive Technical Dispatches &amp; Mission Gazettes
              </h2>
              <p className="mt-2 text-sm text-blue-100/80">
                Direct distribution of test flight summary releases, conference publications, and call-for-paper notices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:w-96 shrink-0">
              <input
                type="email"
                placeholder="researcher@institute.ac.in"
                aria-label="Email address for gazette notifications"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 outline-none focus:border-amber-400 focus:bg-white/15"
              />
              <button
                type="button"
                className="rounded-xl bg-[#E67300] px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-[#CF5F00] active:scale-[0.98] transition shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

