'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Play } from 'lucide-react';

export type VideoSource = {
  src: string;
  type?: string;
  /** CSS media query — lets the browser pick the right resolution per viewport, e.g. "(min-width: 1024px)" for a 4K desktop cut. */
  media?: string;
};

export type VideoHeroProps = {
  sources: VideoSource[];
  poster: StaticImageData | string;
  posterAlt: string;
  priority?: boolean;
  className?: string;
  videoClassName?: string;
  /** Poster-first, user-initiated playback with native controls — for documentary/process footage (WCAG 2.2.2 exempt, no autoplay). */
  interactive?: boolean;
  /** Duration shown on the play affordance, e.g. "0:22". */
  durationLabel?: string;
};

export default function VideoHero({ sources, poster, posterAlt, priority = false, className = '', videoClassName = '', interactive = false, durationLabel }: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (priority || shouldLoad) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  // Interactive mode moves no bytes until the visitor asks for the video.
  const attemptVideo = interactive
    ? played && sources.length > 0 && !videoFailed
    : shouldLoad && sources.length > 0 && !videoFailed;
  const videoVisible = attemptVideo && videoReady;

  // The play button unmounts on playback — hand focus to the player so keyboard users aren't dropped back to <body>.
  useEffect(() => {
    if (interactive && played) videoRef.current?.focus();
  }, [interactive, played]);

  // No valid poster to anchor `fill` against — bail out instead of handing next/image an empty/undefined src.
  if (!poster) return null;

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Poster stays fully visible until the video actually reports it can play — never hides on a mere load attempt, so a missing/404 source never leaves a black gap. */}
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority={priority}
        sizes="100vw"
        placeholder={typeof poster === 'string' ? undefined : 'blur'}
        className={`object-cover transition-opacity duration-700 ${videoVisible ? 'opacity-0' : 'opacity-100'}`}
      />
      {interactive && !played && (
        <button
          type="button"
          onClick={() => setPlayed(true)}
          aria-label={`Play video${durationLabel ? ` (${durationLabel})` : ''}`}
          className="group absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#E67300] shadow-[0_18px_45px_rgba(230,115,0,0.38)] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:bg-[#CF5F00] group-hover:shadow-[0_24px_58px_rgba(230,115,0,0.46)] group-active:scale-95 group-focus-visible:outline group-focus-visible:outline-4 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#E67300]/50">
            <Play className="ml-0.5 h-7 w-7 fill-white text-white" aria-hidden="true" />
          </span>
          {durationLabel && (
            <span className="rounded-full bg-[#06182e]/85 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur-sm">
              {durationLabel}
            </span>
          )}
        </button>
      )}
      {attemptVideo && (
        <video
          ref={videoRef}
          tabIndex={-1}
          autoPlay
          muted={!interactive}
          loop={!interactive}
          playsInline
          preload="auto"
          controls={interactive}
          disablePictureInPicture
          disableRemotePlayback
          controlsList={interactive ? undefined : 'nodownload nofullscreen noremoteplayback'}
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            // Interactive: return to the poster so the visitor can retry. Autoplay: settle on the poster permanently.
            if (interactive) setPlayed(false);
            else setVideoFailed(true);
          }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoVisible ? 'opacity-100' : 'opacity-0'} ${videoClassName}`}
          aria-hidden={interactive ? undefined : 'true'}
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type ?? 'video/mp4'} media={source.media} />
          ))}
        </video>
      )}
    </div>
  );
}
