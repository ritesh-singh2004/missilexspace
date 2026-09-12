'use client';

import { useState } from 'react';
import {
  Globe,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Building2,
  Calendar,
  DollarSign,
  Layers,
  FileCode2,
  Send
} from 'lucide-react';
import { AgencyCode, GlobalProgram, ProgramMilestone } from '@/lib/programs-data';

interface ProgramIntakeSectionProps {
  onProgramSubmit: (newProgram: GlobalProgram) => void;
}

export default function ProgramIntakeSection({ onProgramSubmit }: ProgramIntakeSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [agency, setAgency] = useState<AgencyCode>('ISRO');
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('India');
  const [category, setCategory] = useState<GlobalProgram['category']>('Fellowship');
  const [level, setLevel] = useState<GlobalProgram['level']>('Undergraduate');
  const [funding, setFunding] = useState('₹2,00,000 Research Grant');
  const [duration, setDuration] = useState('6 Months (Hybrid)');
  const [deadline, setDeadline] = useState('2026-11-30');
  const [description, setDescription] = useState('');
  const [officialUrl, setOfficialUrl] = useState('');
  const [skills, setSkills] = useState('Python, Flight Avionics, CFD');
  
  // Dynamic milestones input
  const [milestones, setMilestones] = useState<ProgramMilestone[]>([
    {
      step: 1,
      title: 'Preliminary Design Review (PDR)',
      phase: 'PDR',
      deliverable: 'Concept architecture and initial structural simulation dossier',
      dueDate: '2026-12-15',
      weight: '30%',
      status: 'UPCOMING',
      criteria: 'Compliance with agency mass and thermal safety standards'
    },
    {
      step: 2,
      title: 'Critical Design Review (CDR)',
      phase: 'CDR',
      deliverable: 'Full CAD assemblies and flight control simulation algorithms',
      dueDate: '2027-01-30',
      weight: '40%',
      status: 'UPCOMING',
      criteria: 'Hardware-in-the-loop Monte Carlo trajectory verification'
    },
    {
      step: 3,
      title: 'Final Telemetry & Flight Defense',
      phase: 'FINAL',
      deliverable: 'Live hardware bench run or orbital data defense',
      dueDate: '2027-03-15',
      weight: '30%',
      status: 'UPCOMING',
      criteria: 'Direct review by agency panel of scientists'
    }
  ]);

  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);

  const handleAddMilestone = () => {
    const nextStep = milestones.length + 1;
    setMilestones([
      ...milestones,
      {
        step: nextStep,
        title: `Milestone ${nextStep} Deliverable`,
        phase: `PHASE-${nextStep}`,
        deliverable: 'Detailed engineering artifact submission',
        dueDate: '2027-04-15',
        weight: '20%',
        status: 'UPCOMING',
        criteria: 'Validated against mission standards'
      }
    ]);
  };

  const handleRemoveMilestone = (index: number) => {
    if (milestones.length <= 1) return;
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newProg: GlobalProgram = {
      id: `PRG-${agency}-${Math.floor(100 + Math.random() * 900)}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      agency,
      agencyName: agency === 'ISRO' ? 'Indian Space Research Organisation' :
                  agency === 'NASA' ? 'National Aeronautics and Space Administration' :
                  agency === 'ESA' ? 'European Space Agency' :
                  agency === 'JAXA' ? 'Japan Aerospace Exploration Agency' :
                  agency === 'DLR' ? 'German Aerospace Center' : 'International Aerospace Consortium',
      country,
      countryCode: agency === 'ISRO' ? 'IN' : agency === 'NASA' ? 'US' : agency === 'ESA' ? 'EU' : agency === 'JAXA' ? 'JP' : 'GLOBAL',
      category,
      level,
      funding,
      duration,
      intakeStatus: 'INTAKE_OPEN',
      deadline,
      milestones,
      enrolledCount: 1,
      onTimeRate: '100%',
      description,
      skillsRequired: skills.split(',').map((s) => s.trim()).filter(Boolean),
      officialUrl: officialUrl || 'https://missilex.res.in',
      featured: true
    };

    onProgramSubmit(newProg);
    const receipt = `INGEST-${agency}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setSubmittedReceipt(receipt);
  };

  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-isroBlue/20 bg-isroBlue/10 px-3 py-1 text-[11px] font-bold text-isroBlue">
            <Globe className="h-3 w-3" />
            DIRECTORATE & AGENCY PROGRAM INGESTION TERMINAL
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Publish an International Aerospace Program
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Space agencies, university coordinators, and commercial aerospace firms can catalog new student challenges with custom milestone deadlines and automated on-time tracking.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            setSubmittedReceipt(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm hover:border-isroBlue hover:bg-slate-50 transition"
        >
          {isOpen ? 'Minimize Terminal' : 'Open Program Ingestion Form'}
          <Plus className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {submittedReceipt ? (
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 text-center space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-950">New Aerospace Program Live in Catalog</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Program published to candidate feed with active milestone countdowns.
              </p>
              <p className="text-xs font-mono font-bold text-emerald-800">
                Verification Receipt: {submittedReceipt}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmittedReceipt(null);
                  setTitle('');
                  setDescription('');
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
              >
                Upload Another Program
              </button>
            </div>
          ) : (
            <>
              {/* Row 1: Agency, Country, Category */}
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Sponsoring Space Agency / Firm *</span>
                  <select
                    value={agency}
                    onChange={(e) => setAgency(e.target.value as AgencyCode)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue focus:bg-white"
                  >
                    <option value="ISRO">ISRO (India)</option>
                    <option value="NASA">NASA (United States)</option>
                    <option value="ESA">ESA (European Space Agency)</option>
                    <option value="JAXA">JAXA (Japan)</option>
                    <option value="DLR">DLR (Germany)</option>
                    <option value="COMMERCIAL">Commercial / NewSpace (Skyroot, Axiom, Planet)</option>
                  </select>
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Origin Country / Region *</span>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. India / United States / Japan"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue focus:bg-white"
                  />
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Program Category *</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue focus:bg-white"
                  >
                    <option value="Fellowship">Research Fellowship</option>
                    <option value="Hardware Challenge">Hardware Challenge</option>
                    <option value="Avionics Hackathon">Avionics & Flight Software</option>
                    <option value="SAR Telemetry">SAR Telemetry & Data Science</option>
                    <option value="Student Satellite">Student Satellite Initiative</option>
                  </select>
                </label>
              </div>

              {/* Row 2: Title */}
              <label className="block space-y-1.5 text-xs font-semibold text-slate-700">
                <span>Official Program Title *</span>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ISRO YUVIKA: Young Scientist Planetary Observation Challenge"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue focus:bg-white"
                />
              </label>

              {/* Row 3: Level, Funding, Duration, Deadline */}
              <div className="grid gap-4 sm:grid-cols-4">
                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Academic Level</span>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctoral / Early Career">Doctoral / Early Career</option>
                  </select>
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Stipend / Award</span>
                  <input
                    value={funding}
                    onChange={(e) => setFunding(e.target.value)}
                    placeholder="e.g. ₹2,50,000 Fellowship"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  />
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Duration</span>
                  <input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 6 Months (Hybrid)"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  />
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Intake Deadline</span>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  />
                </label>
              </div>

              {/* Row 4: Description */}
              <label className="block space-y-1.5 text-xs font-semibold text-slate-700">
                <span>Program Scope & Objectives *</span>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize the aerospace problem, mission dataset access, and expected candidate outcomes..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                />
              </label>

              {/* Milestones Configuration Table */}
              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-isroBlue" />
                    Structured Engineering Milestones & Pacing Deadlines
                  </span>
                  <button
                    type="button"
                    onClick={handleAddMilestone}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-isroBlue hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Milestone Stage
                  </button>
                </div>

                <div className="space-y-2">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="grid gap-2 sm:grid-cols-12 items-center rounded-xl border border-slate-200 bg-white p-2.5">
                      <div className="sm:col-span-1 text-center font-mono text-xs font-bold text-slate-500">
                        #{m.step}
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          value={m.title}
                          onChange={(e) => {
                            const copy = [...milestones];
                            copy[idx].title = e.target.value;
                            setMilestones(copy);
                          }}
                          placeholder="Milestone Title"
                          className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          value={m.deliverable}
                          onChange={(e) => {
                            const copy = [...milestones];
                            copy[idx].deliverable = e.target.value;
                            setMilestones(copy);
                          }}
                          placeholder="Deliverable Description"
                          className="w-full text-xs text-slate-600 bg-transparent outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <input
                          type="date"
                          value={m.dueDate}
                          onChange={(e) => {
                            const copy = [...milestones];
                            copy[idx].dueDate = e.target.value;
                            setMilestones(copy);
                          }}
                          className="w-full text-xs font-mono text-slate-700 bg-transparent outline-none"
                        />
                      </div>
                      <div className="sm:col-span-1 text-right">
                        {milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMilestone(idx)}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 5: Skills & Official Link */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Prerequisite Skills (Comma Separated)</span>
                  <input
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    placeholder="e.g. ROS 2, OpenFOAM, Simulink, Embedded C++"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  />
                </label>

                <label className="space-y-1.5 text-xs font-semibold text-slate-700">
                  <span>Official Agency Application URL</span>
                  <input
                    value={officialUrl}
                    onChange={(e) => setOfficialUrl(e.target.value)}
                    placeholder="https://isro.gov.in/programs"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-900 outline-none focus:border-isroBlue"
                  />
                </label>
              </div>

              {/* Submit Ingestion */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-isroBlue px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-isroBlueDark transition active:scale-[0.98]"
                >
                  <Send className="h-3.5 w-3.5" />
                  Publish Program with Active Pacer
                </button>
              </div>
            </>
          )}
        </form>
      )}
    </section>
  );
}
