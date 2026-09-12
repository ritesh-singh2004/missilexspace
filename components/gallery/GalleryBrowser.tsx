'use client';

import { useMemo, useState } from 'react';
import { Search, X, LayoutGrid, ListFilter, ShieldCheck, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MasonryGallery from '@/components/patterns/MasonryGallery';
import { galleryCategories, galleryImages, type GalleryCategory } from '@/lib/gallery';

const categories: (GalleryCategory | 'All')[] = ['All', ...galleryCategories];

export default function GalleryBrowser() {
  const { t } = useTranslation('pages');
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: galleryImages.length };
    galleryCategories.forEach((cat) => {
      counts[cat] = galleryImages.filter((img) => img.category === cat).length;
    });
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const byCategory = active === 'All' ? galleryImages : galleryImages.filter((image) => image.category === active);
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (image) => image.caption.toLowerCase().includes(q) || image.alt.toLowerCase().includes(q) || image.category.toLowerCase().includes(q)
    );
  }, [active, query]);

  return (
    <div className="space-y-8">
      {/* 1. FILTER & SEARCH CONTROL CONSOLE */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('gallery.searchPlaceholder')}
              aria-label={t('gallery.searchPlaceholder')}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-[#0B4F9C] focus:ring-2 focus:ring-[#0B4F9C]/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results Counter Telemetry */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <ImageIcon className="h-4 w-4 text-[#0B4F9C]" />
            <span>
              Showing <strong className="text-slate-900 font-bold">{filtered.length}</strong> of {galleryImages.length} archival stills
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          {categories.map((category) => {
            const count = categoryCounts[category] || 0;
            // Only show categories that have images or the "All" tab to prevent empty clutter
            if (count === 0 && category !== 'All') return null;

            const isSelected = active === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#0B4F9C] text-white shadow-sm ring-2 ring-[#0B4F9C]/30'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{t(`gallery.categories.${category === 'All' ? 'all' : category}`)}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. GALLERY GRID / EMPTY STATE */}
      <div>
        {filtered.length > 0 ? (
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-sm">
            <MasonryGallery images={filtered} />
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0B4F9C]">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">{t('gallery.emptyTitle')}</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">{t('gallery.emptyDescription')}</p>
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setActive('All'); }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Reset Search Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. GODL-INDIA LEGAL & ATTRIBUTION FOOTNOTE */}
      <div className="rounded-2xl border border-blue-200/80 bg-blue-50/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[#0B4F9C] mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F9C]">
                Archival Rights & Attribution Policy
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 max-w-3xl">
                All media displayed within this archive is reproduced under the Government Open Data License – India (GODL) or with express attribution to the Indian Space Research Organisation (ISRO), Ministry of Defence (MoD), and Press Information Bureau (PIB). Images may be utilized for academic research, education, and technical reference in accordance with national open data standards.
              </p>
            </div>
          </div>
          <a
            href="https://data.gov.in/sites/default/files/Gazette_Notification_OGDL.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 shrink-0 text-xs font-semibold text-[#0B4F9C] hover:underline"
          >
            <span>View GODL Gazette</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

