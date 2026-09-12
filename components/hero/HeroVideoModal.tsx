'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoSource } from '@/components/hero/VideoHero';

export default function HeroVideoModal({ sources, onClose }: { sources: VideoSource[]; onClose: () => void }) {
  const { t } = useTranslation('home');
  const [failed, setFailed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 sm:p-10" role="dialog" aria-modal="true" aria-label={t('hero.watchLaunch')}>
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="aspect-video w-full max-w-4xl border border-white/15 bg-black">
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-semibold text-white">{t('hero.footageComingTitle')}</p>
            <p className="max-w-sm text-xs leading-6 text-white/60">{t('hero.footageComingBody')}</p>
          </div>
        ) : (
          <video controls autoPlay playsInline className="h-full w-full" onError={() => setFailed(true)}>
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type ?? 'video/mp4'} />
            ))}
          </video>
        )}
      </div>
    </div>
  );
}
