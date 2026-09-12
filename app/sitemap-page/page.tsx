import type { Metadata } from 'next';
import SitemapPageContent from '@/components/sitemap/SitemapPageContent';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'A complete index of pages across the MissileX research portal.',
  alternates: { canonical: '/sitemap-page' }
};

export default function SitemapHtmlPage() {
  return <SitemapPageContent />;
}
