'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Compass, 
  Target, 
  Shield, 
  Zap, 
  LayoutGrid, 
  TableProperties, 
  Radar, 
  Flame, 
  Radio, 
  Layers,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';
import { missiles, MissileData } from '@/lib/missiles';

const categories = [
  { id: 'all', label: 'All Defence Systems' },
  { id: 'strategic', label: 'Strategic Ballistic & Deterrence', filter: (m: MissileData) => m.slug === 'agni' || m.slug === 'k-series' || m.slug === 'shaurya' || m.slug === 'prithvi' },
  { id: 'cruise', label: 'Supersonic Cruise & Standoff', filter: (m: MissileData) => m.slug === 'brahmos' || m.slug === 'nirbhay' },
  { id: 'air-defence', label: 'Air & Missile Interceptors', filter: (m: MissileData) => m.slug === 'akash' || m.slug === 'surface-to-air' },
  { id: 'tactical', label: 'Tactical BVR & Anti-Tank', filter: (m: MissileData) => m.slug === 'nag' || m.slug === 'helina' || m.slug === 'astra' || m.slug === 'air-to-air' }
];

export default function MissilesPageContent() {
  const { t } = useTranslation(['pages', 'common']);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [activeRangeRing, setActiveRangeRing] = useState<'all' | 'tactical' | 'theatre' | 'strategic'>('all');

  const filteredMissiles = missiles.filter((item) => {
    // 1. Tab filter
    let matchTab = true;
    if (activeTab !== 'all') {
      const cat = categories.find((c) => c.id === activeTab);
      matchTab = cat?.filter ? cat.filter(item) : true;
    }
    // 2. Range Ring filter
    let matchRange = true;
    if (activeRangeRing === 'tactical') {
      matchRange = ['nag', 'helina', 'akash', 'air-to-air'].includes(item.slug);
    } else if (activeRangeRing === 'theatre') {
      matchRange = ['prithvi', 'brahmos', 'astra', 'shaurya', 'nirbhay', 'surface-to-air'].includes(item.slug);
    } else if (activeRangeRing === 'strategic') {
      matchRange = ['agni', 'k-series'].includes(item.slug);
    }
    return matchTab && matchRange;
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
            <span className="text-slate-900 font-bold">Defence Systems</span>
            <span>/</span>
            <span className="text-slate-500">Missile Families</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] shadow-sm">
            <Target className="h-3.5 w-3.5 text-[#E67300]" />
            <span>SOVEREIGN DEFENCE MISSILE ARSENAL</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
            Strategic deterrents, supersonic cruise systems, and precision air-defence interceptors.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-lg">
            An engineering catalog of India&apos;s sovereign missile families. Review multi-stage solid rocket motors, supersonic ramjet airframes, active radar seekers, and guidance telemetry across operational domains.
          </p>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">12</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Cataloged Families</p>
              <p className="mt-0.5 text-[11px] font-medium text-emerald-600">Tactical to Strategic</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#0B4F9C]">MACH 3+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Cruise Velocity</p>
              <p className="mt-0.5 text-[11px] text-slate-500">BrahMos Supersonic Ramjet</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-[#E67300]">5,000+ KM</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Strategic Deterrence</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Agni-V Intercontinental Reach</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <p className="font-mono text-3xl font-black text-slate-950">TRIAD</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-700">Launch Modalities</p>
              <p className="mt-0.5 text-[11px] text-slate-500">Air, Land &amp; Sub-Surface</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 xl:px-12 space-y-10">
        {/* 2. INTERACTIVE ENGAGEMENT ENVELOPE FILTER */}
        <div className="rounded-2xl border border-blue-200/70 bg-gradient-to-r from-blue-50/70 via-white to-amber-50/40 p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0B4F9C] flex items-center gap-1.5">
                <Radar className="h-4 w-4" />
                Operational Engagement Envelopes
              </p>
              <p className="text-xs text-slate-600 mt-1">Filter missile families by combat engagement radius and launch doctrine:</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveRangeRing('all')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                  activeRangeRing === 'all'
                    ? 'bg-[#0B4F9C] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Radii
              </button>
              <button
                type="button"
                onClick={() => setActiveRangeRing('tactical')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                  activeRangeRing === 'tactical'
                    ? 'bg-[#0B4F9C] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Tactical (&lt; 50 km)
              </button>
              <button
                type="button"
                onClick={() => setActiveRangeRing('theatre')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                  activeRangeRing === 'theatre'
                    ? 'bg-[#0B4F9C] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Theatre (100 – 450 km)
              </button>
              <button
                type="button"
                onClick={() => setActiveRangeRing('strategic')}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                  activeRangeRing === 'strategic'
                    ? 'bg-[#0B4F9C] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Strategic (1,000 – 5,000+ km)
              </button>
            </div>
          </div>
        </div>

        {/* 3. CATEGORY BAR & VIEW TOGGLE */}
        <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat.id === 'all'
                ? missiles.length
                : missiles.filter((m) => cat.filter?.(m)).length;
              const isActive = activeTab === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
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

        {/* 4. ASYMMETRIC BENTO GRID */}
        {viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMissiles.map((missile) => {
              const isBrahMos = missile.slug === 'brahmos';
              const isAgni = missile.slug === 'agni';

              if (isBrahMos && (activeTab === 'all' || activeTab === 'cruise')) {
                return (
                  <article
                    key={missile.slug}
                    className="md:col-span-2 relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue-300/80 bg-gradient-to-br from-white via-[#f4f8fc] to-blue-50/50 p-8 sm:p-10 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-amber-500 text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm">
                            FLAGSHIP SUPERSONIC
                          </span>
                          <span className="rounded-md bg-blue-100 text-isroBlue px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                            {missile.type}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                          <Target className="h-3.5 w-3.5 text-[#E67300]" />
                          Range: {missile.range}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-6 lg:grid-cols-12 items-start">
                        <div className="lg:col-span-7">
                          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                            {missile.name}: World&apos;s Fastest Operational Cruise Missile
                          </h2>
                          <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            {missile.purpose} {missile.history}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200">Su-30MKI Air-Launched</span>
                            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200">Naval VLS Universal</span>
                            <span className="rounded-lg bg-white px-3 py-1.5 border border-slate-200">Autonomous Mobile Launcher</span>
                          </div>
                        </div>

                        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PROPULSION &amp; GUIDANCE TELEMETRY</p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Speed</span>
                              <span className="font-mono font-bold text-slate-900 text-sm">{missile.specifications?.Speed}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Warhead</span>
                              <span className="font-mono font-bold text-slate-900 text-sm">{missile.specifications?.Warhead}</span>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-slate-100">
                              <span className="text-slate-400 block text-[10px] uppercase">Terminal Seeker</span>
                              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                                <Compass className="h-3.5 w-3.5 text-isroBlue shrink-0" />
                                {missile.guidance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-5 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-mono">Status: Inducted &amp; Export Operational</span>
                      <Link
                        href={`/missiles/${missile.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-95"
                      >
                        <span>Inspect Full Dossier</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              }

              if (isAgni && (activeTab === 'all' || activeTab === 'strategic')) {
                return (
                  <article
                    key={missile.slug}
                    className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-amber-300/80 bg-gradient-to-br from-white via-white to-amber-50/40 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="absolute left-0 top-0 h-1.5 w-full bg-[#E67300]" />
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-md bg-amber-100 text-amber-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                          STRATEGIC DETERRENT
                        </span>
                        <span className="font-mono text-xs font-bold text-[#E67300]">
                          {missile.range}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold text-slate-950">
                        {missile.name}: Intercontinental Ballistic Fleet
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {missile.purpose}
                      </p>

                      <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Staging:</span>
                          <span className="font-mono font-bold text-slate-800">3-Stage Solid Composite</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Velocity:</span>
                          <span className="font-mono font-bold text-slate-800">{missile.specifications?.Speed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Payload:</span>
                          <span className="font-mono font-bold text-slate-800">MIRV / Strategic</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">Road-Mobile TEL</span>
                      <Link
                        href={`/missiles/${missile.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0B4F9C] hover:underline"
                      >
                        <span>Dossier</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                );
              }

              // Standard high-craft tactical cards
              return (
                <article
                  key={missile.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                >
                  <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-isroBlue via-blue-400 to-slate-200" />
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 border border-slate-200">
                        {missile.type}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-700 flex items-center gap-1">
                        <Target className="h-3 w-3 text-[#E67300]" />
                        {missile.range}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-isroBlue transition-colors">
                      {missile.name}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 line-clamp-2">
                      {missile.purpose}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Velocity</span>
                        <span className="font-mono font-bold text-slate-800">{missile.specifications?.Speed || 'Classified'}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-slate-400 block uppercase">Payload</span>
                        <span className="font-mono font-bold text-slate-800 truncate block">{missile.specifications?.Warhead || 'Tactical'}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Compass className="h-3 w-3 text-isroBlue shrink-0" />
                      <span className="truncate">{missile.guidance}</span>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">DRDO Certified</span>
                    <Link
                      href={`/missiles/${missile.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0B4F9C] hover:underline"
                    >
                      <span>Details</span>
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
                  <th className="px-5 py-3.5">Designation</th>
                  <th className="px-5 py-3.5">Classification</th>
                  <th className="px-5 py-3.5">Operational Range</th>
                  <th className="px-5 py-3.5">Guidance Package</th>
                  <th className="px-5 py-3.5 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMissiles.map((missile) => (
                  <tr key={missile.slug} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-4 font-bold text-slate-950">{missile.name}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-isroBlue">
                        {missile.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-700 font-mono">{missile.range}</td>
                    <td className="px-5 py-4 text-xs text-slate-600">{missile.guidance}</td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/missiles/${missile.slug}`}
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
    </main>
  );
}
