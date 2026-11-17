import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

// Establishes the auth context for every request (mock Clerk — next.config.mjs
// aliases @clerk/nextjs to lib/clerk-mock*, so no Clerk keys are ever required).
// Actual route protection happens per-resource in each protected segment's layout.tsx via auth.protect() —
// Clerk's current guidance over centralized middleware path-matching.
const handler = clerkMiddleware();

export default async function middleware(...args: Parameters<typeof handler>) {
  try {
    return await handler(...args);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    throw error;
  }
}

export const config = {
  matcher: ['/((?!_next|videos|images|.*\\..*).*)', '/(api|trpc)(.*)']
};
