/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      // Laravel/API running on localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/manobseba-api/public/**',
      },

      // Localhost with Next.js port
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },

      // Laravel running on 127.0.0.1:8000
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },

      // Production HTTPS domains
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    minimumCacheTTL: 60,
  },
}

export default nextConfig
