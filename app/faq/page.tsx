import type { Metadata } from 'next';
import FaqPageContent from '@/components/faq/FaqPageContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about the MissileX research portal, programmes, submissions, and accounts.',
  alternates: { canonical: '/faq' }
};

export default function FaqPage() {
  return <FaqPageContent />;
}
