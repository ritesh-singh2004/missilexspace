'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Compass, ShieldCheck, Orbit, Rocket, Radio, ArrowRight, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';
import SectionHeading from '@/components/patterns/SectionHeading';
import OrgChart from '@/components/about/OrgChart';
import TeamSection from '@/components/about/TeamSection';

const timelineData = [
  {
    year: '2019',
    title: 'MissileX Founded',
    badge: 'GENESIS',
    description: 'Established as a national, sovereign aerospace and defence research initiative focused on strategic autonomy.',
    tags: ['Aero-Ballistics', 'Defence Autonomy', 'National Charter']
  },
  {
    year: '2021',
    title: 'Inaugural Research Cohort',
    badge: 'RESEARCH CADRE',
    description: 'Inaugural Research Fellowship and Student Internship cohorts commenced structured studies across 14 university labs.',
    tags: ['14 Universities', 'First 50 Fellows', 'Laboratory Synthesis']
  },
  {
    year: '2023',
    title: 'Secure Telemetry Platform',
    badge: 'INFRASTRUCTURE',
    description: 'Introduced cryptographic role-based access for researchers, mission data pipelines, and distributed simulations.',
    tags: ['Role-Based Access', 'Data Encryption', 'Real-Time Telemetry']
  },
  {
    year: '2025',
    title: 'Expanded Flight & AI Portfolio',
    badge: 'SCALE',
    description: 'Integrated dedicated Launch Vehicle Mark-3 and AI Defence Research streams into continuous national testing.',
    tags: ['LVM3 Integration', 'Autonomous Guidance', 'Hypersonic Studies']
  }
];

export default function AboutContent() {
  const { t } = useTranslation('about');

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      <PageBanner
        eyebrow={t('banner.eyebrow')}
        title={t('banner.title')}
        description={t('banner.description')}
        breadcrumbs={[
          { label: 'Institutional Profile', href: '/about' },
          { label: 'Strategic Overview' }
        ]}
      />

      {/* Vision & Mission Bento Grid */}
      <section className="relative isolate overflow-hidden border-b border-blue-100 py-16 sm:py-20" aria-label="Vision and Mission">
        <div className="home-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />
        <div className="home-halo absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full" aria-hidden="true" />
        <div className="home-halo home-halo--orange absolute -right-20 bottom-10 -z-10 h-72 w-72 rounded-full" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Vision Card */}
            <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_50px_rgba(10,77,140,0.1)]">
              <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue to-blue-500" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-isroBlue shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Compass className="h-6 w-6" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-isroBlue">
                    <Sparkles className="h-3 w-3" />
                    {t('vision.eyebrow')}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {t('vision.title')}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {t('vision.body')}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Sovereign Guidance
                  </span>
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Indigenous Aerospace
                  </span>
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Mission Intelligence
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> National Strategic Pillar
                </span>
                <span className="font-mono text-[11px] text-slate-400">HORIZON-2047</span>
              </div>
            </article>

            {/* Mission Card */}
            <article className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_24px_50px_rgba(230,115,0,0.12)]">
              <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#E67300] to-amber-400" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#E67300] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Rocket className="h-6 w-6" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    <Radio className="h-3 w-3 text-amber-600 animate-pulse" />
                    {t('mission.eyebrow')}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {t('mission.title')}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {t('mission.body')}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Cross-Agency Integration
                  </span>
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Research Fellowships
                  </span>
                  <span className="rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200/80">
                    Verifiable Telemetry
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="h-4 w-4 text-isroBlue" /> Multi-Disciplinary Delivery
                </span>
                <span className="font-mono text-[11px] text-slate-400">COLLAB-PORTAL</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Organizational Architecture */}
      <section className="border-b border-slate-200/80 py-16 sm:py-24" aria-label="Organizational Architecture">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue shadow-sm">
              <Orbit className="h-3 w-3" />
              {t('orgStructure.eyebrow')}
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {t('orgStructure.title')}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Structured national research hierarchy connecting governing authorities, laboratory divisions, and fellowship squads.
            </p>
          </div>

          <div className="mt-8">
            <OrgChart />
          </div>
        </div>
      </section>

      {/* Founding Timeline */}
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-24" aria-label="Founding Milestones">
        <div className="home-grid absolute inset-0 -z-20 opacity-40" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue">
              <Rocket className="h-3 w-3" />
              {t('timeline.eyebrow')}
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {t('timeline.title')}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timelineData.map((item, idx) => (
              <div
                key={item.year}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-[#fbfdff] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-isroBlue tracking-tight">
                      {item.year}
                    </span>
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-isroBlue border border-blue-100">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-950 group-hover:text-isroBlue transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Cadre */}
      <section className="py-16 sm:py-24" aria-label="Leadership Team">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue shadow-sm">
                <ShieldCheck className="h-3 w-3" />
                {t('leadership.eyebrow')}
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight text-slate-950">
                {t('leadership.title')}
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                {t('leadership.description')}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-isroBlue hover:text-isroBlueDark transition"
            >
              Contact leadership squad <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <TeamSection />
        </div>
      </section>

      {/* Call to Action Banner matching Homepage */}
      <section className="px-6 pb-20 sm:px-8 xl:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-r from-[#002B5C] via-[#073B75] to-[#0A4D94] p-8 sm:p-12 text-white shadow-xl relative isolate">
          <div className="home-grid absolute inset-0 -z-10 opacity-20" aria-hidden="true" />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 backdrop-blur-sm">
              <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              Collaborative Research Network
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
              Ready to contribute to national aerospace programmes?
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-blue-100/80">
              Apply for the 2026 fellowship cohort, explore shared university laboratories, or access research documentation.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#CF5F00] active:scale-[0.98]"
              >
                Explore Fellowships <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]"
              >
                Sign in to Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

