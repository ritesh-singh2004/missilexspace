'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith('/#') &&
        !href.includes('#') &&
        target.getAttribute('target') !== '_blank'
      ) {
        if (href !== pathname) {
          setLoading(true);
          setProgress(30);
          setTimeout(() => setProgress(70), 120);
          setTimeout(() => setProgress(90), 350);
        }
      }
    };

    document.addEventListener('click', handleLinkClick, { capture: true });
    return () => document.removeEventListener('click', handleLinkClick, { capture: true });
  }, [pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[9999] h-[3px] pointer-events-none overflow-hidden"
    >
      <div
        className="h-full bg-gradient-to-r from-isroBlue via-[#E67300] to-amber-400 shadow-[0_0_12px_rgba(230,115,0,0.8)] transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionProperty: 'width, opacity'
        }}
      />
    </div>
  );
}
