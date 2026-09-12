'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Rocket, 
  Layers, 
  Weight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DataTable from '@/components/patterns/DataTable';
import Breadcrumbs from '@/components/patterns/Breadcrumbs';
import type { RocketData } from '@/lib/rockets';
import { galleryImages } from '@/lib/gallery';

export default function RocketDetailContent({ rocket }: { rocket: RocketData }) {
  const { t } = useTranslation('pages');

  const relatedImages = galleryImages.filter(
    (image) => image.category === 'Launch Vehicles' || image.category === 'Space Missions'
  );

  const primaryImage = relatedImages[0];

  const specRows: [string, string][] = [
    [t('rockets.table.category'), rocket.category],
    [t('rockets.table.payload'), rocket.payload],
    ...Object.entries(rocket.specifications)
  ];

  const sections = [
    { href: '#overview', label: t('rockets.detail.overview') },
    { href: '#specifications', label: t('rockets.detail.specifications') },
    { href: '#launch-history', label: t('rockets.detail.launchHistory') },
    { href: '#gallery', label: t('rockets.detail.gallery') }
  ];

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white pb-20">
      {/* 1. HERO BLUEPRINT BANNER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 py-12 sm:py-16 backdrop-blur-md">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F9C0a_1px,transparent_1px),linear-gradient(to_bottom,#0B4F9C0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-amber-100/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Breadcrumbs items={[{ label: t('rockets.eyebrow'), href: '/rockets' }, { label: rocket.name }]} />
            <Link 
              href="/rockets" 
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-[#0B4F9C] hover:text-[#0B4F9C]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t('rockets.detail.backLink')}</span>
            </Link>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-xs font-bold text-[#0B4F9C]">
                  LAUNCH VEHICLE · {rocket.slug.toUpperCase()}
                </span>
                <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-[#E67300]">
                  {rocket.category}
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                {rocket.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {rocket.mission}
              </p>

              {/* Telemetry Metrics Ribbon */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Weight className="h-3.5 w-3.5 text-[#E67300]" />
                    {t('rockets.table.payload')}
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">{rocket.payload}</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Layers className="h-3.5 w-3.5 text-[#0B4F9C]" />
                    Stages
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">
                    {rocket.specifications.Stages || 'Multi-Stage'}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <Rocket className="h-3.5 w-3.5 text-emerald-600" />
                    Launch Track
                  </div>
                  <div className="mt-1 font-mono text-sm font-bold text-slate-900">
                    {rocket.launches.length} Key Milestones
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Image Card */}
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

      {/* 2. BODY CONTENT WITH STICKY RAIL */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sticky Left Navigator */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">
                {t('rockets.detail.sections')}
              </p>
              <ul className="mt-4 space-y-1.5">
                {sections.map((section) => (
                  <li key={section.href}>
                    <a 
                      href={section.href} 
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#0B4F9C]"
                    >
                      <span>{section.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-9 space-y-10">
            {/* Overview */}
            <section id="overview" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-[#0B4F9C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('rockets.detail.overview')}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{rocket.name} Architectural Overview</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{rocket.history}</p>
              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F9C]">{t('rockets.detail.missionProfile')}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-700">{rocket.mission}</p>
              </div>
            </section>

            {/* Specifications */}
            <section id="specifications" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#E67300]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E67300]">{t('rockets.detail.specifications')}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Technical Data Sheet</h2>
              <div className="mt-6">
                <DataTable rows={specRows} caption={`${rocket.name} — ${t('rockets.detail.dataSheet')}`} />
              </div>
            </section>

            {/* Launch History */}
            <section id="launch-history" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#0B4F9C]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('rockets.detail.launchHistory')}</span>
              </div>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">Operational Flight Record</h2>
              <div className="mt-6 divide-y divide-slate-100">
                {rocket.launches.map((entry, index) => (
                  <div key={entry} className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-mono text-xs font-bold text-[#0B4F9C]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-medium text-slate-700 mt-1 leading-relaxed">{entry}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Archival Gallery */}
            {relatedImages.length > 0 && (
              <section id="gallery" className="scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#0B4F9C]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B4F9C]">{t('rockets.detail.gallery')}</span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Archival Flight & Integration Imagery</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedImages.map((image) => (
                    <div key={image.slug} className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      <Image 
                        src={image.src} 
                        alt={image.alt} 
                        fill 
                        sizes="(max-width: 640px) 100vw, 50vw" 
                        placeholder="blur" 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-xs font-semibold text-white line-clamp-1">{image.caption}</p>
                        <p className="mt-0.5 font-mono text-[10px] text-white/70">{image.license} • {image.credit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

