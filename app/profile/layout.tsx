import { auth } from '@clerk/nextjs/server';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  await auth.protect({ unauthenticatedUrl: '/login' });
  return children;
}
