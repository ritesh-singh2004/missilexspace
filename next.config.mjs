import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@clerk/nextjs/server': path.resolve(__dirname, 'lib/clerk-mock-server.ts'),
      '@clerk/nextjs': path.resolve(__dirname, 'lib/clerk-mock.tsx')
    };
    return config;
  }
};

export default nextConfig;
