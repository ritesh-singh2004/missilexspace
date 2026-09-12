import type { Metadata } from 'next';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import GalleryPageBanner from '@/components/gallery/GalleryPageBanner';

export const metadata: Metadata = {
  title: 'Gallery',
  description: "Curated imagery from India's space and defence research programs — launches, spacecraft integration, and research facilities, reproduced under GODL-India with attribution.",
  alternates: { canonical: '/gallery' },
  openGraph: { title: 'Gallery', description: "Curated imagery from India's space and defence research programs.", url: '/gallery' }
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f7faff] text-slate-900 selection:bg-[#E67300] selection:text-white">
      <GalleryPageBanner />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <GalleryBrowser />
      </div>
    </main>
  );
}
