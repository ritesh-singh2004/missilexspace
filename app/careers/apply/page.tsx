import { Suspense } from 'react';
import type { Metadata } from 'next';
import CareerApplyPageContent from '@/components/careers/CareerApplyPageContent';

export const metadata: Metadata = {
  title: 'Apply for Cadre Appointment | MissileX Aerospace',
  description: 'Submit your candidate dossier and technical repository for sovereign defense aerospace fellowship evaluation.',
  alternates: { canonical: '/careers/apply' }
};

export default function CareerApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f7faff]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0B4F9C] border-t-transparent" />
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">Loading Cadre Admission Portal...</p>
        </div>
      </div>
    }>
      <CareerApplyPageContent />
    </Suspense>
  );
}
