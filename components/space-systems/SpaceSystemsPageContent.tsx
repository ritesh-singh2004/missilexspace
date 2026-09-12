'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { 
  Satellite, 
  Orbit, 
  Rocket, 
  Radio, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck,
  Compass,
  Globe2,
  Calendar,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Award
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';

const milestoneYears = [
  { 
    year: '1963', 
    title: 'TERLS Thumba Inception', 
    agency: 'INCOSPAR',
    detail: 'First sounding rocket (Nike-Apache) launched from Thumba, marking the birth of Indian space research under Dr. Vikram Sarabhai.',
    badge: 'GENESIS'
  },
  { 
    year: '1975', 
    title: 'Aryabhata Satellite', 
    agency: 'ISRO',
    detail: 'India’s first satellite built by ISRO under Prof. U.R. Rao launched into orbit, inaugurating autonomous satellite manufacturing.',
    badge: 'FIRST SATELLITE'
  },
  { 
    year: '1980', 
    title: 'SLV-3 Orbital Insertion', 
    agency: 'ISRO / Kalam',
    detail: 'Dr. APJ Abdul Kalam as Project Director achieved first indigenous orbital launch with SLV-3 placing Rohini-1 into orbit.',
    badge: 'ORBITAL AUTONOMY'
  },
  { 
    year: '1993', 
    title: 'PSLV Era Commences', 
    agency: 'ISRO',
    detail: 'Maiden flight of PSLV, paving the way for the world’s most reliable commercial satellite workhorse with 50+ consecutive successes.',
    badge: 'WORKHORSE FLEET'
  },
  { 
    year: '2008', 
    title: 'Chandrayaan-1 Moon Mission', 
    agency: 'ISRO',
    detail: 'Discovered hydroxyl and water molecules (H2O) across the lunar surface using the Moon Mineralogy Mapper (M3).',
    badge: 'LUNAR DISCOVERY'
  },
  { 
    year: '2013', 
    title: 'Mars Orbiter Mission (MOM)', 
    agency: 'ISRO',
    detail: 'Mangalyaan entered Martian orbit on its maiden attempt, making India the first nation in Asia to reach Mars.',
    badge: 'INTERPLANETARY'
  },
  { 
    year: '2019', 
    title: 'Mission Shakti ASAT', 
    agency: 'DRDO / ISRO',
    detail: 'Direct-ascent anti-satellite kinetic test intercepted a low Earth orbit satellite at 283 km altitude within 3-minute engagement window.',
    badge: 'STRATEGIC SHIELD'
  },
  { 
    year: '2023', 
    title: 'Chandrayaan-3 South Pole', 
    agency: 'ISRO',
    detail: 'Historic soft-landing at Shiv Shakti Point (69.373° S, 32.319° E). First nation in human history to land near the lunar South Pole.',
    badge: 'HISTORIC LUNAR FIRST'
  },
  { 
    year: '2026+', 
    title: 'Gaganyaan Crewed Flight', 
    agency: 'ISRO HSFC',
    detail: 'Human-rated LVM3 orbital flight sending 3 Indian astronaut-designates into a 400 km low Earth orbit for a 3-day mission.',
    badge: 'HUMAN SPACEFLIGHT'
  },
  { 
    year: '2035', 
    title: 'Bharatiya Antariksh Station', 
    agency: 'ISRO / National',
    detail: 'Permanent sovereign modular space station in 400 km LEO supporting microgravity research, space medicine, and lunar staging.',
    badge: 'ORBITAL OUTPOST'
  }
];

export default function SpaceSystemsPageContent() {
  const { t } = useTranslation('pages');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState<number>(7); // Default to Chandrayaan-3

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
            <span className="text-slate-900 font-bold">Space Systems</span>
            <span>/</span>
            <span className="text-slate-500">Flagship Exploration</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <Orbit className="h-3.5 w-3.5" />
            <span>SOVEREIGN DEEP-SPACE &amp; PLANETARY MISSIONS</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.15]">
            Lunar South Pole landings, solar Lagrangian observatories, and human spaceflight.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-lg">
            A comprehensive technical catalog of India&apos;s crowning space exploration programs. Review Chandrayaan-3 lunar telemetry, Aditya-L1 coronal dynamics, Gaganyaan life support systems, and the NavIC constellation.
          </p>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">120+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Orbital Missions</p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-600">ISRO Operational Fleet</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#0B4F9C]">L1 HALO</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Solar Telemetry</p>
              <p className="mt-0.5 text-[11px] text-slate-500">1.5M km from Earth</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#E67300]">69.37° S</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Lunar South Pole</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Shiv Shakti Landing Point</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">BAS 2035</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Space Station</p>
              <p className="mt-0.5 text-[11px] text-slate-500">400 km LEO Modular Outpost</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 xl:px-12 space-y-12">
        {/* 2. ASYMMETRIC FLAGSHIP MISSIONS BENTO */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B4F9C]">
                FLAGSHIP EXPLORATION PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                Landmark Planetary &amp; Crewed Missions
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Flagships (5)' },
                { id: 'lunar', label: 'Lunar' },
                { id: 'solar', label: 'Solar L1' },
                { id: 'crew', label: 'Human Spaceflight' },
                { id: 'nav', label: 'NavIC Regional' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition active:scale-95 ${
                    activeFilter === tab.id
                      ? 'bg-isroBlue text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Chandrayaan-3 Col-Span 2 Hero Card */}
            {(activeFilter === 'all' || activeFilter === 'lunar') && (
              <article className="md:col-span-2 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-300/80 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 sm:p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-600 text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        LUNAR SOUTH POLE HISTORIC
                      </span>
                      <span className="rounded-md bg-blue-100 text-[#0B4F9C] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        MISSION ACCOMPLISHED
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                      <Orbit className="h-3.5 w-3.5 text-[#E67300]" />
                      Shiv Shakti Point: 69.373° S, 32.319° E
                    </span>
                  </div>

                  <div className="mt-5 grid gap-6 lg:grid-cols-12 items-start">
                    <div className="lg:col-span-7">
                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                        Chandrayaan-3: Autonomous Lunar South Pole Soft Landing
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        On 23 August 2023, India became the first nation to achieve a soft landing in the lunar south polar region. Vikram lander utilized autonomous hazard detection and avoidance cameras (LHDAC) to execute autonomous touchdown guidance.
                      </p>

                      <div className="mt-5 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span><strong>Pragyan Rover:</strong> In-situ confirmation of Sulfur (S), Iron (Fe), and Titanium (Ti) via LIBS/APXS.</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span><strong>Hop Experiment:</strong> Vikram fired thrusters, elevated 40 cm, and landed safely 30–40 cm away.</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TELEMETRY SPECIFICATIONS</p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Launch Vehicle</span>
                          <span className="font-mono font-bold text-slate-900 text-sm">LVM3-M4</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Landing Mass</span>
                          <span className="font-mono font-bold text-slate-900 text-sm">1,749 kg</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Rover Mass</span>
                          <span className="font-mono font-bold text-slate-900 text-sm">26 kg (Pragyan)</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase">Mission Life</span>
                          <span className="font-mono font-bold text-emerald-700 text-sm">1 Lunar Day (14d)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">Telemetry Source: ISTRAC Bengaluru / Deep Space Network</span>
                  <span className="text-xs font-bold text-isroBlue">Verified ISRO Mission Data</span>
                </div>
              </article>
            )}

            {/* 2. Aditya-L1 Solar Observatory Card */}
            {(activeFilter === 'all' || activeFilter === 'solar') && (
              <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-300/80 bg-gradient-to-br from-white via-white to-amber-50/40 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-[#E67300]" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-amber-100 text-amber-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      SOLAR OBSERVATORY
                    </span>
                    <span className="font-mono text-xs font-bold text-[#E67300]">
                      1.5M km Halo Orbit
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Aditya-L1: Sun-Earth L1 Halo Observatory
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    India&apos;s maiden solar observatory inserted into a halo orbit around the Lagrangian point L1, offering an uninterrupted view of the Sun without occultation or eclipses.
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Primary Payload:</span>
                      <span className="font-mono font-bold text-slate-800">VELC (Coronagraph)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">UV Imaging:</span>
                      <span className="font-mono font-bold text-slate-800">SUIT Telescope</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Launch Vehicle:</span>
                      <span className="font-mono font-bold text-slate-800">PSLV-C57 (XL)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Operational
                  </span>
                  <span className="text-xs font-mono text-slate-400">24/7 Telemetry</span>
                </div>
              </article>
            )}

            {/* 3. Gaganyaan Human Spaceflight Card */}
            {(activeFilter === 'all' || activeFilter === 'crew') && (
              <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-isroBlue" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 text-isroBlue px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                      HUMAN SPACEFLIGHT
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      400 km LEO
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Gaganyaan: Sovereign Crewed Flight Programme
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Demonstrating indigenous human-rating capability by launching a 3-member crew into a 400 km orbit for 3 days and returning safely to Indian waters.
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vehicle:</span>
                      <span className="font-mono font-bold text-slate-800">Human-Rated LVM3 (HLVM3)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Crew Module:</span>
                      <span className="font-mono font-bold text-slate-800">ECLSS Life Support</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Abort Test:</span>
                      <span className="font-mono font-bold text-emerald-700">TV-D1 Successful</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-amber-600 font-bold">In Active Qualification</span>
                  <span className="text-xs font-mono text-slate-400">HSFC Bengaluru</span>
                </div>
              </article>
            )}

            {/* 4. NavIC Regional Navigation Card */}
            {(activeFilter === 'all' || activeFilter === 'nav') && (
              <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-600" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-emerald-50 text-emerald-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                      SATELLITE NAVIGATION
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      &lt; 5m Accuracy
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    NavIC: Regional Navigation Constellation
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Sovereign 7-satellite constellation providing highly accurate positioning service across India and extended 1,500 km strategic envelope beyond national borders.
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Satellites:</span>
                      <span className="font-mono font-bold text-slate-800">7 in GEO &amp; GSO Orbits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Signal Bands:</span>
                      <span className="font-mono font-bold text-slate-800">L5 and S-band Dual Mode</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Atomic Clock:</span>
                      <span className="font-mono font-bold text-emerald-700">Indigenous Rubidium</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Fully Operational
                  </span>
                  <span className="text-xs font-mono text-slate-400">Military &amp; Civilian</span>
                </div>
              </article>
            )}

            {/* 5. Mangalyaan Mars Orbiter Card */}
            {(activeFilter === 'all') && (
              <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <span className="absolute left-0 top-0 h-1.5 w-full bg-[#E67300]" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-amber-50 text-amber-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                      INTERPLANETARY HERITAGE
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-700">
                      Maiden Attempt
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    Mangalyaan: Mars Orbiter Mission (MOM)
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    India&apos;s maiden interplanetary mission reached Mars orbit on its first attempt, studying atmospheric methane, surface morphology, and mineralogy across 7+ years.
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Launch:</span>
                      <span className="font-mono font-bold text-slate-800">5 Nov 2013 (PSLV-C25)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mars Insertion:</span>
                      <span className="font-mono font-bold text-slate-800">24 Sep 2014</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cost:</span>
                      <span className="font-mono font-bold text-emerald-700">₹450 Cr (~$74M USD)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">Mission Accomplished (7 Years)</span>
                  <span className="text-xs font-mono text-slate-400">Global Record</span>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* 3. INTERACTIVE HORIZONTAL TIMELINE SCRUBBER (1963 – 2035) */}
        <section className="rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm space-y-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B4F9C] flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              CHRONOLOGICAL AEROSPACE ODYSSEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
              National Space &amp; Strategic Milestones (1963 – 2035)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Click any chronological milestone along the trajectory to review mission history and scientific outcomes:
            </p>
          </div>

          {/* Interactive Scrub Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2">
            {milestoneYears.map((item, idx) => {
              const isSelected = selectedMilestoneIdx === idx;
              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className={`flex flex-col items-center shrink-0 px-4 py-3 rounded-2xl transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-[#0B4F9C] text-white shadow-md ring-2 ring-[#0B4F9C]/30'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  <span className={`font-mono text-sm font-black ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                    {item.year}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 whitespace-nowrap ${
                    isSelected ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Display Dossier */}
          {milestoneYears[selectedMilestoneIdx] && (
            <div className="rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/70 via-white to-amber-50/40 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-lg font-black text-[#0B4F9C]">
                    {milestoneYears[selectedMilestoneIdx].year}
                  </span>
                  <span className="rounded bg-blue-100 text-[#0B4F9C] px-2 py-0.5 text-xs font-bold uppercase">
                    {milestoneYears[selectedMilestoneIdx].agency}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-800">
                  {milestoneYears[selectedMilestoneIdx].badge}
                </span>
              </div>

              <h4 className="text-xl font-bold text-slate-950">
                {milestoneYears[selectedMilestoneIdx].title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 max-w-3xl">
                {milestoneYears[selectedMilestoneIdx].detail}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
