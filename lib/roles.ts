export type SiteRole = 'Admin' | 'Researcher' | 'Student' | 'Guest';

export function deriveRole(email: string | null | undefined): SiteRole {
  if (!email) return 'Guest';
  const address = email.toLowerCase();

  if (address.includes('admin') || address.includes('@missilex.in')) {
    return 'Admin';
  }

  if (address.includes('research') || address.includes('@lab.')) {
    return 'Researcher';
  }

  if (address.includes('student') || address.includes('@student.')) {
    return 'Student';
  }

  return 'Guest';
}
