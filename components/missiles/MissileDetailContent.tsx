'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Zap, 
  Gauge, 
  Compass, 
  Crosshair, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Target
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DataTable from '@/components/patterns/DataTable';
import Timeline from '@/components/patterns/Timeline';
import Breadcrumbs from '@/components/patterns/Breadcrumbs';
import type { MissileData } from '@/lib/missiles';
import { missiles } from '@/lib/missiles';
import { galleryImages } from '@/lib/gallery';

export default function MissileDetailContent({ missile }: { missile: MissileData }) {
  const { t } = useTranslation('pages');

  const relatedMissiles = missiles
    .filter((item) => item.type === missile.type && item.slug !== missile.slug)
    .slice(0, 3);

  // Match the specific missile image if available (e.g. agni-launch for agni, brahmos-launch for brahmos)
  const primaryImage = 
    galleryImages.find((img) => img.slug === `${missile.slug}-launch`) ||
    galleryImages.find((img) => img.caption.toLowerCase().includes(missile.name.toLowerCase())) ||
    galleryImages.find((img) => img.category === 'Indian Missiles');

  const relatedGallery = galleryImages.filter((img) => 
    img.category === 'Indian Missiles' || 
    img.caption.toLowerCase().includes(missile.name.toLowerCase())
  );

  const specRows: [string, string][] = [
    [t('missiles.table.type'), missile.type],
    [t('missiles.table.range'), missile.range],
    [t('missiles.table.guidance'), missile.guidance],
    ...Object.entries(missile.specifications)
  ];

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white pb-20">
      {/* 1. HERO BLUEPRINT BANNER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 py-12 sm:py-16 backdrop-blur-md">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F9C0a_1px,transparent_1px),linear-gradient(to_bottom,#0B4F9C0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-amber-100/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Breadcrumbs items={[{ label: t('missiles.eyebrow'), href: '/missiles' }, { label: missile.name }]} />
            <Link 
              href="/missiles" 
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-[#0B4F9C] hover:text-[#0B4F9C]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t('missiles.detail.backLink')}</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-bold text-[#0B4F9C]">
                  SYS-ID: {missile.slug.toUpperCase()}
                </span>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-[#E67300]">
                  {missile.type}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                {missile.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {missile.purpose}
              </p>

              {/* Telemetry Metrics Ribbon */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Target className="h-3.5 w-3.5 text-[#E67300]" />
                    Range
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">{missile.range}</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Compass className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Guidance
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-900 line-clamp-1" title={missile.guidance}>
                    {missile.guidance}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                    Speed
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">
                    {missile.specifications.Speed || 'Hypersonic / Super'}
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Photographic Card */}
            <div className="lg:col-span-5">
              {primaryImage && (
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image 
                      src={primaryImage.src} 
                      alt={primaryImage.alt} 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 40vw" 
                      placeholder="blur" 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-xs font-semibold text-white">{primaryImage.caption}</p>
                      <p className="mt-1 font-mono text-[10px] text-white/70">
                        {primaryImage.credit} • {primaryImage.license}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. HISTORY & TECHNICAL ARCHITECTURE BENTO */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: History & Technology Overview */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0B4F9C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('missiles.detail.history')}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Operational History & Strategic Role
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {missile.history}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#E67300]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E67300]">{t('missiles.detail.techOverview')}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Propulsion & Guidance Architecture
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {missile.technology}
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 p-3 text-[11px] font-medium text-slate-500">
                {t('missiles.detail.disclaimer')}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#0B4F9C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('missiles.detail.timeline')}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Development & Induction Milestones
              </h2>
              <div className="mt-6">
                <Timeline entries={missile.timeline.map((entry) => ({ date: entry.split(' ')[0], title: entry.replace(/^\S+\s/, '') }))} />
              </div>
            </div>
          </div>

          {/* Right: Technical Specifications */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#E67300]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E67300]">{t('missiles.detail.specifications')}</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Technical Dossier</h3>
              <div className="mt-6">
                <DataTable rows={specRows} />
              </div>
            </div>

            {/* Related Research Systems */}
            {relatedMissiles.length > 0 && (
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#0B4F9C]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('missiles.detail.relatedResearch')}</span>
                </div>
                <h3 className="mt-2 text-base font-bold text-slate-900">Associated Strategic Systems</h3>

                <div className="mt-4 space-y-3">
                  {relatedMissiles.map((related) => (
                    <Link 
                      key={related.slug}
                      href={`/missiles/${related.slug}`} 
                      className="group flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/50 p-3.5 transition hover:border-[#0B4F9C] hover:bg-white hover:shadow-sm"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-[#0B4F9C]">
                          {related.name}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500 line-clamp-1">{related.purpose}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs font-semibold text-[#0B4F9C]">{related.range}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0B4F9C] group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED ARCHIVAL GALLERY */}
      {relatedGallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 pt-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('missiles.detail.gallery')}</span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Strategic Test & Deployment Imagery
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Photographic records certified under GODL-India and Ministry of Defence archival releases.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGallery.map((image) => (
              <div 
                key={image.slug} 
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm"
              >
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill 
                  sizes="(max-width: 640px) 100vw, 33vw" 
                  placeholder="blur" 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="text-xs font-semibold text-white line-clamp-2">{image.caption}</p>
                  <p className="mt-1 font-mono text-[10px] text-white/70">{image.license} • {image.credit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

