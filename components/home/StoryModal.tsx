'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Shield, Rocket, Radio, Calendar, MapPin, ExternalLink, Compass } from 'lucide-react';
import { galleryImages } from '@/lib/gallery';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stories = [
  {
    id: 'chandrayaan-3',
    title: 'Chandrayaan-3: Historic Lunar Soft Landing',
    category: 'Deep Space Exploration',
    date: '23 August 2023',
    site: 'SDSC SHAR / South Pole, Moon',
    vehicle: 'LVM3-M4 Heavy Lift Vehicle',
    summary: 'India became the fourth nation to soft-land on the lunar surface and the first to touchdown near the lunar southern polar zone at Shiv Shakti Point.',
    image: galleryImages[0].src,
    stats: [
      { label: 'Touchdown Velocity', value: '1.2 m/s' },
      { label: 'Mission Life', value: '1 Lunar Day (14 Days)' },
      { label: 'Payload Suite', value: 'RAMBHA, ChaSTE, ILSA, APXS' }
    ],
    link: '/space-systems'
  },
  {
    id: 'brahmos',
    title: 'BrahMos: Mach 2.8+ Supersonic Precision',
    category: 'Strategic Cruise Missile',
    date: 'Continuous Operational Upgrades',
    site: 'ITR Chandipur / Multi-Platform',
    vehicle: 'Solid Booster + Liquid Ramjet',
    summary: 'The world’s fastest operational supersonic cruise missile, capable of land, sea, sub-sea, and air launch with pinpoint surgical strike precision.',
    image: galleryImages[3].src,
    stats: [
      { label: 'Flight Speed', value: 'Mach 2.8 - 3.0' },
      { label: 'Operational Range', value: '290 - 450+ km' },
      { label: 'Flight Altitude', value: '10m to 15,000m' }
    ],
    link: '/missiles/brahmos'
  },
  {
    id: 'kalam-vision',
    title: 'Vision 2047: Dr. A.P.J. Abdul Kalam’s Legacy',
    category: 'National Strategic Capability',
    date: '1983 - Present',
    site: 'DRDL Hyderabad / Wheeler Island',
    vehicle: 'IGMDP Missile Architectures',
    summary: 'From sounding rockets at Thumba to the Agni and Prithvi missile architectures, Dr. Kalam laid the technological foundations of India’s self-reliant deterrent capability.',
    image: galleryImages[6].src,
    stats: [
      { label: 'Core Framework', value: 'IGMDP (1983)' },
      { label: 'Key Architectures', value: 'Agni, Prithvi, Akash, Nag' },
      { label: 'Doctrine', value: 'Strategic Autonomy' }
    ],
    link: '/apj-abdul-kalam'
  }
];

export default function StoryModal({ isOpen, onClose }: StoryModalProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const story = stories[activeStoryIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            className="relative z-10 flex flex-col max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#091524] text-white shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                  <Radio className="h-4 w-4 animate-pulse" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Archival Briefing</p>
                  <p className="text-sm font-semibold text-white/90">MissileX Mission Records</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/75 transition hover:bg-white/20 hover:text-white active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tab Selector */}
            <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-white/5 p-2 px-6">
              {stories.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveStoryIndex(idx)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    idx === activeStoryIndex
                      ? 'bg-[#E67300] text-white shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${idx === activeStoryIndex ? 'bg-white' : 'bg-white/40'}`} />
                  {item.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="grid flex-1 overflow-y-auto lg:grid-cols-[1.2fr_1fr]">
              {/* Media Visual Area */}
              <div className="relative aspect-[16/10] bg-slate-900 lg:aspect-auto">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-[#091524]/20 to-transparent" />
                
                {/* Simulated Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95">
                    <Play className="h-7 w-7 fill-white ml-1" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-md bg-amber-500/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-950 backdrop-blur-sm">
                    {story.category}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-white drop-shadow-md">
                    {story.vehicle}
                  </p>
                </div>
              </div>

              {/* Information Panel */}
              <div className="flex flex-col justify-between p-6 lg:p-8">
                <div>
                  <h2 id="story-modal-title" className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {story.title}
                  </h2>
                  
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-amber-400" />
                      {story.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      {story.site}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-blue-100/80">
                    {story.summary}
                  </p>

                  {/* Telemetry Metrics */}
                  <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                      Telemetry &amp; Mission Parameters
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 pt-2">
                      {story.stats.map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                          <p className="text-[10px] font-medium text-white/60">{stat.label}</p>
                          <p className="mt-1 text-xs font-bold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={story.link}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E67300] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#ff850b] active:scale-95"
                  >
                    Deep dive in archives <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <span className="text-[11px] text-white/40">Press Esc to exit</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
