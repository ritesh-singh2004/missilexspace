/**
 * Edge-safe environment variable validation. No Node.js built-ins (fs, path,
 * crypto, database clients) — this file is imported by middleware.ts, which
 * runs on Vercel's Edge Runtime, not Node.js.
 */
export function assertClerkEnv() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;
  const missing: string[] = [];

  if (!publishableKey) missing.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
  if (!secretKey) missing.push('CLERK_SECRET_KEY');

  if (missing.length > 0) {
    throw new Error(
      `[Clerk] Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Set these in Vercel -> Project Settings -> Environment Variables for the ' +
        'Production (and Preview, if used) environment, then trigger a new deployment — ' +
        'NEXT_PUBLIC_* variables are baked in at build time, so saving the variable alone ' +
        'does not update an already-built deployment.'
    );
  }

  if (publishableKey && !publishableKey.startsWith('pk_')) {
    throw new Error(
      "[Clerk] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY does not look like a valid Clerk publishable key (should start with 'pk_'). " +
        'Re-copy it from the Clerk Dashboard -> Configure -> API Keys.'
    );
  }

  if (secretKey && !secretKey.startsWith('sk_')) {
    throw new Error(
      "[Clerk] CLERK_SECRET_KEY does not look like a valid Clerk secret key (should start with 'sk_'). " +
        'Re-copy it from the Clerk Dashboard -> Configure -> API Keys.'
    );
  }
}
