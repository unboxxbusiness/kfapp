import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Kampus Filter — Student College Discovery & Guides',
    short_name: 'Kampus Filter',
    description:
      'India’s network for BBA, MBA, Engineering & BCA college discovery. Compare fee structures, placement reports, and transparent insights.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#14213d',
    icons: [
      {
        src: 'https://res.cloudinary.com/dhrigocvd/image/upload/v1769405440/apple-touch-icon_j72dso.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
