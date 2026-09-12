'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, Info, ShieldCheck } from 'lucide-react';
import type { GalleryImage } from '@/lib/gallery';

export default function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMetadata, setShowMetadata] = useState(true);
  const validImages = images.filter((image) => Boolean(image?.src));
  const active = activeIndex !== null ? validImages[activeIndex] : null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const show = (delta: number) => {
    if (activeIndex === null || validImages.length === 0) return;
    setZoomed(false);
    setActiveIndex((activeIndex + delta + validImages.length) % validImages.length);
  };

  const close = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setActiveIndex(null);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      dialogRef.current?.requestFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    setZoomed(false);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') show(-1);
      if (event.key === 'ArrowRight') show(1);
    };
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [activeIndex, validImages.length]);

  if (validImages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
        <p className="text-sm font-bold text-slate-800">No archival images found in this category.</p>
        <p className="mt-1 text-xs text-slate-500">Select another filter or clear your search.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {validImages.map((image, index) => {
          // Create an authentic, varied masonry rhythm
          const isFeatured = index === 0 || index === 4;
          return (
            <button
              key={image.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B4F9C] ${
                isFeatured ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                priority={index < 3}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Top Gradient & Badge */}
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent p-4 flex items-center justify-between pointer-events-none">
                <span className="rounded-md bg-white/20 px-2.5 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
                  {image.category}
                </span>
                <span className="rounded-md bg-black/40 px-2 py-0.5 font-mono text-[9px] font-semibold text-white/80 backdrop-blur-md">
                  HD MASTER
                </span>
              </div>

              {/* Bottom Scrim & Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-12 text-white pointer-events-none">
                <p className="text-sm font-bold leading-snug drop-shadow-sm text-white line-clamp-2">
                  {image.caption}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-white/70 font-mono">
                  <span>{image.credit}</span>
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">
                    {image.license}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Fullscreen Tactical Lightbox */}
      {active && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          {/* Top Bar Controls */}
          <div className="absolute left-4 top-4 sm:left-8 flex items-center gap-2">
            <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs font-bold text-white border border-white/15">
              {activeIndex! + 1} / {validImages.length}
            </span>
            <span className="rounded-md bg-blue-500/20 px-2.5 py-1 font-mono text-xs font-bold text-blue-300 border border-blue-400/20">
              {active.category}
            </span>
          </div>

          <div className="absolute right-4 top-4 sm:right-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition active:scale-95"
            >
              {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setShowMetadata((m) => !m)}
              aria-label="Toggle metadata"
              className={`rounded-xl border border-white/15 p-2.5 transition active:scale-95 ${
                showMetadata ? 'bg-isroBlue text-white' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-white/80 hover:bg-white/20 hover:text-white transition active:scale-95"
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close archive view"
              className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-white/80 hover:bg-rose-500/80 hover:text-white transition active:scale-95 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => show(-1)}
            aria-label="Previous archival image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-2xl border border-white/15 bg-black/40 p-3 text-white/80 hover:bg-black/70 hover:text-white transition active:scale-95 sm:left-8 backdrop-blur-md"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => show(1)}
            aria-label="Next archival image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-2xl border border-white/15 bg-black/40 p-3 text-white/80 hover:bg-black/70 hover:text-white transition active:scale-95 sm:right-8 backdrop-blur-md"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Canvas Container */}
          <div className="relative flex flex-col items-center justify-center max-h-[85vh] max-w-5xl w-full">
            <div
              onClick={() => setZoomed((z) => !z)}
              className={`relative w-full overflow-auto transition-all rounded-2xl ${
                zoomed ? 'aspect-auto min-h-[120vh] cursor-zoom-out' : 'aspect-[16/10] max-h-[70vh] cursor-zoom-in'
              }`}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Metadata Drawer Bar */}
            {showMetadata && (
              <div className="mt-4 w-full rounded-2xl border border-white/15 bg-black/60 p-4 text-white backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold leading-snug">{active.caption}</p>
                  <p className="mt-1 text-xs text-white/70 font-mono">
                    Credit: {active.credit} · License: {active.license}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Archival
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
