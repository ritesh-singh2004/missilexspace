'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  FileText, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { careerData } from '@/lib/site-data';

type ApplicationFormValues = { 
  name: string; 
  email: string; 
  phone: string; 
  position: string; 
  coverNote: string;
};

interface CareerApplicationFormProps {
  initialPosition?: string;
}

export default function CareerApplicationForm({ initialPosition }: CareerApplicationFormProps) {
  const { t } = useTranslation('forms');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(
      z.object({
        name: z.string().min(2, t('validation.nameRequired')),
        email: z.string().email(t('validation.emailRequired')),
        phone: z.string().min(10, t('validation.phoneRequired')),
        position: z.string().min(1, t('validation.positionRequired')),
        coverNote: z.string().min(20, t('validation.coverNoteMin'))
      })
    ),
    defaultValues: {
      position: initialPosition || ''
    }
  });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resume, setResume] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (initialPosition) {
      setValue('position', initialPosition);
    }
  }, [initialPosition, setValue]);

  const selectedPosition = watch('position');

  const onSubmit = async (data: ApplicationFormValues) => {
    setStatus('idle');
    try {
      const payload = new FormData();
      Object.entries(data).forEach(([key, value]) => payload.append(key, value));
      if (resume) payload.append('resume', resume);

      const response = await fetch('/api/careers-apply', { method: 'POST', body: payload });
      if (!response.ok) throw new Error('Application failed');
      setStatus('success');
      reset();
      setResume(null);
    } catch (error) {
      setStatus('error');
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        setResume(file);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-6 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0B4F9C]">Mission Dossier Submission</span>
        </div>
        <h3 className="mt-1 text-xl font-bold text-slate-900">Cadre Application Portal</h3>
        <p className="mt-1 text-xs text-slate-500">All submissions are routed securely to the MissileX Research Directorate talent evaluation team.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <User className="h-3.5 w-3.5 text-[#0B4F9C]" />
              {t('fields.name')} <span className="text-red-500">*</span>
            </label>
            <input 
              {...register('name')} 
              placeholder="e.g. Dr. Aryan Sharma" 
              className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <Mail className="h-3.5 w-3.5 text-[#0B4F9C]" />
              {t('fields.email')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="email"
              {...register('email')} 
              placeholder="aryan.sharma@domain.in" 
              className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                errors.email ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Phone */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <Phone className="h-3.5 w-3.5 text-[#0B4F9C]" />
              {t('fields.phone')} <span className="text-red-500">*</span>
            </label>
            <input 
              type="tel"
              {...register('phone')} 
              placeholder="+91 98765 43210" 
              className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone.message}</p>}
          </div>

          {/* Position Selector */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
              <Briefcase className="h-3.5 w-3.5 text-[#0B4F9C]" />
              {t('fields.position')} <span className="text-red-500">*</span>
            </label>
            <select 
              {...register('position')} 
              value={selectedPosition}
              className={`w-full rounded-xl border bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
                errors.position ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
              }`}
            >
              <option value="" disabled>{t('placeholders.selectPosition')}</option>
              {careerData.map((position) => (
                <option key={position.title} value={position.title}>{position.title} ({position.location})</option>
              ))}
              <option value="Internship">Research & Engineering Internship</option>
              <option value="Fellowship">Postdoctoral Aerospace Fellowship</option>
            </select>
            {errors.position && <p className="text-xs text-red-500 font-medium">{errors.position.message}</p>}
          </div>
        </div>

        {/* Cover Note */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <FileText className="h-3.5 w-3.5 text-[#0B4F9C]" />
            {t('fields.coverNote')} <span className="text-red-500">*</span>
          </label>
          <textarea 
            {...register('coverNote')} 
            rows={4} 
            placeholder="Summarize your relevant aerospace/defence research experience, publication track record, or engineering achievements..."
            className={`w-full rounded-xl border bg-slate-50/50 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#0B4F9C]/20 ${
              errors.coverNote ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-[#0B4F9C]'
            }`}
          />
          {errors.coverNote && <p className="text-xs text-red-500 font-medium">{errors.coverNote.message}</p>}
        </div>

        {/* Resume Dropzone */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-700">
            <span className="flex items-center gap-1.5">
              <UploadCloud className="h-3.5 w-3.5 text-[#0B4F9C]" />
              {t('fields.resume')}
            </span>
            <span className="text-[11px] font-normal text-slate-400 lowercase">pdf only (max 10MB)</span>
          </label>
          <label
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition ${
              isDragging 
                ? 'border-[#0B4F9C] bg-blue-50/50' 
                : resume 
                  ? 'border-emerald-300 bg-emerald-50/30' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={(event) => setResume(event.target.files?.[0] ?? null)}
              className="sr-only"
            />
            {resume ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{resume.name}</p>
                  <p className="text-xs text-slate-500">{(resume.size / (1024 * 1024)).toFixed(2)} MB • Ready for transmission</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setResume(null); }}
                  className="ml-3 text-xs font-semibold text-red-600 hover:text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#0B4F9C]">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    <span className="font-semibold text-[#0B4F9C] hover:underline">Click to upload dossier</span> or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Curriculum Vitae, publications list, or academic portfolio in PDF</p>
                </div>
              </div>
            )}
          </label>
        </div>

        {/* Security & Verification Guarantee */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#0B4F9C]" />
          <span>Encrypted transmission. Candidate credentials remain confidential under MissileX research privacy protocol.</span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E67300] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#cf6700] focus:outline-none focus:ring-2 focus:ring-[#E67300]/50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>{t('buttons.submitting')}</span>
            </>
          ) : (
            <>
              <span>{t('buttons.submitApplication')}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </>
          )}
        </button>

        {/* Status Alerts */}
        {status === 'success' && (
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800 animate-in fade-in duration-300">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-semibold">Dossier Successfully Transmitted</p>
              <p className="mt-0.5 text-xs text-emerald-700">{t('status.applicationSuccessCareer')}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4 text-sm text-red-800 animate-in fade-in duration-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Error</p>
              <p className="mt-0.5 text-xs text-red-700">{t('status.genericError')}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
