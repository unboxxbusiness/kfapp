import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { LeadCaptureModal } from '@/components/lead/LeadCaptureModal';
import { PageTransition } from '@/components/transitions/PageTransition';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { SavedGuidesDrawer } from '@/components/article/SavedGuidesDrawer';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#14213d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kampusfilter.com'),
  title: {
    template: '%s | Kampus Filter',
    default: 'Kampus Filter — Student College Discovery & Comparison Guides',
  },
  description:
    'India’s transparent college discovery network for BBA, MBA, Engineering & BCA aspirants. Researched by Team Kampus Filter with verified fee structures and career metrics.',
  keywords: [
    'BBA colleges in Delhi',
    'MBA college fees and placements',
    'BCA college comparison',
    'College admission guide India 2027',
    'College fee structures',
    'College placement report',
    'Kampus Filter',
    'College comparison portal',
  ],
  authors: [{ name: 'Team Kampus Filter', url: 'https://kampusfilter.com' }],
  creator: 'Kampus Filter',
  publisher: 'Kampus Filter',
  category: 'education',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769405440/apple-touch-icon_j72dso.png',
    apple: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769405440/apple-touch-icon_j72dso.png',
  },
  openGraph: {
    title: 'Kampus Filter — Student College Discovery & Comparison Guides',
    description:
      'Explore transparent college fee breakdowns, placement metrics, and student decision playbooks across top Indian universities.',
    url: 'https://kampusfilter.com',
    siteName: 'Kampus Filter',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
        width: 1200,
        height: 630,
        alt: 'Kampus Filter — Student Decision Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kampusfilter',
    creator: '@kampusfilter',
    title: 'Kampus Filter — Student College Discovery & Comparison Guides',
    description:
      'Explore transparent college fee breakdowns, placement metrics, and student decision playbooks across top Indian universities.',
    images: [
      'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://kampusfilter.com/#organization',
    name: 'Kampus Filter',
    legalName: 'Kampus Filter',
    url: 'https://kampusfilter.com',
    logo: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769401433/logo_Kampus_Filter_gync6j.webp',
    description:
      'Independent student college guidance, fee benchmarking, and university decision network in India.',
    email: 'hello@kampusfilter.com',
    sameAs: [
      'https://www.linkedin.com/company/kampusfilter',
      'https://www.instagram.com/kampus_filter',
      'https://www.youtube.com/@kampusfilter',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://kampusfilter.com/#website',
    url: 'https://kampusfilter.com',
    name: 'Kampus Filter',
    description: 'Student College Discovery & Comparison Guides',
    publisher: {
      '@id': 'https://kampusfilter.com/#organization',
    },
    inLanguage: 'en-IN',
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect for Performance & Core Web Vitals */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://puwswmoppujuaronlaia.supabase.co" />

        {/* Global Organization & WebSite JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-[#14213d] selection:bg-[#fca311] selection:text-[#000000]"
      >
        <PageTransition>{children}</PageTransition>
        <LeadCaptureModal />
        <GlobalSearchModal />
        <SavedGuidesDrawer />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
