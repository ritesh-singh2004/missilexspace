'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { nextMilestone } from '@/lib/site-data';

function getRemaining(target: number) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

function pad(value: number | undefined) {
  return value === undefined ? '--' : String(value).padStart(2, '0');
}

export default function LaunchCountdown() {
  const { t } = useTranslation('home');
  const target = new Date(nextMilestone.targetDate).getTime();
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    setRemaining(getRemaining(target));
    const interval = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="w-full max-w-md border border-white/15 bg-black/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/15 px-4 py-2.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">{t('countdown.status')}</p>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">{t('countdown.missionLabel')}</p>
          <p className="max-w-[65%] text-right text-xs font-medium leading-4 text-white/85">{t('countdown.nextLaunch')}</p>
        </div>
        <p className="mt-1 text-xs text-white/60">{nextMilestone.title}</p>

        <p className="mt-3 font-mono text-3xl font-semibold tabular-nums tracking-wider text-signal sm:text-4xl">
          T-{pad(remaining?.days)}:{pad(remaining?.hours)}:{pad(remaining?.minutes)}:{pad(remaining?.seconds)}
        </p>
        <div className="mt-1 grid grid-cols-4 text-center text-[10px] uppercase tracking-[0.18em] text-white/45">
          <span>{t('countdown.days')}</span>
          <span>{t('countdown.hours')}</span>
          <span>{t('countdown.minutes')}</span>
          <span>{t('countdown.seconds')}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">{t('countdown.missionControl')}</p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t('countdown.ready')}
          </span>
        </div>
      </div>
    </div>
  );
}
