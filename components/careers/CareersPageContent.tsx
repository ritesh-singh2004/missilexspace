'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { cadreRoles } from '@/lib/careers-data';

const categoryTabs = [
  { id: 'all', label: 'All Openings (5)' },
  { id: 'guidance', label: 'Guidance & GN&C (1)' },
  { id: 'ai', label: 'AI & Sensor Fusion (1)' },
  { id: 'software', label: 'Software & Telemetry (1)' },
  { id: 'cyber', label: 'Cyber Defence (1)' },
  { id: 'propulsion', label: 'Propulsion & Aero (1)' }
];

export default function CareersPageContent() {
  const { t } = useTranslation('pages');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPositions = cadreRoles.filter((pos) => {
    if (activeFilter === 'all') return true;
    return pos.department === activeFilter;
  });

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white">
      {/* 1. HERO & BLUEPRINT BANNER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-24">
        <div className="home-grid absolute inset-0 -z-10 opacity-40 pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              SOVEREIGN AEROSPACE TALENT CADRE 2026
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.15]">
              Opportunities in defence research, software engineering, and aerospace systems.
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Join multidisciplinary mission teams advancing guidance software, autonomous AI telemetry, and liquid propulsion platforms for national security and space exploration.
            </p>
          </div>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">05</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Active Requisitions</p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-600">Immediate Intake</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">TRL 4–6</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Validation Labs</p>
              <p className="mt-0.5 text-[11px] text-slate-500">HIL Testbeds &amp; Rigs</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#0B4F9C]">HYBRID</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Work Modality</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Bengaluru &amp; Noida</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#E67300]">LEVEL-2</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Security Clearance</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Sovereign Protocol</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CADRE ROLES TERMINAL */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 sm:px-8 sm:pt-16 sm:pb-32 xl:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">
              Current Openings
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Research &amp; Engineering Cadre Positions
            </h2>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-isroBlue text-white shadow-sm ring-2 ring-isroBlue/20'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Role Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredPositions.map((pos) => {
            return (
              <article
                key={pos.id}
                className={`group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg ${
                  pos.featured && activeFilter === 'all' ? 'md:col-span-2 bg-gradient-to-br from-white via-white to-blue-50/40 border-l-4 border-l-isroBlue' : ''
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-md bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-isroBlue">
                        {pos.cadreCode}
                      </span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
                        {pos.departmentLabel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {pos.location}
                      </span>
                      <span className="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-[#E67300]">
                        {pos.clearance}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-isroBlue transition-colors">
                    {pos.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs font-semibold text-emerald-700">
                    {pos.stipend}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {pos.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {pos.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-mono font-medium text-slate-700 border border-slate-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Responsibilities */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Mission Duties</p>
                    {pos.responsibilities.map((resp) => (
                      <div key={resp} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-isroBlue mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Review Cycle: 72 Hours</span>
                  <Link
                    href={`/careers/apply?role=${pos.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-[0.98]"
                  >
                    <span>Apply for Position</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
