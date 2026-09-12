import type { StaticImageData } from 'next/image';
import heroLaunch from '@/public/images/gallery/hero-launch.jpg';
import launchVehicle from '@/public/images/gallery/launch-vehicle.jpg';
import spacecraftIntegration from '@/public/images/gallery/spacecraft-integration.jpg';
import brahmosLaunch from '@/public/images/gallery/brahmos-launch.jpg';
import agniLaunch from '@/public/images/gallery/agni-launch.jpg';
import navyDestroyers from '@/public/images/gallery/navy-destroyers.jpg';
import researchLab from '@/public/images/gallery/research-lab.jpg';

export const galleryCategories = [
  'Indian Missiles',
  'Launch Vehicles',
  'Satellites',
  'Scientists',
  'Research Centres',
  'Launch Pads',
  'Indian Army',
  'Indian Air Force',
  'Indian Navy',
  'Radar Systems',
  'AI Research',
  'Robotics',
  'Space Missions'
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryImage = {
  slug: string;
  src: StaticImageData;
  alt: string;
  category: GalleryCategory;
  caption: string;
  credit: string;
  license: string;
};

export const galleryImages: GalleryImage[] = [
  {
    slug: 'hero-launch',
    src: heroLaunch,
    alt: 'GSLV Mk III lifting off from the launch pad with a bright exhaust plume',
    category: 'Launch Vehicles',
    caption: 'GSLV Mk III lift-off carrying the Chandrayaan-2 spacecraft.',
    credit: 'Indian Space Research Organisation (ISRO)',
    license: 'GODL-India'
  },
  {
    slug: 'launch-vehicle',
    src: launchVehicle,
    alt: 'GSLV Mk III launch vehicle ascending shortly after lift-off',
    category: 'Space Missions',
    caption: 'GSLV Mk III ascent during the Chandrayaan-2 mission.',
    credit: 'Indian Space Research Organisation (ISRO)',
    license: 'GODL-India'
  },
  {
    slug: 'spacecraft-integration',
    src: spacecraftIntegration,
    alt: 'Vikram lander being hoisted for integration inside the Vehicle Assembly Building',
    category: 'Satellites',
    caption: 'Vikram lander hoisted for integration ahead of launch.',
    credit: 'Indian Space Research Organisation (ISRO)',
    license: 'GODL-India'
  },
  {
    slug: 'brahmos-launch',
    src: brahmosLaunch,
    alt: 'BrahMos supersonic cruise missile launching from the Integrated Test Range, Chandipur',
    category: 'Indian Missiles',
    caption: 'BrahMos supersonic cruise missile test-fired from the Integrated Test Range, Chandipur.',
    credit: 'Ministry of Defence, Government of India',
    license: 'GODL-India'
  },
  {
    slug: 'agni-launch',
    src: agniLaunch,
    alt: 'Agni-I ballistic missile launching during a user trial',
    category: 'Indian Missiles',
    caption: 'Agni-I ballistic missile during a strategic forces user trial.',
    credit: 'Press Information Bureau, Government of India',
    license: 'GODL-India'
  },
  {
    slug: 'navy-destroyers',
    src: navyDestroyers,
    alt: 'Indian Navy destroyers sailing together during a fleet exercise',
    category: 'Indian Navy',
    caption: 'Indian Navy destroyers sailing in formation during Exercise TROPEX.',
    credit: 'Press Information Bureau, Government of India',
    license: 'GODL-India'
  },
  {
    slug: 'research-lab',
    src: researchLab,
    alt: 'Officials visiting the Semiconductor Laboratory of the Department of Space',
    category: 'Research Centres',
    caption: 'A visit to the Semiconductor Laboratory, Department of Space.',
    credit: 'Department of Space, Government of India',
    license: 'GODL-India'
  }
];
