'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Globe,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  Search,
  Filter,
  Layers,
  Cpu,
  ShieldCheck,
  Users,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Zap,
  Building,
  ArrowRight
} from 'lucide-react';
import PageBanner from '@/components/patterns/PageBanner';
import ProgramMilestoneModal from '@/components/programs/ProgramMilestoneModal';
import ProgramIntakeSection from '@/components/programs/ProgramIntakeSection';
import {
  globalPrograms as initialGlobalPrograms,
  velocityMetrics,
  GlobalProgram,
  AgencyCode
} from '@/lib/programs-data';

export default function ProgramsPageContent() {
  // Programs repository state (extensible via ingestion terminal)
  const [programsList, setProgramsList] = useState<GlobalProgram[]>(initialGlobalPrograms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgency, setSelectedAgency] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Modal state
  const [activeModalProgram, setActiveModalProgram] = useState<GlobalProgram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle new program added via Directorate Ingestion Terminal
  const handleProgramAdded = (newProgram: GlobalProgram) => {
    setProgramsList((prev) => [newProgram, ...prev]);
  };

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programsList.filter((prg) => {
      // Agency Filter
      if (selectedAgency !== 'ALL' && prg.agency !== selectedAgency) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'ALL' && prg.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prg.title.toLowerCase().includes(q);
        const matchAgency = prg.agencyName.toLowerCase().includes(q) || prg.agency.toLowerCase().includes(q);
        const matchDesc = prg.description.toLowerCase().includes(q);
        const matchSkills = prg.skillsRequired.some((s) => s.toLowerCase().includes(q));
        if (!matchTitle && !matchAgency && !matchDesc && !matchSkills) {
          return false;
        }
      }
      return true;
    });
  }, [programsList, selectedAgency, selectedCategory, searchQuery]);

  // Open milestone modal
  const handleOpenMilestones = (program: GlobalProgram) => {
    setActiveModalProgram(program);
    setIsModalOpen(true);
  };

  // Dynamic countdown calculation helper
  const getDaysRemaining = (dateString: string) => {
    const target = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="home-light min-h-screen bg-[#f7faff] text-slate-900">
      {/* 1. High-Altitude Blueprint Hero Banner */}
      <PageBanner
        eyebrow="GLOBAL AEROSPACE PROGRAMS & STUDENT CADRE"
        title="International Space Agency Programs & Milestone Pacing Engine"
        description="Explore verified research fellowships, hardware challenges, and avionics hackathons from ISRO, NASA, ESA, JAXA, and global aerospace firms. Track multi-phase engineering deliverables and maintain verified on-time milestone velocity."
        breadcrumbs={[
          { label: 'Global Programs', href: '/programs' },
          { label: 'Active Cohorts & Pacing Engine' }
        ]}
      />

      {/* 2. Telemetry Standards Ribbon */}
      <section className="border-b border-slate-200/80 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:px-8 md:grid-cols-4 xl:px-12">
          {velocityMetrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue shadow-sm">
                <Rocket className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-bold text-slate-950 font-mono">{metric.value}</p>
                <p className="text-[11px] font-medium text-slate-500">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The On-Time Milestone Velocity Framework (Bento) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-isroBlue">
              ACCOUNTABILITY & PACING ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-1">
              How MissileX Tracks & Certifies On-Time Student Delivery
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Unlike passive opportunity boards, every global challenge in this portal is broken down into gated engineering phases to hold student research teams accountable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Bento Card 1: Gated Reviews */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-isroBlue mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Gated PDR & CDR Milestones</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Programs enforce aerospace review stages: Preliminary Design Review (PDR), Critical Design Review (CDR), and Hardware/Flight Code Defense with explicit pass/fail tolerances.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-isroBlue">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>4 Distinct Evaluation Gates</span>
              </div>
            </div>

            {/* Bento Card 2: Live Velocity Pacer */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-[#E67300] mb-4">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">2. Real-Time Velocity Meters</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Automated countdown clocks track team delivery pace against hard submission timestamps, warning candidates 48 hours prior to grace period expiration.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E67300]">
                <Zap className="h-3.5 w-3.5" />
                <span>Zero-Latency Automated Warnings</span>
              </div>
            </div>

            {/* Bento Card 3: Cryptographic Verification */}
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md transition">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">3. Sovereign Talent Registry</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Teams achieving 100% on-time milestone delivery receive verified aerospace completion certificates indexed in the national space research talent pool.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>SHA-256 Timestamped Credential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Search & Agency Filter Console */}
      <section className="relative isolate py-8 border-t border-slate-200/80">
        <div className="home-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12 space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-isroBlue">
                DISCOVERY & ENROLLMENT PORTAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 mt-1">
                Active International Space Challenges
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Filter global agency programs by sponsoring authority, research domain, and milestone status.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs by title, agency, or domain (e.g. Artemis, CFD)..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-isroBlue focus:ring-2 focus:ring-isroBlue/10"
              />
            </div>
          </div>

          {/* Agency Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Global Agencies' },
              { id: 'ISRO', label: 'ISRO (India)' },
              { id: 'NASA', label: 'NASA (United States)' },
              { id: 'ESA', label: 'ESA (Europe)' },
              { id: 'JAXA', label: 'JAXA (Japan)' },
              { id: 'COMMERCIAL', label: 'Commercial NewSpace' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedAgency(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition active:scale-[0.98] ${
                  selectedAgency === tab.id
                    ? 'bg-isroBlue text-white shadow-sm'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Filter Pills & Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'ALL', label: 'All Categories' },
                { id: 'Fellowship', label: 'Research Fellowships' },
                { id: 'Hardware Challenge', label: 'Hardware Challenges' },
                { id: 'Avionics Hackathon', label: 'Avionics & Flight Software' },
                { id: 'SAR Telemetry', label: 'SAR Telemetry & Data' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono font-medium text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredPrograms.length}</span> of{' '}
              {programsList.length} Active Challenges
            </div>
          </div>

          {/* 5. Asymmetric Global Program Bento Cards */}
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredPrograms.map((prg) => {
              const daysLeft = getDaysRemaining(prg.deadline);
              const isUrgent = daysLeft <= 45;

              return (
                <div
                  key={prg.id}
                  className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 sm:p-8 shadow-sm transition-all hover:shadow-md ${
                    prg.featured
                      ? 'border-isroBlue/40 ring-1 ring-isroBlue/10 hover:border-isroBlue'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Card Header */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-isroBlue/20 bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-isroBlue">
                          {prg.agency} • {prg.countryCode}
                        </span>
                        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {prg.category}
                        </span>
                      </div>

                      {/* Live Deadline Pacer Pill */}
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[11px] font-bold font-mono ${
                          isUrgent
                            ? 'border border-amber-500/30 bg-amber-50 text-[#E67300]'
                            : 'border border-emerald-500/30 bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        <span>{daysLeft} Days to Deadline</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-950 group-hover:text-isroBlue transition-colors">
                        {prg.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {prg.agencyName} • {prg.duration} • Level: {prg.level}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-2">
                      {prg.description}
                    </p>

                    {/* Milestone Progress Preview Bar */}
                    <div className="space-y-1.5 rounded-2xl border border-slate-100 bg-[#f8fafc] p-3.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold text-slate-700">
                          {prg.milestones.length} Structured Milestones
                        </span>
                        <span className="text-emerald-700 font-bold">
                          {prg.onTimeRate} On-Time Delivery Rate
                        </span>
                      </div>
                      
                      {/* Step Indicator Pills */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {prg.milestones.map((m) => (
                          <div
                            key={m.step}
                            className="flex-1 rounded-md bg-slate-200 h-2 overflow-hidden"
                            title={`${m.title} (${m.phase}) - Due ${m.dueDate}`}
                          >
                            <div className="h-full bg-isroBlue w-1/3" />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 font-mono">
                        <span>PDR Phase</span>
                        <span>CDR Phase</span>
                        <span>Flight Telemetry Defense</span>
                      </div>
                    </div>

                    {/* Grant / Funding & Skills Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-50/70 px-2.5 py-1 text-xs font-bold text-[#E67300]">
                        <Award className="h-3.5 w-3.5" />
                        <span>{prg.funding}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {prg.skillsRequired.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => handleOpenMilestones(prg)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-isroBlue hover:text-isroBlueDark hover:underline transition"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      Inspect Milestones & Track Pace
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={prg.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:border-slate-300 hover:text-slate-700 transition"
                        title="Official Agency Site"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link
                        href={`/programs/apply?program=${prg.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-isroBlue transition active:scale-[0.98]"
                      >
                        Apply for Cohort
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-base font-bold text-slate-900">No matching aerospace programs found</p>
              <p className="text-xs text-slate-500 mt-1">Try broadening your search query or selecting "All Global Agencies".</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedAgency('ALL');
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="mt-4 rounded-xl bg-isroBlue px-4 py-2 text-xs font-bold text-white"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. Directorate & Agency Program Ingestion Terminal */}
      <section id="ingest" className="py-16 border-t border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <ProgramIntakeSection onProgramSubmit={handleProgramAdded} />
        </div>
      </section>

      {/* 7. Interactive Milestone Modal */}
      <ProgramMilestoneModal
        program={activeModalProgram}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyClick={() => setIsModalOpen(false)}
      />
    </div>
  );
}
