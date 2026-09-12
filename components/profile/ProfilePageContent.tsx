'use client';

import ProfileShell from '@/components/profile/ProfileShell';

export default function ProfilePageContent() {
  return (
    <main className="min-h-screen bg-white pb-24">
      <div className="mx-auto max-w-5xl px-6 pt-16 sm:px-8 xl:px-12">
        <ProfileShell />
      </div>
    </main>
  );
}
