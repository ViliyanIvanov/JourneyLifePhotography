import { Metadata } from 'next';
import { env } from './env';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultTitle = 'Iva Dimitrov Photography';
const defaultDescription =
  "Professional photography services capturing life's precious moments. Specializing in weddings, portraits, pets, and corporate photography.";

export function createMetadata({
  title,
  description,
  image,
  noindex = false,
  nofollow = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const siteUrl = env.NEXT_PUBLIC_SITE_URL;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(siteUrl),
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon-57x57.png', sizes: '57x57' },
        { url: '/apple-icon-60x60.png', sizes: '60x60' },
        { url: '/apple-icon-72x72.png', sizes: '72x72' },
        { url: '/apple-icon-76x76.png', sizes: '76x76' },
        { url: '/apple-icon-114x114.png', sizes: '114x114' },
        { url: '/apple-icon-120x120.png', sizes: '120x120' },
        { url: '/apple-icon-144x144.png', sizes: '144x144' },
        { url: '/apple-icon-152x152.png', sizes: '152x152' },
        { url: '/apple-icon-180x180.png', sizes: '180x180' },
      ],
    },
    manifest: '/manifest.json',
    other: {
      'msapplication-TileColor': '#0A0A0A',
      'msapplication-TileImage': '/ms-icon-144x144.png',
    },
    themeColor: '#0A0A0A',
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: siteUrl,
      siteName: defaultTitle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
      },
    },
  };
}

