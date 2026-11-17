import type { VideoSource } from '@/components/hero/VideoHero';
import type { StaticImageData } from 'next/image';
import designRender from '@/public/images/rockets/design-render.jpg';

/**
 * Shipped cut: OpenRocket design walkthrough — 22.5s, 1916×458 (4.18:1),
 * faststart H.264, ~10.2MB. Single source; `VideoHero` degrades to the poster on failure.
 */
export const rocketLaunchVideoSources: VideoSource[] = [
  { src: '/videos/rocket-launch.mp4', type: 'video/mp4' }
];

/** Poster frame — aspect-matched to the video (4.178 vs 4.183), static import for blur placeholder. */
export const designRenderPoster: StaticImageData = designRender;
