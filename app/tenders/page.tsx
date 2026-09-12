import type { Metadata } from 'next';
import TendersPageContent from '@/components/tenders/TendersPageContent';

export const metadata: Metadata = {
  title: 'Tenders & Procurement',
  description: 'Open and recent procurement notices issued by MissileX for research infrastructure and services.',
  alternates: { canonical: '/tenders' }
};

export default function TendersPage() {
  return <TendersPageContent />;
}
