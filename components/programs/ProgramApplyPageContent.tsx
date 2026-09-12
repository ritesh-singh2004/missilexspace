'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Rocket,
  Globe,
  Clock,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Award,
  ArrowLeft,
  ExternalLink,
  Layers,
  Building,
  Users,
  FileCheck
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';
import ProgramApplicationForm from '@/components/programs/ProgramApplicationForm';
import { globalPrograms, GlobalProgram } from '@/lib/programs-data';

export default function ProgramApplyPageContent() {
  const searchParams = useSearchParams();
  const programParam = searchParams.get('program') || searchParams.get('id');

  // Find targeted program by slug, id, or title
  const selectedProgram: GlobalProgram | undefined = useMemo(() => {
    if (!programParam) return undefined;
    const lower = programParam.toLowerCase();
    return globalPrograms.find(
      (p) =>
        p.slug.toLowerCase() === lower ||
        p.id.toLowerCase() === lower ||
        p.title.toLowerCase().includes(lower)
    );
  }, [programParam]);

  // Calculate days remaining
  const daysLeft = useMemo(() => {
    if (!selectedProgram) return 60;
    const target = new Date(selectedProgram.deadline).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [selectedProgram]);

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900 pb-20">
      {/* 1. Header Blueprint Banner */}
      <PageBanner
        eyebrow="CANDIDATE ADMISSION & PACING REGISTRATION"
        title={selectedProgram ? `Application: ${selectedProgram.title}` : 'Submit Application for Global Aerospace Cohort'}
        description="Register your collegiate team or solo research investigation. Candidates are vetted on technical competence, simulation fidelity, and commitment to hard PDR/CDR milestone delivery schedules."
        breadcrumbs={[
          { label: 'Global Programs', href: '/programs' },
          { label: 'Cohort Admission Portal' }
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 mt-8">
        {/* Back Link */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-xs font-bold text-isroBlue hover:text-isroBlueDark hover:underline transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Global Programs Directory
        </Link>

        {/* 2. Targeted Program Mission Briefing Card (if pre-selected) */}
        {selectedProgram && (
          <div className="mb-10 rounded-3xl border border-isroBlue/30 bg-gradient-to-br from-white via-blue-50/20 to-amber-50/20 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-isroBlue/20 bg-isroBlue/10 px-3 py-1 font-mono text-xs font-bold text-isroBlue">
                  {selectedProgram.agency} • {selectedProgram.country}
                </span>
                <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {selectedProgram.category}
                </span>
                <span className="rounded-lg border border-amber-500/30 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-[#E67300]">
                  {selectedProgram.funding}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 font-mono text-xs font-bold text-emerald-700">
                <Clock className="h-3.5 w-3.5" />
                <span>{daysLeft} Days to Deadline ({selectedProgram.deadline})</span>
              </div>
            </div>

            <div className="mt-4 grid gap-6 md:grid-cols-12 items-center">
              <div className="md:col-span-8 space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  {selectedProgram.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedProgram.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-500 self-center mr-1">Prerequisites:</span>
                  {selectedProgram.skillsRequired.map((s) => (
                    <span key={s} className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 space-y-2 text-xs">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-isroBlue" />
                  Milestone Structure:
                </p>
                <ul className="space-y-1 text-slate-600 font-mono text-[11px]">
                  {selectedProgram.milestones.map((m) => (
                    <li key={m.step} className="flex justify-between border-b border-slate-100 pb-1">
                      <span>M{m.step}: {m.phase}</span>
                      <span className="font-bold text-slate-800">{m.dueDate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. 12-Column Grid: Protocol Sidebar + Application Form */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column (5 Cols): Admission Protocol & Rules */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-isroBlue">
                ADMISSION EVALUATION PROTOCOL
              </span>
              <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
                How Candidates Are Screened & Gated
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                Participation in international aerospace cohorts requires mathematical rigor, simulation tooling familiarity, and a binding commitment to milestone pacing.
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-200/80 pt-6">
              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Academic & Portfolio Verification</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review of university credentials, Git simulation repos (Simulink, ROS 2, OpenFOAM), and team faculty advisors within 48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Automated Velocity Pacer Assignment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enrolled teams receive an automated velocity tracker with hard deadline countdowns for PDR and CDR milestones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-xs font-bold text-[#0B4F9C]">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">National Talent Pool Accreditation</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Teams with 100% on-time milestone delivery receive verified cryptographic certificates indexed in the national aerospace talent registry.
                  </p>
                </div>
              </div>
            </div>

            {/* Helpdesk Card */}
            <div className="rounded-2xl border border-blue-200/80 bg-blue-50/60 p-5 text-xs text-slate-600">
              <p className="font-bold text-isroBlue flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                Directorate Admissions Helpdesk
              </p>
              <p className="mt-1">
                For eligibility questions or bilateral lab access, contact{' '}
                <span className="font-mono font-semibold text-slate-800">programs@missilex.res.in</span>
              </p>
            </div>

            {/* Agency Partner Note */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2 shadow-sm">
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-isroBlue" />
                Represent a Space Agency or Corporate Sponsor?
              </p>
              <p className="text-slate-500">
                You can catalog new student challenges and university fellowships directly into the global programs directory.
              </p>
              <Link
                href="/programs#ingest"
                className="inline-flex items-center gap-1.5 font-bold text-isroBlue hover:underline pt-1"
              >
                Go to Directorate Program Ingestion Terminal →
              </Link>
            </div>
          </div>

          {/* Right Column (7 Cols): Application Form */}
          <div className="lg:col-span-7">
            <ProgramApplicationForm initialProgram={selectedProgram ? selectedProgram.title : ''} />
          </div>
        </div>
      </div>
    </div>
  );
}
