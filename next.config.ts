import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disables the 'X-Powered-By: Next.js' header to prevent fingerprinting
  poweredByHeader: false,

  // Strict mode for optimal stability
  reactStrictMode: true,

  // Enable Brotli/Gzip compression
  compress: true,

  // Image optimization with Cloudinary remote pattern & modern AVIF/WebP formats
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  // Tree-shake heavy icon packages
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Application-level security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
