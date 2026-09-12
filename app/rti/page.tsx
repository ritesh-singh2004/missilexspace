import type { Metadata } from 'next';
import RtiPageContent from '@/components/rti/RtiPageContent';

export const metadata: Metadata = {
  title: 'Right to Information',
  description: "MissileX's voluntary transparency and information-access policy.",
  alternates: { canonical: '/rti' }
};

export default function RtiPage() {
  return <RtiPageContent />;
}
