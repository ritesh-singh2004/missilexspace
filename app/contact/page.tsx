import type { Metadata } from 'next';
import ContactSection from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Submit your research interest, program inquiry, or collaboration request to the MissileX research leadership team.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact', description: 'Connect with the research leadership team.', url: '/contact' }
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ContactSection />
      </div>
    </main>
  );
}
