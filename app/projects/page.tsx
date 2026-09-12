import type { Metadata } from 'next';
import ProjectsPageContent from '@/components/projects/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'My Projects',
  description: 'Track the research projects you have submitted to MissileX.',
  alternates: { canonical: '/projects' },
  robots: { index: false, follow: false }
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
