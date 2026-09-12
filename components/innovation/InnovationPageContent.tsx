'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Rocket,
  GraduationCap,
  Trophy,
  Satellite,
  Target,
  Cpu,
  CheckCircle2,
  Calendar,
  Radio,
  Flame,
  Layers,
  Lock,
  Compass
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

const incubatorTracks = [
  {
    id: 'hypersonics',
    title: 'Hypersonic Aero-Thermodynamics & Shock-Tunnel Residency',
    tag: 'HIGH-SPEED PROPULSION',
    grant: '₹15,00,000 Prototype Grant',
    stipend: '₹35,000 / mo Fellowship',
    duration: '12 Months Residency',
    facility: 'IISc / IIT Shock-Tunnel Testbeds',
    summary: 'Direct physical lab access to Mach 5–8 shock tunnels, high-enthalpy flow diagnostics, and high-temperature ceramic matrix composite testing.',
    deliverables: [
      'CFD validation against physical shock-tunnel pressure transducers.',
      'Aero-thermal boundary layer transition modeling under Mach 6+ regimes.',
      'Defense of thesis findings before national defense review panel.'
    ],
    applySlug: 'isro-respond-semi-cryo-combustion',
    featured: true
  },
  {
    id: 'ai-guidance',
    title: 'Sovereign AI Edge & Autonomous Guidance Lab',
    tag: 'AUTONOMOUS SYSTEMS',
    grant: '128x H100 GPU Hours',
    stipend: '₹30,000 / mo Fellowship',
    duration: '8 Months Residency',
    facility: 'Bengaluru AI Defense Labs',
    summary: 'Develop sub-10ms neural guidance laws, terminal proportional navigation algorithms, and multi-sensor target acquisition networks.',
    deliverables: [
      'Quantization of transformer models onto radiation-hardened FPGA payloads.',
      'Real-time 6-DOF Hardware-in-the-loop (HIL) simulation benchmark.',
      'Integration into sovereign open telemetry datalinks.'
    ],
    applySlug: 'nasa-artemis-student-challenge'
  },
  {
    id: 'microsat',
    title: 'Micro-Satellite & Space Payload Cleanroom Residency',
    tag: 'ORBITAL HARDWARE',
    grant: 'Payload Testing Facility Pass',
    stipend: '₹25,000 / mo Fellowship',
    duration: '10 Months Residency',
    facility: 'National Cleanroom & Thermal Vacuum Chambers',
    summary: 'Design, fabricate, and test 1U–6U CubeSat subsystems through thermal vacuum cycling, random vibration testing, and telemetry calibration.',
    deliverables: [
      'Structural and thermal mathematical model (STM) qualification.',
      'Solar array deployment and battery power budget verification.',
      'Ground station telemetry link margin defense.'
    ],
    applySlug: 'esa-academy-fly-your-thesis'
  },
  {
    id: 'patents',
    title: 'Defence Patent Acceleration & Sovereign IP Incubation',
    tag: 'INTELLECTUAL PROPERTY',
    grant: '100% Legal & Filing Sponsorship',
    stipend: 'Inventor Royalty Rights',
    duration: 'Rolling 90-Day Cycles',
    facility: 'MissileX Legal Directorate',
    summary: 'Full sponsorship for drafting, prior art search, and filing domestic and international aerospace patents while retaining student academic credit.',
    deliverables: [
      'Comprehensive patent novelty search & claim formulation.',
      'Filing with Indian Patent Office & PCT international conduits.',
      'Institutional licensing and commercial transfer pathways.'
    ],
    applySlug: 'axiom-space-commercial-avionics'
  }
];

export default function InnovationPageContent() {
  const { t } = useTranslation('pages');

  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white pb-24 relative isolate">
      {/* 1. HERO BLUEPRINT BANNER */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white/80 py-14 sm:py-20 backdrop-blur-md">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B4F9C0a_1px,transparent_1px),linear-gradient(to_bottom,#0B4F9C0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-70 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-amber-100/30 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0B4F9C] transition">Home</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Innovation</span>
            <span>/</span>
            <span className="text-slate-500">Testbed Incubator</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SOVEREIGN DEFENCE INCUBATOR &amp; TESTBED RESIDENCY</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.15]">
            Where early-stage research transitions into sovereign defense testbeds.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-lg">
            MissileX pairs university researchers and student engineering cadres with physical shock-tunnel testing hours, dedicated H100 GPU compute allocations, and full intellectual property sponsorship.
          </p>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">04</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Residency Tracks</p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-600">Physical Lab Access</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#0B4F9C]">128x H100</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Compute Allocation</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Dedicated Neural Clusters</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#E67300]">MACH 5–8</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Shock-Tunnel Facilities</p>
              <p className="mt-0.5 text-[11px] text-slate-500">IISc / National Testbeds</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">100% IP</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Retained Ownership</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Full Patent Sponsorship</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 xl:px-12 space-y-12">
        {/* 2. FEATURED CONCEPT BLUEPRINT CARD */}
        <section>
          <Link
            href="/concept"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-isroBlue/50 hover:shadow-xl md:flex-row md:items-center"
          >
            <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />

            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-isroBlue">
                  <Sparkles className="h-3 w-3" />
                  FLAGSHIP INITIATIVE
                </span>
                <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
                  DEFENCE BLUEPRINT
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl group-hover:text-isroBlue transition-colors">
                MissileX Integrated Defence Platform
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A high-level sovereign research proposal connecting 6-DOF trajectory models, satellite telemetry downlinks, and hardware-in-the-loop validation testbeds into a unified secure operating picture.
              </p>
            </div>

            <div className="mt-6 flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-isroBlue md:mt-0">
              <span className="rounded-xl border border-isroBlue/30 bg-isroBlue/5 px-5 py-3 group-hover:bg-isroBlue group-hover:text-white transition-all">
                Explore Blueprint &rarr;
              </span>
            </div>
          </Link>
        </section>

        {/* 3. ASYMMETRIC INCUBATOR TRACKS BENTO */}
        <section className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B4F9C]">
              ACTIVE INCUBATOR COHORTS 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
              Four Structured Testbed Residency Tracks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Each track provides direct physical facility access, recurring monthly stipends, and milestone-verified defense certificates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {incubatorTracks.map((track) => {
              if (track.featured) {
                return (
                  <article
                    key={track.id}
                    className="md:col-span-2 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-300/80 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 sm:p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#0B4F9C] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                            {track.tag}
                          </span>
                          <span className="rounded-md bg-amber-100 text-amber-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {track.grant}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-700 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-xs">
                          {track.stipend}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-6 lg:grid-cols-12 items-start">
                        <div className="lg:col-span-7">
                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                            {track.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {track.summary}
                          </p>

                          <div className="mt-4 space-y-1.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Key Milestone Deliverables:</p>
                            {track.deliverables.map((del, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">RESIDENCY PARAMETERS</p>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Duration:</span>
                              <span className="font-mono font-bold text-slate-900">{track.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Host Facility:</span>
                              <span className="font-semibold text-slate-800 text-right">{track.facility}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-100">
                              <span className="text-slate-400">Security Clearance:</span>
                              <span className="font-mono text-amber-700 font-bold">Level-2 Sovereign</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">Admission: Peer Review Panel Gated</span>
                      <Link
                        href={`/programs/apply?program=${track.applySlug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-95"
                      >
                        <span>Apply for Residency Track</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={track.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <span className="absolute left-0 top-0 h-1.5 w-full bg-isroBlue" />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-blue-50 text-[#0B4F9C] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                        {track.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700">
                        {track.stipend}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-isroBlue transition-colors">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {track.summary}
                    </p>

                    <div className="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="font-mono font-bold text-slate-800">{track.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Grant / Benefit:</span>
                        <span className="font-semibold text-amber-800 truncate ml-2">{track.grant}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Lab Residency</span>
                    <Link
                      href={`/programs/apply?program=${track.applySlug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0B4F9C] hover:underline"
                    >
                      <span>Apply Now</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. ADMISSIONS CTA TERMINAL */}
        <section className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-[#072B52] via-[#0A4D8C] to-[#0B4F9C] p-8 sm:p-12 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                2026 INTAKE CYCLE OPEN
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Submit Your Defence Fellowship &amp; Testbed Proposal
              </h2>
              <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
                Proposals are reviewed on mathematical simulation fidelity, hardware-in-the-loop feasibility, and alignment with national aerospace priorities.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#CF5F00] active:scale-95"
              >
                <span>Browse Global Programs Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/20 active:scale-95"
              >
                <span>View Published Technical Papers</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
