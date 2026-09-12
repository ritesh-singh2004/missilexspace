'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import {
  Rocket,
  Cpu,
  Image as ImageIcon,
  Compass,
  Satellite,
  ShieldCheck,
  Radio,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Flame,
  Layers,
  Activity,
  Gauge,
  Sparkles
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

export default function ActivitiesPageContent() {
  const { t } = useTranslation('pages');

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      <PageBanner
        eyebrow="OPERATIONAL SCOPE &amp; RESEARCH INFRASTRUCTURE"
        title="Active Aerospace Streams &amp; Mission Capabilities"
        description="Multi-disciplinary propulsion test stands, autonomous flight guidance computers, and verified mission telemetry archives driving national aerospace self-reliance."
        breadcrumbs={[
          { label: 'Operational Scope', href: '/activities' },
          { label: 'Active Streams & Research Tasks' }
        ]}
      />

      {/* Telemetry Metrics Bar */}
      <section className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:px-8 md:grid-cols-4 xl:px-12">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue shadow-sm">
              <Rocket className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold font-mono text-slate-950">06 Classes</p>
              <p className="text-[11px] font-medium text-slate-500">Launch Vehicle Fleet</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#E67300] shadow-sm">
              <Cpu className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold font-mono text-slate-950">08 Streams</p>
              <p className="text-[11px] font-medium text-slate-500">Autonomous Guidance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-sm">
              <Satellite className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xl font-bold font-mono text-slate-950">05 Flagships</p>
              <p className="text-[11px] font-medium text-slate-500">Deep Space Probes</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 shadow-sm">
              <Radio className="h-5 w-5 animate-pulse" />
            </span>
            <div>
              <p className="text-xl font-bold font-mono text-slate-950">24/7 Live</p>
              <p className="text-[11px] font-medium text-slate-500">Ground Telemetry</p>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric Mission Capability Bento Grid */}
      <section className="relative isolate overflow-hidden py-16 sm:py-24" aria-label="Core Capabilities">
        <div className="home-grid absolute inset-0 -z-20 opacity-60" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 space-y-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">
              Strategic Research Pillars
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Core Capabilities in Active Execution
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Integrated launch vehicle staging, supersonic aerothermodynamics, and satellite telemetry tracking networks.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Large Featured 2-Column Hero Card: Launch Vehicle Systems */}
            <article className="group relative md:col-span-2 overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl border-l-4 border-l-[#E67300] flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-[#E67300] shadow-sm">
                      <Rocket className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="rounded-md bg-amber-100/70 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-900">
                        PROPULSION &amp; ORBITAL ACCESS
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    HOT-FIRE TEST STAND ACTIVE
                  </span>
                </div>

                <h3 className="mt-6 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  Launch Vehicle Systems &amp; Multi-Stage Cryogenics
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-3xl">
                  Comprehensive mission-readiness modeling across PSLV, GSLV, and LVM3 launch architectures. Focus areas include solid motor combustion instability, cryogenic CE-20 closed-loop regenerative cooling, and automated aerodynamic stage separation.
                </p>

                {/* Propulsion Architecture Specs */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl bg-white p-5 border border-slate-200/80 shadow-inner">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Boosters</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">S200 Solid</p>
                    <p className="text-[11px] text-slate-500 font-mono">9,600 kN Peak</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Core Liquid</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">L110 Vikas</p>
                    <p className="text-[11px] text-slate-500 font-mono">1,600 kN Thrust</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Upper Stage</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">CE-20 Cryo</p>
                    <p className="text-[11px] text-slate-500 font-mono">LOX / LH2 200 kN</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Payload Capacity</p>
                    <p className="text-sm font-bold font-mono text-slate-900 mt-0.5">4,000 kg to GTO</p>
                    <p className="text-[11px] text-slate-500 font-mono">8,000 kg to LEO</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-500">
                  TESTBED: <strong className="text-slate-900">Mahendragiri High-Altitude Test Facility</strong>
                </span>
                <Link
                  href="/rockets"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-isroBlue hover:text-isroBlueDark transition active:scale-95"
                >
                  <span>Explore Launch Fleet</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>

            {/* 2. Autonomous Guidance & Seeker AI */}
            <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl border-l-4 border-l-isroBlue flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-isroBlue shadow-sm">
                    <Cpu className="h-6 w-6" />
                  </span>
                  <span className="rounded-md bg-blue-50 px-2.5 py-1 font-mono text-[10px] font-bold text-isroBlue">
                    ACTIVE GN&amp;C
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  AI Defence &amp; Guided Systems
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Milliradian-precision autonomous flight planning, radar/IR sensor integration, and terminal guidance intercept trajectories for high-g interceptors.
                </p>

                <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guidance Error</span>
                    <strong className="text-emerald-700">&lt; 0.12 mrad</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compute Cycle</span>
                    <strong className="text-slate-800">8.4 ms</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">HIL Intercept</span>
                    <strong className="text-slate-800">Verified 35G</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">8 TRACKS</span>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-isroBlue hover:text-isroBlueDark transition active:scale-95"
                >
                  <span>Explore AI</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* 3. Aerodynamics & Hypersonic Wind Tunnel Testing */}
            <article className="group relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl border-l-4 border-l-emerald-600 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
                    <Flame className="h-6 w-6" />
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-700">
                    AEROTHERMODYNAMICS
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  Hypersonic Boundary Layer &amp; Shock-Tunnel
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Shockwave boundary-layer simulation, carbon-carbon composite ablation testing, and thermal protection tile durability under Mach 6+ re-entry heating.
                </p>

                <div className="mt-6 space-y-2 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Velocity Regime</span>
                    <strong className="text-slate-800">Mach 5 to 8</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stagnation Enthalpy</span>
                    <strong className="text-slate-800">6.2 MJ/kg</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Testing Facility</span>
                    <strong className="text-slate-800">IISc Shock Tunnel</strong>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">TRL-5</span>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-isroBlue hover:text-isroBlueDark transition active:scale-95"
                >
                  <span>View Studies</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>

            {/* 4. Deep Space Network & Satellite Telemetry */}
            <article className="group relative md:col-span-2 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-xl border-l-4 border-l-purple-600 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-sm">
                      <Satellite className="h-6 w-6" />
                    </span>
                    <span className="rounded-md bg-purple-50 px-2.5 py-1 font-mono text-[10px] font-bold text-purple-700">
                      ORBITAL TELEMETRY &amp; TRACKING
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">ISTRAC BYALALU 32M DISH</span>
                </div>

                <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                  Satellite Telemetry &amp; Phased-Array Ground Stations
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Continuous telemetry downlink pipelines, orbit trajectory determination, and secure S/X-band communications servicing Chandrayaan, Aditya-L1, and Gaganyaan crewed spaceflight architectures.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs font-mono">
                  <div>
                    <p className="text-slate-400 uppercase text-[10px]">Deep Space Link</p>
                    <p className="font-bold text-slate-900 mt-0.5">1.5 Million km Reach</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase text-[10px]">Frequency Bands</p>
                    <p className="font-bold text-slate-900 mt-0.5">S, X &amp; Ka-Band</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase text-[10px]">Uptime Status</p>
                    <p className="font-bold text-emerald-700 mt-0.5">99.98% High Nominal</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">NETWORK-04</span>
                <Link
                  href="/space-systems"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-isroBlue hover:text-isroBlueDark transition active:scale-95"
                >
                  <span>Examine Space Systems</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Laboratory Testbeds Console */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-24" aria-label="Specialized Divisions">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">
                Specialized Infrastructure
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                Continuous Laboratory Disciplines
              </h2>
            </div>
            <Link
              href="/technology"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-isroBlue hover:text-isroBlueDark transition"
            >
              All technology tracks <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/90 bg-[#fbfdff] p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue">
                  <Flame className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">ACTIVE</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900">Shock-Tunnel Testing</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Non-equilibrium flow stagnation and high-temperature thermal dissipation on aerospace skins.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-[#fbfdff] p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-[#E67300]">
                  <Layers className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">STANDBY</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900">Semi-Cryo Test Cells</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Regenerative cooling flow and turbo-pump ignition tests under altitude pressure simulation.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-[#fbfdff] p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Radio className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">NOMINAL</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900">Phased-Array Telemetry</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Deep space link acquisition, down-range radar calibration, and telemetry decryption.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-[#fbfdff] p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">INTAKE</span>
              </div>
              <h4 className="mt-4 text-base font-bold text-slate-900">Cadre Fellowships</h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Postgraduate research sponsorship, flight simulator hours, and direct faculty mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="px-6 py-16 sm:px-8 xl:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-r from-[#002B5C] via-[#073B75] to-[#0A4D94] p-8 sm:p-12 text-white shadow-xl relative isolate">
          <div className="home-grid absolute inset-0 -z-10 opacity-20" aria-hidden="true" />
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 backdrop-blur-sm">
              <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              National Research Fellowships
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
              Join an Active Flight or AI Research Stream
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-blue-100/80">
              Collaborate with national laboratory scientists, test guidance algorithms on flight simulators, or publish peer-reviewed aerospace studies.
            </p>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/programs"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#CF5F00] active:scale-[0.98]"
              >
                Apply for Fellowship <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.98]"
              >
                Research Portal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
