'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Lock, 
  Flame, 
  Clock, 
  Radar 
} from 'lucide-react';
import CareerApplicationForm from '@/components/careers/CareerApplicationForm';
import { cadreRoles, CadreRole } from '@/lib/careers-data';

export default function CareerApplyPageContent() {
  const { t } = useTranslation('careers');
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  // Match role by id or cadreCode, or fallback to first role
  const selectedRole: CadreRole = cadreRoles.find(
    (r) => r.id === roleParam || r.cadreCode.toLowerCase() === roleParam?.toLowerCase()
  ) || cadreRoles[0];

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white pb-24">
      {/* 1. TOP HERO BLUEPRINT BANNER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 py-12 sm:py-16 backdrop-blur-md">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F9C0a_1px,transparent_1px),linear-gradient(to_bottom,#0B4F9C0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-[640px] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-amber-100/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0B4F9C] transition">Home</Link>
            <span>/</span>
            <Link href="/careers" className="hover:text-[#0B4F9C] transition">Careers</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Cadre Admission Portal</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <Radar className="h-3.5 w-3.5 animate-pulse" />
            <span>SOVEREIGN AEROSPACE CADRE ADMISSION</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-2xl font-black tracking-tight text-slate-900 sm:text-4xl sm:leading-tight">
            Application: {selectedRole.title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Submit your technical dossier and portfolio for sovereign aerospace fellowship review. All positions involve direct defense research, simulation modeling, and hardware-in-the-loop validation under national defense guidelines.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/careers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F9C] hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Open Requisitions Directory
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PINNED ROLE BRIEFING CARD */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 -mt-6">
        <div className="relative overflow-hidden rounded-2xl border border-blue-200/90 bg-white p-6 sm:p-8 shadow-[0_12px_40px_rgba(11,79,156,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {selectedRole.cadreCode}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0B4F9C] border border-blue-200">
                {selectedRole.departmentLabel}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {selectedRole.stipend}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {selectedRole.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-slate-800">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                {selectedRole.clearance}
              </span>
            </div>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-12 items-start">
            <div className="lg:col-span-8">
              <h2 className="text-lg font-bold text-slate-900">{selectedRole.title}</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedRole.summary}
              </p>

              <div className="mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Primary Mission Responsibilities:</p>
                <ul className="space-y-1.5">
                  {selectedRole.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Required Tooling & Stack:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedRole.techStack.map((tech) => (
                  <span key={tech} className="rounded bg-white px-2 py-1 text-xs font-mono font-medium text-slate-700 border border-slate-200/70">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-[#0B4F9C]" />
                Direct national lab allocation upon onboarding
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 12-COL ADMISSION SECTION */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 mt-12">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Column (5 cols): Protocol & Helpdesk */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B4F9C]">
                ADMISSION EVALUATION PROTOCOL
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
                How Candidates Are Screened & Gated
              </h2>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                MissileX research appointments are awarded based on mathematical rigor, reproducible simulation code, and commitment to sovereign defense aerospace advancement.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200/80 pt-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  1
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Credential & Portfolio Review</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Evaluation of code repositories (C++, Simulink, ROS 2, OpenFOAM), research publications, or university capstones within 72 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  2
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Technical Defense & Sim Benchmark</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live technical walkthrough of your algorithm implementations or hardware telemetry models with senior aerospace researchers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  3
                </span>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Cadre Induction & Lab Clearance</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Formal fellowship offer, H100 compute cluster access credentials, and Level-2 sovereign facility clearances issued.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-5 text-xs text-slate-600 space-y-2">
              <p className="font-bold text-[#0B4F9C] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#0B4F9C]" />
                Directorate Talent Helpdesk
              </p>
              <p>For questions on security clearances, university credit transfers, or accommodation requirements, contact:</p>
              <p className="font-mono font-semibold text-slate-900">talent@missilex.res.in</p>
            </div>
          </div>

          {/* Right Column (7 cols): Application Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <div className="mb-6 pb-4 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B4F9C]">
                  CADRE ADMISSION APPLICATION
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Submit Your Mission Dossier</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Applying for: <strong className="text-slate-800">{selectedRole.title}</strong> ({selectedRole.cadreCode})
                </p>
              </div>

              <CareerApplicationForm initialPosition={selectedRole.title} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
