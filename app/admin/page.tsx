import type { Metadata } from 'next';
import AdminPageContent from '@/components/admin/AdminPageContent';

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Administrative tools for managing users, project approvals, and news & gallery content.',
  alternates: { canonical: '/admin' },
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return <AdminPageContent />;
}
