'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

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
};

export default function VideoHero({ sources, poster, posterAlt, priority = false, className = '', videoClassName = '' }: VideoHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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

  const attemptVideo = shouldLoad && sources.length > 0 && !videoFailed;
  const videoVisible = attemptVideo && videoReady;

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
      {attemptVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoVisible ? 'opacity-100' : 'opacity-0'} ${videoClassName}`}
          aria-hidden="true"
        >
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type ?? 'video/mp4'} media={source.media} />
          ))}
        </video>
      )}
    </div>
  );
}
