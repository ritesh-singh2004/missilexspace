'use client';

import DashboardShell from '@/components/dashboard/DashboardShell';

export default function DashboardPageContent() {
  return (
    <main className="min-h-screen bg-white pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-8 xl:px-12">
        <DashboardShell />
      </div>
    </main>
  );
}
