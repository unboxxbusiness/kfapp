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

  // Permanent 301 redirects to recover SEO equity from legacy URLs
  async redirects() {
    return [
      // 1. Legacy Course Directories -> Modern Category Hubs
      { source: '/courses', destination: '/categories', permanent: true },
      { source: '/courses/btech', destination: '/category/engineering-btech', permanent: true },
      { source: '/courses/bhm', destination: '/category/hospitality-hotel-management-bhm', permanent: true },
      { source: '/courses/mbbs', destination: '/categories', permanent: true },
      { source: '/colleges/bhm-colleges-pune-5-10-lakh-cuet', destination: '/category/hospitality-hotel-management-bhm', permanent: true },

      // 2. Legacy City Hubs -> Active City Hubs
      { source: '/cities', destination: '/category/city-wise-courses', permanent: true },
      { source: '/cities/hyderabad', destination: '/category/colleges-in-hyderabad', permanent: true },

      // 3. Comparison & Tools
      { source: '/compare', destination: '/tools/roi-calculator', permanent: true },

      // 4. Legacy Blog & News Hubs
      { source: '/education-news', destination: '/', permanent: true },
      { source: '/university-admissions', destination: '/category/admission-guide', permanent: true },
      { source: '/future-skills', destination: '/category/career-guides', permanent: true },
      { source: '/topics/ai', destination: '/category/computer-applications-bca-mca', permanent: true },

      // 5. Legal & Company
      { source: '/cookie-policy', destination: '/privacy', permanent: true },
      { source: '/unsubscribe', destination: '/contact', permanent: true },
      { source: '/author/:slug*', destination: '/about', permanent: true },

      // 6. Deleted / Seed Article Redirects (Resolves Soft 404s)
      {
        source: '/articles/typescript-in-react-a-complete-beginners-tutorial-to-build-type-safe-apps',
        destination: '/',
        permanent: true,
      },
      {
        source: '/articles/bca-vs-btech-cs-in-2026-career-scope-salaries-placement-guide',
        destination: '/category/computer-applications-bca-mca',
        permanent: true,
      },
      {
        source: '/articles/neet-ug-2026-nta-releases-new-eligibility-exam-guidelines',
        destination: '/category/admission-guide',
        permanent: true,
      },
      {
        source: '/articles/amity-vs-sharda-university-admissions-2026-fees-placements-admission-process-selection-verdict',
        destination: '/category/colleges-in-delhi-ncr',
        permanent: true,
      },

      // 7. Legacy Lead Gen Base
      { source: '/apply', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
