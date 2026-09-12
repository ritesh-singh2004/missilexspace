import { Suspense } from 'react';
import type { Metadata } from 'next';
import ProgramApplyPageContent from '@/components/programs/ProgramApplyPageContent';

export const metadata: Metadata = {
  title: 'Apply for Global Aerospace Program',
  description: 'Candidate admission portal for global space challenges from ISRO, NASA, ESA, JAXA, and international aerospace firms.',
  alternates: { canonical: '/programs/apply' }
};

export default function ProgramApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f7faff]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-isroBlue border-t-transparent" />
      </div>
    }>
      <ProgramApplyPageContent />
    </Suspense>
  );
}
