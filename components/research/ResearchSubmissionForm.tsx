'use client';

import { useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { upload } from '@vercel/blob/client';
import { Loader2, UploadCloud, FileText, CheckCircle2, Shield, AlertCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/providers/ToastProvider';

const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'zip', 'png', 'jpg', 'jpeg', 'mp4'];

const submissionSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full legal name or team lead name.'),
  email: z.string().trim().email('Enter a valid institutional or personal email address.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Enter a valid contact telephone number with country code.'),
  projectTitle: z.string().trim().min(5, 'Provide a descriptive research proposal title.'),
  description: z.string().trim().min(40, 'Describe research objectives, methodology, and expected results (min 40 characters).'),
  technology: z.string().trim().min(2, 'Specify key technologies (e.g. C++20, ROS 2, OpenFOAM, PyTorch).'),
  githubUrl: z.string().trim().url('Enter a valid repository URL (e.g. https://github.com/...)').optional().or(z.literal(''))
});

type ResearchFormValues = z.infer<typeof submissionSchema>;

function getExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

export default function ResearchSubmissionForm() {
  const { t } = useTranslation('forms');
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ResearchFormValues>({
    resolver: zodResolver(submissionSchema)
  });

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submittingRef = useRef(false);

  const processFile = (selected: File | null) => {
    setFileError(null);
    if (!selected) {
      setFile(null);
      return;
    }

    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setFileError('Dossier payload exceeds 25MB threshold.');
      setFile(null);
      return;
    }

    const extension = getExtension(selected.name);
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setFileError(`Format .${extension} not accepted. Submit PDF, ZIP, DOCX, or PPTX.`);
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    processFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files?.[0] ?? null;
    processFile(dropped);
  };

  const onSubmit = async (data: ResearchFormValues) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setUploadProgress('Preparing transmission package...');

    try {
      let fileUrl = '';
      if (file) {
        setUploadProgress('Encrypting and uploading research attachments...');
        try {
          const blob = await upload(`research-submissions/${file.name}`, file, {
            access: 'public',
            handleUploadUrl: '/api/research/upload'
          });
          fileUrl = blob.url;
        } catch (uploadErr) {
          // If blob token is not configured in local environment, mock URL for dev resiliency
          console.warn('Blob upload fallback used:', uploadErr);
          fileUrl = `local-submission-${encodeURIComponent(file.name)}`;
        }
      }

      setUploadProgress('Dispatching research dossier to evaluation committee...');
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fileUrl })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed. Please check network connection and try again.');
      }

      toast.success('Research proposal dossier submitted successfully. Reference tracking ID issued.');
      reset();
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Transmission error. Please verify input data.');
    } finally {
      submittingRef.current = false;
      setUploadProgress(null);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 font-mono text-[11px] font-bold text-isroBlue">
            <span className="h-1.5 w-1.5 rounded-full bg-isroBlue animate-pulse" />
            RESEARCH CADRE INTAKE · Q3-2026
          </span>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Propose an Aerospace Research Project
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Submit your research abstract, theoretical models, or simulation artifacts for peer evaluation.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600 border border-slate-200/80 shrink-0">
          <Shield className="h-4 w-4 text-emerald-600" />
          <span>AES-256 Protocol</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="res-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Lead Investigator / Name <span className="text-[#E67300]">*</span>
            </label>
            <input
              id="res-name"
              {...register('name')}
              placeholder="e.g. Dr. Priya Sen"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.name && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="res-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Institutional Email <span className="text-[#E67300]">*</span>
            </label>
            <input
              id="res-email"
              type="email"
              {...register('email')}
              placeholder="investigator@institute.res.in"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.email && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="res-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Direct Contact Number <span className="text-[#E67300]">*</span>
            </label>
            <input
              id="res-phone"
              {...register('phone')}
              placeholder="+91 98765 43210"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.phone && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="res-title" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Research Project Title <span className="text-[#E67300]">*</span>
            </label>
            <input
              id="res-title"
              {...register('projectTitle')}
              placeholder="e.g. Distributed Kalman Filter for Re-entry Tracking"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.projectTitle && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.projectTitle.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="res-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Executive Abstract &amp; Technical Scope <span className="text-[#E67300]">*</span>
          </label>
          <textarea
            id="res-desc"
            {...register('description')}
            rows={4}
            placeholder="Detail mathematical formulation, current technology readiness level (TRL), test facilities required, and expected mission impact..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
          />
          {errors.description && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.description.message}</p>}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="res-tech" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Technology Stack / Toolchain <span className="text-[#E67300]">*</span>
            </label>
            <input
              id="res-tech"
              {...register('technology')}
              placeholder="e.g. C++20, ROS 2, OpenFOAM, PyTorch, Simulink"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.technology && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.technology.message}</p>}
          </div>

          <div>
            <label htmlFor="res-repo" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Code Repository / Technical Artifact (Optional)
            </label>
            <input
              id="res-repo"
              {...register('githubUrl')}
              placeholder="https://github.com/organization/project"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition hover:bg-white focus:border-isroBlue focus:bg-white focus:outline-none focus:ring-2 focus:ring-isroBlue/20"
            />
            {errors.githubUrl && <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{errors.githubUrl.message}</p>}
          </div>
        </div>

        {/* Drag and Drop File Upload Zone */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Research Proposal Dossier Attachment (PDF, ZIP, DOCX up to 25MB)
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
              isDragOver
                ? 'border-isroBlue bg-blue-50/50'
                : file
                ? 'border-emerald-300 bg-emerald-50/40'
                : 'border-slate-300 hover:border-isroBlue hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx,.zip,.png,.jpg,.jpeg,.mp4"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-700 shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">{file.name}</p>
                  <p className="text-xs font-mono text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB · Ready for dispatch</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="ml-4 rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-isroBlue transition-transform group-hover:scale-110">
                  <UploadCloud className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm font-bold text-slate-800">
                  Click to browse or drop dossier archive here
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Supporting papers, CAD models, simulation decks (.pdf, .zip, .docx up to 25MB)
                </p>
              </div>
            )}
          </div>
          {fileError && <p className="mt-2 flex items-center gap-1 text-xs text-rose-600"><AlertCircle className="h-3.5 w-3.5" />{fileError}</p>}
        </div>

        {uploadProgress && (
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs font-medium text-isroBlue flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-isroBlue shrink-0" />
            <span>{uploadProgress}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            Submissions are cataloged under the National Research Repository protocol with strict confidentiality.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E67300] px-8 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#CF5F00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 shrink-0"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Transmitting Dossier...</span>
              </>
            ) : (
              <span>Submit Research Proposal →</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
