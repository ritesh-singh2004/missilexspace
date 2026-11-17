'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Rocket, 
  Layers, 
  Weight, 
  ArrowUp, 
  LayoutGrid, 
  TableProperties, 
  Sparkles, 
  Gauge, 
  CheckCircle2, 
  Flame, 
  Compass, 
  Orbit 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import PageBanner from '@/components/patterns/PageBanner';
import { rockets, RocketData } from '@/lib/rockets';
import VideoHero from '@/components/hero/VideoHero';
import { rocketLaunchVideoSources, designRenderPoster } from '@/lib/hero-video';
import designWireframe from '@/public/images/rockets/design-wireframe.jpg';
import designSolid from '@/public/images/rockets/design-solid.jpg';
import designRender from '@/public/images/rockets/design-render.jpg';

const fleetCategories = [
  { id: 'all', label: 'All Vehicles (7)' },
  { id: 'heavy', label: 'Heavy-Lift & Lunar (2)', filter: (r: RocketData) => r.slug === 'lvm3' || r.slug === 'gslv' },
  { id: 'workhorse', label: 'Workhorse Polar (1)', filter: (r: RocketData) => r.slug === 'pslv' },
  { id: 'smallsat', label: 'Small Satellite (1)', filter: (r: RocketData) => r.slug === 'sslv' },
  { id: 'heritage', label: 'Historic Pioneers (3)', filter: (r: RocketData) => r.slug === 'slv' || r.slug === 'aslv' || r.slug === 'sounding-rockets' }
];

const vehicleSilhouettes = [
  { slug: 'sounding-rockets', name: 'Sounding', height: '10m', heightVal: 10, mass: '0.8t', payload: 'Atmospheric' },
  { slug: 'slv', name: 'SLV-3', height: '23m', heightVal: 23, mass: '17.5t', payload: '40 kg LEO' },
  { slug: 'aslv', name: 'ASLV', height: '23.5m', heightVal: 23.5, mass: '42t', payload: '150 kg LEO' },
  { slug: 'sslv', name: 'SSLV', height: '34m', heightVal: 34, mass: '120t', payload: '500 kg LEO' },
  { slug: 'lvm3', name: 'LVM3', height: '43.5m', heightVal: 43.5, mass: '640t', payload: '8,000 kg LEO' },
  { slug: 'pslv', name: 'PSLV', height: '44m', heightVal: 44, mass: '295t', payload: '3,800 kg LEO' },
  { slug: 'gslv', name: 'GSLV', height: '49m', heightVal: 49, mass: '414t', payload: '2,500 kg GTO' }
];

const designStages = [
  {
    no: '01',
    kicker: '2D Drawing',
    src: designWireframe,
    alt: 'OpenRocket 2D drawing of the research vehicle showing recovery bay, flight computer and motor layout',
    title: 'Geometry & stability',
    note: 'Airframe drawn at 49.8 × 5.0 cm — centre of gravity 11.84 in ahead of centre of pressure, holding a 2.04-caliber margin.'
  },
  {
    no: '02',
    kicker: '3D Solid',
    src: designSolid,
    alt: 'OpenRocket 3D solid view of the research vehicle showing nose cone, body tube and fin can',
    title: 'Mass & configuration',
    note: '153 g on an E6-RCT-P motor — parachute, shock cord and flight computer stacked inside the 100 g dry airframe.'
  },
  {
    no: '03',
    kicker: '3D Render',
    src: designRender,
    alt: 'OpenRocket textured render of the research vehicle with marble body tube and plywood fins',
    title: 'Rendered for review',
    note: 'Final surfaces before the run — 574 m apogee, 72 m/s max velocity, 6.95 G off the pad.'
  }
];

const designSpecs = [
  { label: 'Length', value: '49.8 cm' },
  { label: 'Diameter', value: '5.0 cm' },
  { label: 'Launch mass', value: '153 g' },
  { label: 'Motor', value: 'E6-RCT-P' },
  { label: 'Apogee', value: '574 m' },
  { label: 'Max velocity', value: '72 m/s · M0.214' },
  { label: 'Max accel', value: '6.95 G' },
  { label: 'Stability', value: '2.04 cal' }
];

export default function RocketsPageContent() {
  const { t } = useTranslation(['pages', 'common']);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedRulerSlug, setSelectedRulerSlug] = useState<string | null>(null);

  const filteredRockets = rockets.filter((item) => {
    if (selectedRulerSlug) return item.slug === selectedRulerSlug;
    if (activeTab === 'all') return true;
    const cat = fleetCategories.find((c) => c.id === activeTab);
    return cat?.filter ? cat.filter(item) : true;
  });

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
            <span className="text-slate-900 font-bold">Launch Systems</span>
            <span>/</span>
            <span className="text-slate-500">ISRO Launch Fleet</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <Rocket className="h-3.5 w-3.5" />
            <span>SOVEREIGN LAUNCH VEHICLE ARCHITECTURE</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.15]">
            Heavy-lift orbital vehicles, multi-stage solid boosters, and cryogenic upper stages.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-lg">
            Explore India&apos;s satellite launch vehicle fleet from atmospheric sounding rockets and the historical SLV-3 to the PSLV workhorse and the human-rated LVM3 heavy-lift launcher.
          </p>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">07</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Vehicle Classes</p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-700">Sounding to LVM3</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#0B4F9C]">50+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">PSLV Flights</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Global Commercial Workhorse</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#E67300]">640T</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">LVM3 Lift-off Mass</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Dual S200 Solid Boosters</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">CE-20</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Cryogenic Thrust</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Indigenous C25 Upper Stage</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 xl:px-12 space-y-12">
        {/* 2. INTERACTIVE FLEET SCALE COMPARISON RULER */}
        <section className="rounded-3xl border border-blue-200/80 bg-gradient-to-b from-white via-blue-50/20 to-slate-50 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/70 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0B4F9C] flex items-center gap-1.5">
                <Orbit className="h-4 w-4" />
                Comparative Physical Scale &amp; Staging Matrix
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 mt-1">
                Vehicle Scale Silhouette Comparison (10m – 49m)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Click any rocket silhouette to isolate its engineering specifications and launch manifest below:
              </p>
            </div>

            {selectedRulerSlug && (
              <button
                type="button"
                onClick={() => setSelectedRulerSlug(null)}
                className="text-xs font-bold text-[#0B4F9C] hover:underline self-start sm:self-auto"
              >
                Reset Filter (Show All Vehicles)
              </button>
            )}
          </div>

          {/* Graphical Silhouette Alignment Bar */}
          <div className="w-full overflow-x-auto pb-2">
            <div className="mt-8 flex items-end justify-around gap-2 sm:gap-6 pt-12 pb-4 border-b border-dashed border-slate-300 min-w-[580px]">
              {vehicleSilhouettes.map((v) => {
                const isSelected = selectedRulerSlug === v.slug;
                // Scale height relative to 49m
                const barHeightPx = Math.round((v.heightVal / 49) * 160);

                return (
                  <button
                    key={v.slug}
                    type="button"
                    onClick={() => setSelectedRulerSlug(isSelected ? null : v.slug)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:-translate-y-1"
                  >
                    <span className={`text-[11px] font-mono font-bold mb-2 transition-colors ${
                      isSelected ? 'text-[#0B4F9C]' : 'text-slate-500 group-hover:text-slate-900'
                    }`}>
                      {v.height}
                    </span>

                    {/* Silhouette Pillar */}
                    <div
                      style={{ height: `${barHeightPx}px` }}
                      className={`w-9 sm:w-12 rounded-t-xl transition-all duration-300 relative flex items-center justify-center ${
                        isSelected 
                          ? 'bg-[#0B4F9C] shadow-lg shadow-blue-500/30 ring-2 ring-[#0B4F9C] ring-offset-2' 
                          : v.slug === 'lvm3'
                            ? 'bg-slate-700 group-hover:bg-slate-800 w-12 sm:w-16' 
                            : 'bg-slate-300 group-hover:bg-blue-400'
                      }`}
                    >
                      <Rocket className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                    </div>

                    <span className={`mt-3 text-xs font-bold ${
                      isSelected ? 'text-[#0B4F9C]' : 'text-slate-800'
                    }`}>
                      {v.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{v.mass}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-2 text-right">
            <span className="text-[10px] text-slate-500 font-mono">Reference Ground Line (0.00m Pad Elevation)</span>
          </div>
        </section>

        {/* 3. CATEGORY SELECTOR & VIEW SWITCHER */}
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {fleetCategories.map((cat) => {
              const count = cat.id === 'all'
                ? rockets.length
                : rockets.filter((r) => cat.filter?.(r)).length;
              const isActive = activeTab === cat.id && !selectedRulerSlug;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedRulerSlug(null);
                    setActiveTab(cat.id);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? 'bg-isroBlue text-white shadow-md'
                      : 'border border-slate-200/80 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid View"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                viewMode === 'grid' ? 'bg-isroBlue text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              aria-label="Table View"
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                viewMode === 'table' ? 'bg-isroBlue text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <TableProperties className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 4. ASYMMETRIC FLEET BENTO */}
        {viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRockets.map((rocket) => {
              const isLVM3 = rocket.slug === 'lvm3';
              const isPSLV = rocket.slug === 'pslv';

              if (isLVM3 && (activeTab === 'all' || activeTab === 'heavy')) {
                return (
                  <article
                    key={rocket.slug}
                    className="md:col-span-2 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-300/80 bg-gradient-to-br from-white via-white to-blue-50/50 p-8 sm:p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-isroBlue text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                            HEAVY-LIFT FLAGSHIP
                          </span>
                          <span className="rounded-md bg-amber-100 text-amber-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                            HUMAN-RATED GAGANYAAN
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                          <Weight className="h-3.5 w-3.5 text-[#E67300]" />
                          640,000 kg Lift-off Mass
                        </span>
                      </div>

                      <div className="mt-5 grid gap-6 lg:grid-cols-12 items-start">
                        <div className="lg:col-span-7">
                          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                            {rocket.name}: Launch Vehicle Mark-3 (Heavy Lift &amp; Lunar)
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {rocket.mission} {rocket.history}
                          </p>

                          <div className="mt-5 space-y-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-700">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              <span><strong>Stage 1 (Solid Boosters):</strong> Two S200 strap-on motors (200 tonnes solid propellant each)</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              <span><strong>Stage 2 (Liquid Core):</strong> L110 core stage powered by twin liquid Vikas engines</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-700">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                              <span><strong>Stage 3 (Cryogenic):</strong> C25 upper stage with high-thrust indigenous CE-20 engine</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">VEHICLE SPECIFICATIONS</p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Height</span>
                              <span className="font-mono font-bold text-slate-900 text-sm">{rocket.specifications?.Height}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Payload to LEO</span>
                              <span className="font-mono font-bold text-emerald-700 text-sm">8,000 kg</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Payload to GTO</span>
                              <span className="font-mono font-bold text-[#0B4F9C] text-sm">4,000 kg</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px] uppercase">Stages</span>
                              <span className="font-mono font-bold text-slate-900 text-sm">{rocket.specifications?.Stages} Stages</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">Missions: Chandrayaan-2/3, OneWeb, Gaganyaan</span>
                      <Link
                        href={`/rockets/${rocket.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-95"
                      >
                        <span>Vehicle Dossier &amp; Launches</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              }

              if (isPSLV && (activeTab === 'all' || activeTab === 'workhorse')) {
                return (
                  <article
                    key={rocket.slug}
                    className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-emerald-300/80 bg-gradient-to-br from-white via-white to-emerald-50/40 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="absolute left-0 top-0 h-1.5 w-full bg-emerald-500" />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-emerald-100 text-emerald-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                          NATIONAL WORKHORSE
                        </span>
                        <span className="font-mono text-xs font-bold text-emerald-700">
                          50+ Missions
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-slate-950">
                        {rocket.name}: Polar Satellite Launch Vehicle
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {rocket.mission} Renowned for orbital multi-injection flexibility.
                      </p>

                      <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Height:</span>
                          <span className="font-mono font-bold text-slate-800">{rocket.specifications?.Height}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mass:</span>
                          <span className="font-mono font-bold text-slate-800">{rocket.specifications?.Mass}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payload:</span>
                          <span className="font-mono font-bold text-emerald-700">{rocket.payload}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">Record: 104 Satellites / Flight</span>
                      <Link
                        href={`/rockets/${rocket.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] hover:underline"
                      >
                        <span>Dossier</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                );
              }

              // Standard tactical cards for SSLV, GSLV, Sounding, SLV, ASLV
              return (
                <article
                  key={rocket.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-isroBlue to-slate-200" />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200">
                        {rocket.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700">
                        {rocket.specifications?.Height || 'N/A'}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-isroBlue transition-colors">
                      {rocket.name}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {rocket.mission}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Lift-off Mass</span>
                        <span className="font-mono font-bold text-slate-800">{rocket.specifications?.Mass || 'Varies'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Stages</span>
                        <span className="font-mono font-bold text-slate-800">{rocket.specifications?.Stages || 'Multiple'}</span>
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-slate-500 font-mono truncate">
                      Payload: {rocket.payload}
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">ISRO Heritage</span>
                    <Link
                      href={`/rockets/${rocket.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0B4F9C] hover:underline"
                    >
                      <span>Vehicle Dossier</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-[0.16em] text-slate-600">
                  <th className="px-5 py-3.5">Vehicle</th>
                  <th className="px-5 py-3.5">Class</th>
                  <th className="px-5 py-3.5">Height</th>
                  <th className="px-5 py-3.5">Lift-off Mass</th>
                  <th className="px-5 py-3.5">Payload Capacity</th>
                  <th className="px-5 py-3.5 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRockets.map((rocket) => (
                  <tr key={rocket.slug} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-4 font-bold text-slate-950">{rocket.name}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-isroBlue">
                        {rocket.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-700">{rocket.specifications?.Height}</td>
                    <td className="px-5 py-4 font-mono text-slate-700">{rocket.specifications?.Mass}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-800">{rocket.payload}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/rockets/${rocket.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-isroBlue hover:text-isroBlueDark"
                      >
                        Inspect <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. DESIGN & SIMULATION SHOWCASE */}
      <section aria-labelledby="design-simulation-heading" className="relative isolate overflow-hidden bg-[#06182e] py-16 sm:py-24">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-500/20 via-sky-500/10 to-amber-500/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E67300]">Design &amp; Simulation</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="design-simulation-heading" className="max-w-2xl text-3xl font-black tracking-tight text-white text-balance sm:text-5xl sm:leading-[1.12]">
              From wireframe to flight.
            </h2>
            <p className="max-w-md text-sm leading-7 text-white/60 lg:text-right">
              Every flight starts as geometry — model the airframe, balance CG against CP, then run the simulation. A 153&nbsp;g E6 research vehicle, from first line to a predicted 574&nbsp;m apogee.
            </p>
          </div>
        </div>

        {/* Full-bleed walkthrough band — native 4.18:1 from sm up, 16:9 centre crop on phones */}
        <div className="relative mt-10 aspect-[16/9] w-full border-y border-white/10 sm:mt-14 sm:aspect-[1916/458]">
          <VideoHero
            interactive
            durationLabel="0:22"
            sources={rocketLaunchVideoSources}
            poster={designRenderPoster}
            posterAlt="OpenRocket render of the E6 research vehicle, used as the walkthrough poster frame"
          />
        </div>

        <div className="relative mx-auto mt-12 max-w-7xl px-6 sm:mt-16 sm:px-8 xl:px-12">
          <ol className="space-y-8">
            {designStages.map((stage) => (
              <li key={stage.no} className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-6 lg:grid-cols-[7rem_1fr]">
                <div className="flex items-baseline gap-3 sm:block">
                  <span className="font-mono text-3xl font-black leading-none text-[#E67300] sm:text-4xl">{stage.no}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 sm:mt-2.5 sm:block">{stage.kicker}</span>
                </div>
                <figure className="min-w-0">
                  <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_24px_60px_rgba(2,10,22,0.45)] transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_30px_72px_rgba(2,10,22,0.62)] sm:aspect-[1916/458]">
                    <Image src={stage.src} alt={stage.alt} fill sizes="(min-width:1024px) 1056px, 100vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="shrink-0 text-sm font-bold text-white">{stage.title}</p>
                    <p className="max-w-2xl text-xs leading-6 text-white/55 sm:text-right">{stage.note}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>

          <dl className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {designSpecs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]"
              >
                <dt className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">{spec.label}</dt>
                <dd className="mt-1.5 font-mono text-sm font-bold text-white">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
