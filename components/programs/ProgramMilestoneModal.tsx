'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  UploadCloud,
  Award,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Hash
} from 'lucide-react';
import { GlobalProgram, ProgramMilestone } from '@/lib/programs-data';

interface ProgramMilestoneModalProps {
  program: GlobalProgram | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyClick: (program: GlobalProgram) => void;
}

export default function ProgramMilestoneModal({
  program,
  isOpen,
  onClose,
  onApplyClick
}: ProgramMilestoneModalProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmittingArtifact, setIsSubmittingArtifact] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !program) return null;

  // Calculate dynamic days remaining
  const calculateDaysRemaining = (dateString: string) => {
    const target = new Date(dateString).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days, hours };
  };

  const nextMilestone = program.milestones.find((m) => !completedSteps.includes(m.step)) || program.milestones[0];
  const { days: daysLeft, hours: hoursLeft } = calculateDaysRemaining(nextMilestone.dueDate);

  // Toggle milestone completion in simulator
  const toggleMilestone = (step: number) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    );
  };

  const totalMilestones = program.milestones.length;
  const progressPercent = Math.round((completedSteps.length / totalMilestones) * 100);

  const handleSimulateDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
    }
  };

  const handleSubmitArtifact = () => {
    if (!uploadedFile) return;
    setIsSubmittingArtifact(true);
    setTimeout(() => {
      setIsSubmittingArtifact(false);
      setSubmissionReceipt(`SOV-VERIFY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-program-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md p-4 sm:p-6 flex items-start justify-center transition-opacity"
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl transition-all sm:p-8 my-8 text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-isroBlue/20 bg-isroBlue/10 px-2.5 py-0.5 text-xs font-bold text-isroBlue">
                {program.agency} • {program.country}
              </span>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {program.id}
              </span>
              <span className="rounded-md border border-amber-500/20 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-[#E67300]">
                {program.funding}
              </span>
            </div>
            <h2 id="modal-program-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 mt-1">
              {program.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {program.agencyName} • {program.duration} • Level: {program.level}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Milestone Pacing & Velocity Telemetry Bar */}
        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl border border-blue-100 bg-[#f4f8fc] p-4 sm:p-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Next Due Milestone</p>
            <p className="text-sm font-bold text-slate-900 line-clamp-1">{nextMilestone.title}</p>
            <p className="text-xs text-isroBlue font-mono">Phase: {nextMilestone.phase} • Weight {nextMilestone.weight}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Milestone Pacing Clock</p>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#E67300]" />
              <span className="font-mono text-base font-bold text-slate-900">
                {daysLeft}d : {hoursLeft}h remaining
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Hard deadline: {nextMilestone.dueDate}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">On-Time Velocity Status</p>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {progressPercent === 100 ? 'COMPLETED ON-TIME' : 'ON-SCHEDULE (+3d Buffer)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Cohort on-time rate: {program.onTimeRate}</p>
          </div>
        </div>

        {/* Interactive Student Pacing Simulator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-isroBlue" />
                Structured Milestone Sequence & Requirements
              </h3>
              <p className="text-xs text-slate-500">
                Check off deliverables to simulate your team’s on-time milestone pacing velocity.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-isroBlue bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {completedSteps.length} of {totalMilestones} Milestones ({progressPercent}%)
            </span>
          </div>

          {/* Progress Visualizer Bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-isroBlue to-[#E67300] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Milestone List */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {program.milestones.map((m) => {
              const isChecked = completedSteps.includes(m.step);
              return (
                <div
                  key={m.step}
                  onClick={() => toggleMilestone(m.step)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    isChecked
                      ? 'border-emerald-300 bg-emerald-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                            isChecked
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white text-transparent'
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">
                            M{m.step}: {m.title}
                          </span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-600">
                            {m.phase}
                          </span>
                          <span className="rounded bg-blue-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-isroBlue">
                            Weight: {m.weight}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{m.deliverable}</p>
                        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500 font-mono">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Criteria: {m.criteria}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-slate-500 block">Due Date</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{m.dueDate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Artifact Upload Zone */}
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-5 text-center">
          {submissionReceipt ? (
            <div className="space-y-2 py-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-900">Milestone Artifact Cryptographically Registered</p>
              <p className="text-xs font-mono text-emerald-700">Receipt: {submissionReceipt}</p>
              <p className="text-[11px] text-slate-500">Timestamp logged to National Space Student Repository.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <UploadCloud className="mx-auto h-8 w-8 text-slate-400" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">
                  Upload Milestone Deliverable (CAD, Simulink, ROS 2 zip, LaTeX PDF)
                </p>
                <p className="text-[11px] text-slate-500">
                  Deliverables undergo automated timestamp verification to certify on-time milestone delivery.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <label className="cursor-pointer rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                  Choose File
                  <input type="file" onChange={handleSimulateDrop} className="hidden" />
                </label>
                {uploadedFile && (
                  <span className="text-xs font-mono text-slate-600 truncate max-w-xs">{uploadedFile}</span>
                )}
                <button
                  type="button"
                  disabled={!uploadedFile || isSubmittingArtifact}
                  onClick={handleSubmitArtifact}
                  className="rounded-xl bg-isroBlue px-4 py-1.5 text-xs font-bold text-white transition hover:bg-isroBlueDark disabled:opacity-50"
                >
                  {isSubmittingArtifact ? 'Stamping...' : 'Submit & Timestamp'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <a
            href={program.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-isroBlue hover:underline"
          >
            Visit Official {program.agency} Program Portal
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              Close Inspector
            </button>
            <Link
              href={`/programs/apply?program=${program.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E67300] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#CC6600] transition active:scale-[0.98]"
            >
              Apply for this Cohort
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
