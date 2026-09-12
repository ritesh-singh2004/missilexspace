import type { Metadata } from 'next';
import FeedbackPageContent from '@/components/feedback/FeedbackPageContent';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share comments, bug reports, or suggestions about the MissileX research portal.',
  alternates: { canonical: '/feedback' }
};

export default function FeedbackPage() {
  return <FeedbackPageContent />;
}
