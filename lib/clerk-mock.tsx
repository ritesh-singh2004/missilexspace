'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle2, ShieldCheck, LogOut, Sparkles, Radar, ChevronDown } from 'lucide-react';

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  primaryEmailAddress: { emailAddress: string };
  emailAddresses: Array<{ emailAddress: string }>;
  imageUrl: string;
  role?: string;
}

const DEFAULT_USER: MockUser = {
  id: 'user_dev_123',
  firstName: 'Admin',
  lastName: 'Researcher',
  fullName: 'Admin Researcher',
  username: 'admin',
  primaryEmailAddress: { emailAddress: 'admin@missilex.in' },
  emailAddresses: [{ emailAddress: 'admin@missilex.in' }],
  imageUrl: '',
  role: 'Principal Investigator · Level-2 Clearance'
};

const STORAGE_KEY = 'mrs_auth_user';
const SIGNED_IN_KEY = 'mrs_signed_in';
const AUTH_EVENT = 'mrs_auth_changed';

interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: MockUser | null;
  signIn: (email?: string, name?: string) => void;
  signOut: (options?: { redirectUrl?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoaded: false,
  isSignedIn: false,
  user: null,
  signIn: () => {},
  signOut: async () => {}
});

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<MockUser | null>(null);

  const syncState = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const signedInVal = localStorage.getItem(SIGNED_IN_KEY);
      if (signedInVal === 'true') {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        const u = storedUser ? JSON.parse(storedUser) : DEFAULT_USER;
        setIsSignedIn(true);
        setUser(u);
        document.cookie = `${SIGNED_IN_KEY}=true; path=/; max-age=31536000; SameSite=Lax`;
      } else {
        setIsSignedIn(false);
        setUser(null);
        document.cookie = `${SIGNED_IN_KEY}=false; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {
      setIsSignedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncState();
    setIsLoaded(true);

    const handleAuthChange = () => syncState();
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [syncState]);

  const signIn = useCallback((email?: string, name?: string) => {
    const newUser: MockUser = {
      ...DEFAULT_USER,
      fullName: name || DEFAULT_USER.fullName,
      firstName: (name || DEFAULT_USER.fullName).split(' ')[0] || 'Admin',
      lastName: (name || DEFAULT_USER.fullName).split(' ')[1] || 'Researcher',
      primaryEmailAddress: { emailAddress: email || DEFAULT_USER.primaryEmailAddress.emailAddress },
      emailAddresses: [{ emailAddress: email || DEFAULT_USER.primaryEmailAddress.emailAddress }]
    };

    localStorage.setItem(SIGNED_IN_KEY, 'true');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    document.cookie = `${SIGNED_IN_KEY}=true; path=/; max-age=31536000; SameSite=Lax`;
    setIsSignedIn(true);
    setUser(newUser);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const signOut = useCallback(async (options?: { redirectUrl?: string }) => {
    localStorage.setItem(SIGNED_IN_KEY, 'false');
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `${SIGNED_IN_KEY}=false; path=/; max-age=31536000; SameSite=Lax`;
    setIsSignedIn(false);
    setUser(null);
    window.dispatchEvent(new Event(AUTH_EVENT));

    const target = options?.redirectUrl || '/login';
    window.location.href = target;
  }, []);

  return (
    <AuthContext.Provider value={{ isLoaded, isSignedIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  return {
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn,
    user: context.user as any
  };
}

export function useClerk() {
  const context = useContext(AuthContext);
  return {
    signOut: context.signOut,
    openSignIn: () => { window.location.href = '/login'; },
    openSignUp: () => { window.location.href = '/register'; },
    user: context.user,
    session: context.isSignedIn ? { id: 'sess_dev_123', status: 'active' } : null
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  return {
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn,
    userId: context.isSignedIn ? (context.user?.id ?? 'user_dev_123') : null,
    sessionId: context.isSignedIn ? 'sess_dev_123' : null,
    signOut: context.signOut
  };
}

export function useSession() {
  const context = useContext(AuthContext);
  return {
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn,
    session: context.isSignedIn ? { id: 'sess_dev_123', user: context.user } : null
  };
}

export function SignIn({
  fallbackRedirectUrl = '/dashboard',
  signUpUrl = '/register'
}: {
  fallbackRedirectUrl?: string;
  signUpUrl?: string;
  [key: string]: any;
}) {
  const { isSignedIn, user, signIn, signOut } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(email, 'Admin Researcher');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(fallbackRedirectUrl);
      }, 400);
    }, 500);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      signIn('researcher@gmail.com', 'Researcher User');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(fallbackRedirectUrl);
      }, 400);
    }, 400);
  };

  if (isSignedIn && user) {
    return (
      <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-6 text-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">You are signed in</p>
            </div>
            <p className="text-sm font-bold text-slate-950 mt-0.5">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          You are currently signed in. You can proceed to your dashboard or sign out.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href={fallbackRedirectUrl}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-isroBlue px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-isroBlueDark active:scale-[0.98]"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => signOut({ redirectUrl: '/login' })}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-[0.98]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200/80" /></div>
        <span className="relative bg-white px-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
          OR
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Email ID
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">Password</label>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact support at missilexrocketspace@gmail.com'); }} className="text-[11px] font-semibold text-isroBlue hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-10 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-isroBlue focus:ring-isroBlue/20"
        />
        <label htmlFor="remember-me" className="text-xs text-slate-600">
          Remember me
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || success}
        className="w-full rounded-xl bg-isroBlue hover:bg-isroBlueDark text-xs font-bold uppercase tracking-wider text-white py-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting...</span>
          </>
        ) : success ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Signed In</span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </button>

      <div className="text-center pt-2 text-xs text-slate-500">
        Don&apos;t have an account?{' '}
        <Link href={signUpUrl} className="font-bold text-isroBlue hover:text-isroBlueDark hover:underline transition">
          Register
        </Link>
      </div>
    </form>
  );
}

export function SignUp({
  fallbackRedirectUrl = '/dashboard',
  signInUrl = '/login'
}: {
  fallbackRedirectUrl?: string;
  signInUrl?: string;
  [key: string]: any;
}) {
  const { isSignedIn, user, signIn, signOut } = useContext(AuthContext);
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('researcher');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email || 'candidate@gmail.com', fullName || 'New User');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(fallbackRedirectUrl);
      }, 400);
    }, 500);
  };

  const handleGoogleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      signIn('user@gmail.com', 'Google User');
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(fallbackRedirectUrl);
      }, 400);
    }, 400);
  };

  if (isSignedIn && user) {
    return (
      <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/50 p-6 text-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">You are signed in</p>
            </div>
            <p className="text-sm font-bold text-slate-950 mt-0.5">{user.fullName}</p>
            <p className="text-xs text-slate-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          You are currently signed in. To register a new account, please sign out first.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href={fallbackRedirectUrl}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-isroBlue px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-isroBlueDark active:scale-[0.98]"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => signOut({ redirectUrl: '/register' })}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-xs transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 active:scale-[0.98]"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-800">
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 px-4 text-xs font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 active:scale-[0.98] disabled:opacity-60"
      >
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200/80" /></div>
        <span className="relative bg-white px-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
          OR
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Email ID
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email ID"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-4 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Role / Department
        </label>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none appearance-none"
          >
            <option value="researcher">Research &amp; Development</option>
            <option value="aerospace">Aerospace Engineering</option>
            <option value="software">Software &amp; Telemetry</option>
            <option value="student">Student / Academic Fellow</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-10 py-2.5 text-xs text-slate-900 transition focus:border-isroBlue focus:bg-white focus:ring-4 focus:ring-isroBlue/10 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2.5 pt-1">
        <input
          type="checkbox"
          id="terms-consent"
          required
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-isroBlue focus:ring-isroBlue/20"
        />
        <label htmlFor="terms-consent" className="text-xs text-slate-600 leading-snug">
          I agree to the Terms of Service and Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || success}
        className="w-full rounded-xl bg-isroBlue hover:bg-isroBlueDark text-xs font-bold uppercase tracking-wider text-white py-3 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Submitting...</span>
          </>
        ) : success ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Registered</span>
          </>
        ) : (
          <span>Submit</span>
        )}
      </button>

      <div className="text-center pt-2 text-xs text-slate-500">
        Already have an account?{' '}
        <Link href={signInUrl} className="font-bold text-isroBlue hover:text-isroBlueDark hover:underline transition">
          Sign In
        </Link>
      </div>
    </form>
  );
}

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useContext(AuthContext);
  if (!isSignedIn) return null;
  return <>{children}</>;
}

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useContext(AuthContext);
  if (isSignedIn) return null;
  return <>{children}</>;
}

export function UserButton() {
  const { user, isSignedIn, signOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  if (!isSignedIn || !user) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-isroBlue text-xs font-bold text-white shadow-sm ring-2 ring-white hover:ring-isroBlue/30 transition"
      >
        {(user.fullName || 'Admin').charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
            <p className="text-[11px] text-slate-500 truncate">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-isroBlue"
            >
              Telemetry Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-isroBlue"
            >
              Cadre Profile
            </Link>
          </div>
          <div className="pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ redirectUrl: '/login' });
              }}
              className="w-full text-left rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center justify-between"
            >
              <span>Sign Out</span>
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

