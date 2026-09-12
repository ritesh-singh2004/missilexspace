import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { assertClerkEnv } from '@/lib/env';

// Establishes Clerk's auth context for every request. Actual route protection
// happens per-resource in each protected segment's layout.tsx via auth.protect() —
// Clerk's current guidance over centralized middleware path-matching.
const handler = clerkMiddleware();

export default async function middleware(...args: Parameters<typeof handler>) {
  try {
    assertClerkEnv();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.next();
    }
    // Surfaces a specific, actionable cause in Vercel's Function Logs instead of
    // a bare MIDDLEWARE_INVOCATION_FAILED with no context.
    console.error(error instanceof Error ? error.message : error);
    return new NextResponse('Server misconfiguration: see Function Logs for details.', { status: 500 });
  }

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
