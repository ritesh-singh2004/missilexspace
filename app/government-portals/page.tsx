import type { Metadata } from 'next';
import GovPortalsPageContent from '@/components/govPortals/GovPortalsPageContent';

export const metadata: Metadata = {
  title: 'Government Defence & Space Portals',
  description: "Official portals of India's defence and space organisations — ISRO, DRDO, the armed forces, and allied bodies.",
  alternates: { canonical: '/government-portals' }
};

export default function GovernmentPortalsPage() {
  return <GovPortalsPageContent />;
}
