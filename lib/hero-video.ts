import type { VideoSource } from '@/components/hero/VideoHero';

export const rocketLaunchVideoSources: VideoSource[] = [
  { src: '/videos/rocket-launch-4k.mp4', type: 'video/mp4', media: '(min-width: 1024px)' },
  { src: '/videos/rocket-launch-1080p.mp4', type: 'video/mp4', media: '(min-width: 640px)' },
  { src: '/videos/rocket-launch-720p.mp4', type: 'video/mp4' }
];
