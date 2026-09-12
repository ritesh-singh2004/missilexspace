'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Rocket, Satellite, Crosshair } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { galleryImages } from '@/lib/gallery';
import VideoHero from '@/components/hero/VideoHero';
import HeroBackgroundEffects from '@/components/hero/HeroBackgroundEffects';
import LaunchCountdown from '@/components/hero/LaunchCountdown';
import HeroVideoModal from '@/components/hero/HeroVideoModal';
import { rocketLaunchVideoSources } from '@/lib/hero-video';

const heroImage = galleryImages.find((image) => image.slug === 'hero-launch') ?? galleryImages[0];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const handler = () => setReduced(query.matches);
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export default function HeroSection() {
  const { t } = useTranslation('home');
  const [watchOpen, setWatchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reducedMotion]);

  const heroHeight = sectionRef.current?.offsetHeight ?? 1;
  const scrollProgress = Math.min(scrollY / heroHeight, 1);
  const videoTranslate = reducedMotion ? 0 : scrollProgress * -60;
  const overlayOpacity = 0.62 + scrollProgress * 0.24;

  const quickLinks = [
    { label: t('hero.missileSystems'), href: '/missiles', icon: Crosshair },
    { label: t('hero.launchVehicles'), href: '/rockets', icon: Rocket },
    { label: t('hero.researchPortal'), href: '/research', icon: Satellite }
  ];

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#02121f]">
      {/* Scroll parallax wrapper: the video pans slowly upward as you scroll, reading as continued ascent */}
      <div
        className="absolute inset-0 h-[112%]"
        style={{ transform: `translateY(${videoTranslate}px)`, transition: reducedMotion ? undefined : 'transform 0.05s linear' }}
      >
        <VideoHero sources={rocketLaunchVideoSources} poster={heroImage.src} posterAlt={t('hero.imageAlt')} priority videoClassName="will-change-transform" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#02121f] via-[#03192b]/70 to-[#02121f]" style={{ opacity: overlayOpacity }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      <HeroBackgroundEffects />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-6 py-28 text-center sm:px-8 xl:px-12">
        <p className="hero-fade-up inline-flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
          {t('hero.govBadge')}
        </p>

        <h1
          className="hero-fade-up max-w-4xl text-4xl font-bold uppercase leading-[1.05] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.1s' }}
        >
          {t('hero.orgName')}
        </h1>

        <p className="hero-fade-up max-w-2xl text-base leading-8 text-white/80 sm:text-lg" style={{ animationDelay: '0.2s' }}>
          {t('hero.subtitle')}
        </p>

        <div className="hero-fade-up flex flex-col items-center gap-4 pt-2 sm:flex-row" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/research"
            className="inline-flex items-center justify-center gap-2 bg-signal px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-signalDark"
          >
            {t('hero.exploreResearch')} <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setWatchOpen(true)}
            className="inline-flex items-center justify-center gap-2 border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            <Play className="h-4 w-4" /> {t('hero.watchLaunch')}
          </button>
        </div>

        <div className="hero-fade-up flex flex-wrap items-center justify-center gap-3 pt-1" style={{ animationDelay: '0.4s' }}>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-white/75 transition hover:border-white/40 hover:text-white"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hero-fade-up w-full pt-4" style={{ animationDelay: '0.5s' }}>
          <LaunchCountdown />
        </div>
      </div>

      {watchOpen && <HeroVideoModal sources={rocketLaunchVideoSources} onClose={() => setWatchOpen(false)} />}
    </section>
  );
}
