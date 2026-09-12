'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  CircleDot,
  Compass,
  LockKeyhole,
  MapPin,
  Orbit,
  Play,
  Radio,
  Rocket,
  Satellite,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import FlashNewsTicker from '@/components/home/FlashNewsTicker';
import StoryModal from '@/components/home/StoryModal';
import { galleryImages } from '@/lib/gallery';
import { govDefenceSpacePortals } from '@/lib/gov-portals';

const upcomingConferences = [
  {
    title: 'National Symposium on Hypersonic Aerodynamics (NSHA-2026)',
    type: 'Symposium',
    organizer: 'MissileX & Aeronautical Society',
    date: '18–20 Oct 2026',
    location: 'Chandipur ITR, Odisha',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    deadline: 'Papers due 15 Aug 2026',
    status: 'Call for Papers Open',
    actionText: 'View Call for Papers',
    actionHref: '/research'
  },
  {
    title: 'Cryogenic Propulsion & Green Propellants Technical Conclave',
    type: 'Conclave',
    organizer: 'Propulsion Systems Directorate & VSSC',
    date: '05–07 Nov 2026',
    location: 'Mahendragiri Complex',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    deadline: 'Registration Closes 20 Sep 2026',
    status: 'Delegate Registration',
    actionText: 'Register Delegate',
    actionHref: '/activities'
  },
  {
    title: 'Junior Research Fellowship (JRF) Aerospace Cohort 2026-27',
    type: 'Fellowship',
    organizer: 'Sovereign Talent Cadre & DST',
    date: 'Intake Q3 2026',
    location: 'MissileX Research Campus, Noida',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    deadline: 'Applications close 31 Jul 2026',
    status: 'Intake Active',
    actionText: 'Apply for Fellowship',
    actionHref: '/careers'
  },
  {
    title: 'Satellite SAR Telemetry & Multi-Spectral Orbital AI Workshop',
    type: 'Workshop',
    organizer: 'Space-Domain Intelligence Unit',
    date: '12 Dec 2026',
    location: 'Virtual Technical Session',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    deadline: 'Limited to 150 participants',
    status: 'Open for Engineers',
    actionText: 'Reserve Seat',
    actionHref: '/technology'
  }
];

const missionCards = [
  {
    status: 'Live programme',
    title: 'Guidance & autonomy',
    description: 'Precision navigation research for resilient, mission-aware flight systems.',
    href: '/missiles',
    icon: Compass,
    accent: 'bg-blue-600',
    tags: ['GN&C Systems', 'Edge AI', 'Sensor Fusion']
  },
  {
    status: 'In development',
    title: 'Launch vehicle systems',
    description: 'Advancing propulsion, payload integration, and repeatable launch readiness.',
    href: '/rockets',
    icon: Rocket,
    accent: 'bg-[#E67300]',
    tags: ['Cryogenics', 'Payload Fairing', 'Multi-Stage']
  },
  {
    status: 'Mission support',
    title: 'Space-domain intelligence',
    description: 'Turning satellite data into timely, trusted operational insight.',
    href: '/space-systems',
    icon: Satellite,
    accent: 'bg-teal-600',
    tags: ['SAR Telemetry', 'Downlink Processing', 'Orbital AI']
  }
];

const updates = [
  { category: 'Fellowship', date: '28 Jul 2026', title: 'Applications open for the 2026 Research Fellowship cohort.', badgeClass: 'bg-blue-50 text-blue-700 border-blue-200' },
  { category: 'Milestone', date: '14 Jul 2026', title: 'AI Mission Planning Lab reaches full operational capacity.', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { category: 'Propulsion', date: '02 Jul 2026', title: 'New launch vehicle systems research track announced.', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' }
];

const stats = [
  { value: '34', label: 'Research programmes', sub: '+4 active tracks', icon: Sparkles },
  { value: '19', label: 'Missions supported', sub: 'Orbital & guided', icon: Rocket },
  { value: '12', label: 'Active lab nodes', sub: 'Nationwide network', icon: Radio },
  { value: '52', label: 'Verified collaborators', sub: 'ISRO / DRDO / Acad.', icon: ShieldCheck }
];

const galleryPreview = [galleryImages[0], galleryImages[3], galleryImages[6]];

export default function RedesignedHomeContent() {
  const reducedMotion = useReducedMotion();
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  return (
    <div className="home-light overflow-hidden bg-[#f7faff] text-slate-900">
      <FlashNewsTicker />

      <section className="relative isolate overflow-hidden border-b border-blue-100" aria-labelledby="home-hero-title">
        <div className="home-grid absolute inset-0 -z-20" aria-hidden="true" />
        <div className="home-halo absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full" aria-hidden="true" />
        <div className="home-halo home-halo--orange absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-12 pt-10 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-14 lg:pb-16 lg:pt-14 xl:px-12">
          <div className="max-w-2xl">
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              MISSILEX ROCKET SPACE RESEARCH
            </motion.p>

            <motion.h1
              id="home-hero-title"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-balance text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
            >
              Engineering the systems that move India&apos;s frontier forward.
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg"
            >
              A public gateway to strategic missions, space systems, national achievements, and the institutions behind them.
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col gap-3.5 sm:flex-row"
            >
              <Link
                href="/missiles"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#E67300] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(230,115,0,0.32)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#CF5F00] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Explore missions <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => setStoryModalOpen(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-slate-300/90 bg-white/95 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/70 active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-200"
              >
                <Play className="h-4 w-4 fill-isroBlue text-isroBlue ml-0.5" aria-hidden="true" /> Watch the story
              </button>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={reducedMotion ? undefined : { opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600"
            >
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" /> Official national gateway</span>
              <span className="inline-flex items-center gap-2"><Radio className="h-4 w-4 text-isroBlue animate-pulse" aria-hidden="true" /> Live telemetry &amp; updates</span>
            </motion.div>
          </div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="orbit-stage relative mx-auto min-h-[350px] w-full max-w-[540px] sm:min-h-[410px]"
          >
            <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
            <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />
            <div className="orbit-marker orbit-marker--one" aria-hidden="true" />
            <div className="orbit-marker orbit-marker--two" aria-hidden="true" />

            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-amber-500/20 via-blue-500/15 to-transparent blur-2xl opacity-70" aria-hidden="true" />

            <div
              className="absolute inset-x-[10%] top-[6%] overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-[0_30px_80px_rgba(10,77,140,0.19)] transition-transform duration-300 hover:scale-[1.01]"
            >
              <div className="relative aspect-[1.18] overflow-hidden rounded-[1.55rem]">
                <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill priority sizes="(min-width: 1024px) 480px, 90vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071e37]/78 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Mission field note</p>
                  <p className="mt-1 text-lg font-semibold">From launch readiness to orbit.</p>
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-[4%] left-0 max-w-[230px] rounded-2xl border border-blue-100/90 bg-white/95 p-4 shadow-[0_18px_45px_rgba(10,77,140,0.15)] backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-isroBlue"><Orbit className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-bold text-slate-900">Systems in motion</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Explore the people, missions, and technology that connect the national ecosystem.</p>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-[17%] rounded-2xl border border-amber-200/90 bg-white/95 backdrop-blur-md px-4 py-3 shadow-[0_16px_36px_rgba(156,92,22,0.16)]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">Telemetry Active</p>
              </div>
              <p className="mt-1 text-sm font-bold text-slate-950">Operational · 24/7</p>
              <p className="text-[10px] font-medium text-slate-500">SDSC SHAR Complex</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-6 sm:px-8 xl:px-12" aria-label="Announcements and key statistics">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_44px_rgba(15,23,42,0.08)] lg:grid-cols-[1.3fr_1.1fr]">
          <div className="p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Current updates</p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">Announcements &amp; Gazettes</h2>
              </div>
              <Link href="/news" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-isroBlue transition hover:text-isroBlueDark hover:translate-x-0.5">
                All updates <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-5 divide-y divide-slate-100">
              {updates.map((item) => (
                <li key={item.title} className="group flex flex-col gap-1.5 py-3.5 first:pt-0 sm:flex-row sm:items-center sm:gap-3 rounded-xl px-2.5 -mx-2.5 transition hover:bg-slate-50/80">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
                      {item.category}
                    </span>
                    <time className="text-xs font-semibold tabular-nums text-slate-400">{item.date}</time>
                  </div>
                  <Link href="/news" className="text-sm font-medium leading-6 text-slate-700 transition group-hover:text-isroBlue">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 bg-[#f3f8fe]/80 p-6 sm:p-7 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">National Research Pulse</p>
              <span className="text-[11px] font-semibold text-slate-400">At a glance</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="group rounded-xl border border-blue-100/90 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{item.value}</p>
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-isroBlue transition group-hover:scale-105 group-hover:bg-isroBlue group-hover:text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-bold text-slate-800">{item.label}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500">{item.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12" aria-labelledby="mission-work-title">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Mission work</p>
            <h2 id="mission-work-title" className="mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">The work behind a secure, self-reliant future.</h2>
          </div>
          <Link href="/projects" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-isroBlue transition-all duration-200 hover:gap-3 hover:text-isroBlueDark active:scale-[0.98]">View all activity <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-12">
          {/* Featured Bento Card: Guidance & Autonomy (7 Cols) */}
          <article
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_24px_50px_rgba(10,77,140,0.12)] lg:col-span-7"
          >
            <span className="absolute left-0 top-0 h-1.5 w-full bg-isroBlue" aria-hidden="true" />
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-isroBlue transition-transform duration-300 group-hover:scale-105 group-hover:bg-isroBlue group-hover:text-white">
                    <Compass className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-800">
                      <CircleDot className="h-2.5 w-2.5 text-emerald-600 animate-pulse" aria-hidden="true" /> Live Programme
                    </span>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Flagship Guidance Track</p>
                  </div>
                </div>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700">TRL-6 Validated</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                Guidance, Navigation &amp; Autonomous Flight (GN&amp;C)
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Next-generation precision guidance algorithms fusing 94 GHz millimetre-wave radar with mid-wave infrared sensors for resilient terminal trajectory interception in high-EW environments.
              </p>

              {/* Technical Telemetry Matrix inside the card */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 font-mono">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Tracking Error</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-900">&lt; 0.12 mrad</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Loop Latency</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-900">&lt; 8.4 ms</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">G-Tolerance</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-900">35G HIL</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Testbed Range</p>
                  <p className="mt-0.5 text-xs font-bold text-isroBlue">Chandipur ITR</p>
                </div>
              </div>

              {/* Technical Tags */}
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologies in Guidance and autonomy">
                {['GN&C Systems', 'Edge AI', 'Sensor Fusion', 'Real-Time RTOS', 'Hardware-in-the-Loop'].map((tag) => (
                  <span key={tag} className="rounded-lg border border-slate-200/70 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-2xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-5 flex items-center justify-between">
              <Link href="/missiles" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-isroBlue transition-all duration-200 group-hover:gap-3 active:scale-[0.98]">
                Explore Guidance Programme <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="text-xs font-mono text-slate-400">DOC-ID: MX-GNC-2026</span>
            </div>
          </article>

          {/* Right Column: 2 Stacked Asymmetric Cards (5 Cols) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Launch Vehicle Systems */}
            <article
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_45px_rgba(230,115,0,0.12)] flex-1"
            >
              <span className="absolute left-0 top-0 h-1.5 w-full bg-[#E67300]" aria-hidden="true" />
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-[#E67300] transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#E67300] group-hover:text-white">
                    <Rocket className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800">
                    <CircleDot className="h-2.5 w-2.5 text-amber-600" aria-hidden="true" /> In Development
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-[#E67300] transition-colors">
                  Launch Vehicle Systems &amp; Cryogenics
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Heavy-lift multi-stage propulsion research with S200 solid boosters, Vikas liquid stages, and CE-20 cryogenic LOX/LH2 testbeds.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Cryogenics', 'Payload Fairing', 'Multi-Stage', '4,000 kg GTO'].map((tag) => (
                    <span key={tag} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-3.5">
                <Link href="/rockets" className="inline-flex items-center gap-2 text-xs font-bold text-[#E67300] transition-all duration-200 group-hover:gap-3 active:scale-[0.98]">
                  Explore Launch Systems <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>

            {/* Space-Domain Intelligence */}
            <article
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_20px_45px_rgba(13,148,136,0.12)] flex-1"
            >
              <span className="absolute left-0 top-0 h-1.5 w-full bg-teal-600" aria-hidden="true" />
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-600 transition-transform duration-300 group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white">
                    <Satellite className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-800">
                    <CircleDot className="h-2.5 w-2.5 text-teal-600" aria-hidden="true" /> Mission Support
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-teal-600 transition-colors">
                  Space-Domain Intelligence &amp; SAR
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Real-time spaceborne radar telemetry, orbital object tracking, and decentralized ground station telemetry up to 1.5 million km.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['SAR Telemetry', 'Downlink Processing', 'Orbital AI', 'S/X/Ka Bands'].map((tag) => (
                    <span key={tag} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-3.5">
                <Link href="/space-systems" className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 transition-all duration-200 group-hover:gap-3 active:scale-[0.98]">
                  Explore Space Systems <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100/80 bg-white" aria-labelledby="purpose-title">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-16 xl:px-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Mission &amp; vision</p>
            <h2 id="purpose-title" className="mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">Public knowledge. National purpose.</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">MissileX brings together mission context, scientific progress, and trusted official resources in one clear public experience.</p>
            <Link href="/about" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl border border-blue-200 bg-blue-50/80 px-5 text-sm font-bold text-isroBlue transition-all duration-200 hover:border-blue-300 hover:bg-blue-100/80 active:scale-[0.98]">
              Discover the organisation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/80 border-l-4 border-l-isroBlue bg-slate-50/50 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:bg-white">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-100/60 text-isroBlue">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-isroBlue">Mandate</span>
              </div>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-isroBlue">Mission</p>
              <p className="mt-2 text-base font-bold leading-7 text-slate-950">Advance aerospace and defence capability through thoughtful, connected research.</p>
            </article>

            <article className="relative overflow-hidden rounded-2xl border-l-4 border-l-[#E67300] bg-gradient-to-br from-[#0B2545] via-[#0A4D8C] to-[#08305A] p-6 sm:p-7 text-white shadow-[0_18px_42px_rgba(10,77,140,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(10,77,140,0.3)]">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-orange-300 backdrop-blur-sm">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-200">Horizon</span>
              </div>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-200">Vision</p>
              <p className="mt-2 text-base font-bold leading-7 text-white">Aatmanirbhar systems that serve a confident, capable India.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12" aria-labelledby="gallery-title">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Visual archive</p>
            <h2 id="gallery-title" className="mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">The systems, facilities, and moments that define the mission.</h2>
          </div>
          <Link href="/gallery" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-isroBlue transition-all duration-200 hover:gap-3 hover:text-isroBlueDark active:scale-[0.98]">Open gallery <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {galleryPreview.map((image) => (
            <article
              key={image.slug}
              className="group relative aspect-[1.24] overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg"
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041b32]/90 via-[#041b32]/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <span className="inline-block rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">{image.category}</span>
                <p className="mt-2 text-base font-bold leading-6 text-white drop-shadow-sm">{image.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-blue-100/80 bg-white" aria-labelledby="portal-title">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Official connections</p>
              <h2 id="portal-title" className="mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">A direct route to India&apos;s science and space ecosystem.</h2>
            </div>
            <Link href="/government-portals" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-isroBlue transition-all duration-200 hover:gap-3 hover:text-isroBlueDark active:scale-[0.98]">All portals <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {govDefenceSpacePortals.slice(0, 3).map((portal) => (
              <a key={portal.abbr} href={portal.url} target="_blank" rel="noreferrer" className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-[0_20px_45px_rgba(10,77,140,0.12)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-200">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-isroBlue">{portal.abbr}</span>
                    <span className="text-[10px] font-semibold text-slate-400">Govt. Official Node</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-6 text-slate-950 group-hover:text-isroBlue transition-colors">{portal.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{portal.description}</p>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-isroBlue transition-all duration-200 group-hover:gap-2.5">
                    Visit official portal <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Conferences, Symposia & Fellowship Deadlines */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12" aria-labelledby="milestones-title">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">Academic &amp; Research Calendar</p>
            <h2 id="milestones-title" className="mt-3 text-balance text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
              Conferences, Symposia &amp; Fellowship Deadlines.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Key calendar milestones for national defense symposiums, technical paper submissions, and fellowship cohort application windows.
            </p>
          </div>
          <Link href="/careers" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-isroBlue transition-all duration-200 hover:gap-3 hover:text-isroBlueDark active:scale-[0.98]">
            View Fellowship Guidelines <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
          <div className="divide-y divide-slate-100">
            {upcomingConferences.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col p-6 sm:p-7 transition-all duration-200 hover:bg-slate-50/80 lg:flex-row lg:items-center lg:justify-between gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-isroBlue transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>Organized by: <strong className="font-semibold text-slate-700">{item.organizer}</strong></span>
                    <span>·</span>
                    <span className="text-isroBlue font-medium">{item.deadline}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0">
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800 font-mono">
                    {item.status}
                  </span>
                  <Link
                    href={item.actionHref}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-isroBlue shadow-xs transition hover:bg-isroBlue hover:text-white hover:border-isroBlue active:scale-[0.98]"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-16 xl:px-12" aria-labelledby="research-access-title">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#072B52] via-[#0A4D8C] to-[#0A3D6E] px-6 py-12 text-white shadow-[0_24px_60px_rgba(10,77,140,0.28)] sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-0 opacity-20" aria-hidden="true"><div className="home-blueprint h-full w-full" /></div>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/30 bg-blue-900/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-sm">
                <LockKeyhole className="h-3 w-3 text-amber-400" aria-hidden="true" /> Secure research access
              </span>
              <h2 id="research-access-title" className="mt-4 text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl text-white">Research programmes are available to signed-in contributors.</h2>
              <p className="mt-4 text-base leading-7 text-blue-100/90">Find programme details, application routes, telemetry archives, and collaborative research tracks in the secure portal.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/login" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(230,115,0,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff850b] active:scale-[0.98] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" /> Sign in to research
              </Link>
              <Link href="/projects" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20 active:scale-[0.98]">
                Explore public projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StoryModal isOpen={storyModalOpen} onClose={() => setStoryModalOpen(false)} />
    </div>
  );
}
