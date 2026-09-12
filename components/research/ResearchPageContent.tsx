'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  Search,
  ShieldCheck,
  Cpu,
  BookOpen,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { researchPapers, publications, type ResearchPaper } from '@/lib/publications';
import ResearchSubmissionForm from '@/components/research/ResearchSubmissionForm';

const categories = ['All Disciplines', 'Sensor Fusion', 'Autonomous GN&C', 'Digital Twin', 'Hypersonics'] as const;

export default function ResearchPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Disciplines');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAbstract, setExpandedAbstract] = useState<string | null>(null);

  const filteredPapers = researchPapers.filter((paper) => {
    const matchesCategory = selectedCategory === 'All Disciplines' || paper.category === selectedCategory;
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-[#f7faff] min-h-screen">
      {/* Hero Header */}
      <section className="relative border-b border-blue-100/80 bg-gradient-to-b from-[#0B2545] via-[#0A3D73] to-[#082E59] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-[11px] font-bold tracking-wide text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              SOVEREIGN DEFENCE RESEARCH REPOSITORY
            </span>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-6xl text-white">
              Next-generation aerospace and strategic guidance research.
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-blue-100 max-w-2xl">
              Access verified scientific publications, numerical simulation models, and flight guidance envelopes. Submit peer-reviewed proposals to national research teams.
            </p>
          </div>

          {/* Telemetry Metrics Ribbon */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
              <p className="font-mono text-2xl font-black text-white">04</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-200">Peer-Reviewed Papers</p>
              <p className="mt-0.5 text-[11px] text-blue-300/80">Indexed with DOI</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
              <p className="font-mono text-2xl font-black text-white">TRL 4–6</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-200">Readiness Scope</p>
              <p className="mt-0.5 text-[11px] text-blue-300/80">Simulated &amp; Validated</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
              <p className="font-mono text-2xl font-black text-white">100%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-200">Open Technical Data</p>
              <p className="mt-0.5 text-[11px] text-blue-300/80">GODL-India Compliant</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md">
              <p className="font-mono text-2xl font-black text-amber-300">Q3-2026</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-blue-200">Proposal Intake</p>
              <p className="mt-0.5 text-[11px] text-blue-300/80">Active Evaluation Cycle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 xl:px-12 space-y-16">
        {/* Research Papers Section */}
        <section id="papers" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-isroBlue">
                Scientific Literature
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Technical Papers &amp; Guidance Envelopes
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                Theoretical formulations, aerodynamic wind-tunnel data, and autonomous guidance algorithms produced in collaboration with DRDO, ISRO, and premier research institutions.
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search papers, DOI, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition hover:border-blue-300 focus:border-isroBlue focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const count =
                cat === 'All Disciplines'
                  ? researchPapers.length
                  : researchPapers.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-isroBlue text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Papers Grid */}
          <div className="grid gap-6">
            {filteredPapers.map((paper) => {
              const isExpanded = expandedAbstract === paper.id;
              return (
                <article
                  key={paper.id}
                  className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-isroBlue font-mono">
                          {paper.category}
                        </span>
                        <span className="rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-[#E67300] font-mono">
                          {paper.trl}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          DOI: {paper.doi}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-isroBlue transition-colors">
                        {paper.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-medium">
                        Authors: <span className="text-slate-800">{paper.authors.join(', ')}</span> ·{' '}
                        <span className="text-slate-500">{paper.institution}</span>
                      </p>

                      <p className="text-sm leading-relaxed text-slate-600">
                        {paper.abstract}
                      </p>

                      {/* Expandable Technical Details Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t border-slate-100 pt-4 mt-4"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl bg-slate-50 p-4 text-xs">
                              <div>
                                <p className="text-slate-400 uppercase font-mono text-[10px]">Citations</p>
                                <p className="font-bold text-slate-900 mt-0.5">{paper.citations} Verified</p>
                              </div>
                              <div>
                                <p className="text-slate-400 uppercase font-mono text-[10px]">Pages</p>
                                <p className="font-bold text-slate-900 mt-0.5">{paper.pages} Pages</p>
                              </div>
                              <div>
                                <p className="text-slate-400 uppercase font-mono text-[10px]">Date Published</p>
                                <p className="font-bold text-slate-900 mt-0.5">{paper.date}</p>
                              </div>
                              <div>
                                <p className="text-slate-400 uppercase font-mono text-[10px]">Licence</p>
                                <p className="font-bold text-slate-900 mt-0.5">GODL-India Open</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0 pt-2 lg:pt-0">
                      <button
                        type="button"
                        onClick={() => setExpandedAbstract(isExpanded ? null : paper.id)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition"
                      >
                        <span>{isExpanded ? 'Hide Specs' : 'View Specs'}</span>
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <a
                        href={`/api/research/download?id=${paper.id}`}
                        download={`${paper.slug}.pdf`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading technical note: ${paper.title} (${paper.size})`);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-isroBlueDark active:scale-[0.98]"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download {paper.format} ({paper.size})</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}

            {filteredPapers.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-bold text-slate-800">No research papers match your query.</p>
                <p className="mt-1 text-xs text-slate-500">Try adjusting your keyword search or category filter.</p>
              </div>
            )}
          </div>
        </section>

        {/* Institutional Publications & Gazette */}
        <section id="publications" className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E67300]">
              Official Documentation
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Gazettes, Annual Reports &amp; Roadmaps
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              High-level administrative releases, testbed telemetry summaries, and strategic multi-year milestones.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase text-slate-600">
                      {pub.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{pub.date}</span>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900 leading-snug">
                    {pub.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {pub.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{pub.pages} Pages · {pub.size}</span>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading official publication: ${pub.title}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-isroBlue hover:text-isroBlueDark transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Get PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Propose a Research Project Form Terminal */}
        <section id="submit" className="pt-6">
          <ResearchSubmissionForm />
        </section>
      </div>
    </main>
  );
}
