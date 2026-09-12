'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Radar, ShieldCheck, Award, GraduationCap, FileCheck, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const clerkAppearance = {
  variables: {
    colorPrimary: '#0B4F9C',
    colorForeground: '#0f172a',
    colorMutedForeground: '#64748b',
    colorBackground: '#FFFFFF',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif'
  },
  elements: {
    rootBox: 'w-full',
    card: 'w-full shadow-none border-0 p-0 bg-transparent',
    header: 'hidden',
    socialButtonsBlockButton: 'rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-800 py-3 transition-all duration-150 active:scale-[0.98] shadow-xs',
    socialButtonsBlockButtonText: 'text-xs font-semibold text-slate-800',
    dividerLine: 'bg-slate-200/80',
    dividerText: 'text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-bold',
    formFieldLabel: 'text-xs font-semibold text-slate-700 mb-1.5',
    formFieldInput: 'rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10',
    formButtonPrimary: 'rounded-xl bg-isroBlue hover:bg-isroBlueDark text-xs font-bold uppercase tracking-wider py-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98]',
    footerActionLink: 'text-xs font-bold text-isroBlue hover:text-isroBlueDark transition',
    footerActionText: 'text-xs text-slate-500',
    identityPreviewEditButton: 'text-isroBlue',
    formResendCodeLink: 'text-isroBlue'
  }
};

export default function RegisterPageContent() {
  const { t } = useTranslation('auth');

  return (
    <div className="relative isolate min-h-[calc(100vh-200px)] bg-[#f7faff] text-slate-900 py-10 sm:py-14 lg:py-16 selection:bg-[#E67300] selection:text-white">
      <div className="home-grid absolute inset-0 -z-10 opacity-40 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Account Creation Overview (7-Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-isroBlue shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>CREATE ACCOUNT</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl sm:leading-[1.15]">
                Create your account.
              </h1>

              <p className="text-base leading-relaxed text-slate-600 sm:text-lg max-w-2xl">
                Register with your details to access research projects, submit proposals, apply for fellowships, and collaborate with teams.
              </p>
            </div>

            {/* 3 Account Creation Pillars */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-xs backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-isroBlue">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Instant Verification</h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    Fast verification for enrolled researchers, scholars, students, and engineers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-xs backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#E67300]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Fellowships &amp; Grants</h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    Direct access to apply for student fellowships, research testbed grants, and compute hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4.5 shadow-xs backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Research &amp; Publishing</h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">
                    Publish research papers, reference open technical data, and draft collaborative proposals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card (5-Cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-isroBlue via-blue-500 to-[#E67300]" />

              {/* Card Header */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Register
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Enter your details to create your account.
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-isroBlue shadow-xs">
                  <Radar className="h-5 w-5" />
                </div>
              </div>

              {/* Clerk Sign Up Component */}
              <SignUp
                routing="path"
                path="/register"
                signInUrl="/login"
                fallbackRedirectUrl="/dashboard"
                appearance={clerkAppearance}
              />

              {/* Bottom Support Text */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Protected by secure 256-bit SSL encryption.
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  Need help?{' '}
                  <a href="mailto:missilexrocketspace@gmail.com" className="text-isroBlue hover:underline">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
