'use client';

import { useTranslation } from 'react-i18next';
import { Camera, ShieldCheck, Database, Layers } from 'lucide-react';

export default function GalleryPageBanner() {
  const { t } = useTranslation('pages');
  
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 py-14 sm:py-20 backdrop-blur-md">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F9C0a_1px,transparent_1px),linear-gradient(to_bottom,#0B4F9C0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-amber-100/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('gallery.eyebrow')}</span>
          </div>
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">•</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E67300]">SOVEREIGN MEDIA REPOSITORY</span>
        </div>

        <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
          {t('gallery.title')}
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {t('gallery.description')}
        </p>

        {/* Telemetry metadata strip */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">GODL-IN</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">License Standard</div>
            <div className="mt-1 text-[11px] font-medium text-emerald-600">Open Data License India</div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">ISRO / MOD</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Official Attribution</div>
            <div className="mt-1 text-[11px] font-medium text-slate-400">Archival Verification</div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">HD READY</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Visual Quality</div>
            <div className="mt-1 text-[11px] font-medium text-slate-400">Lossless Master Stills</div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="text-2xl font-black text-slate-900 sm:text-3xl">CURATED</div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Catalog Coverage</div>
            <div className="mt-1 text-[11px] font-medium text-slate-400">13 Strategic Domains</div>
          </div>
        </div>
      </div>
    </section>
  );
}

