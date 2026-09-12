import { NextResponse } from 'next/server';

export function clerkMiddleware() {
  return () => NextResponse.next();
}

const authFn: any = async () => ({
  userId: 'user_dev_123',
  sessionId: 'sess_dev_123',
  protect: async () => {},
  redirectToSignIn: () => {}
});
authFn.protect = async () => {};
export const auth = authFn;

export async function currentUser() {
  return {
    id: 'user_dev_123',
    firstName: 'Admin',
    lastName: 'Researcher',
    emailAddresses: [{ emailAddress: 'admin@missilex.in' }]
  };
}
