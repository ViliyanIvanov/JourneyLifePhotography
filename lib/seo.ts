import { Metadata } from 'next';
import { env } from './env';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  path?: string;
  type?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
  };
}

const defaultTitle = 'Iva Dimitrov Photography';
const defaultDescription =
  "Professional photography services capturing life's precious moments. Specializing in weddings, portraits, pets, and corporate photography.";

export const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export function createMetadata({
  title,
  description,
  image,
  noindex = false,
  nofollow = false,
  canonical,
  path,
  type = 'website',
  article,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  const pageUrl = `${siteUrl}${path || ''}`;

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonical || pageUrl,
    },
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
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: pageUrl,
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
      type,
      ...(type === 'article' && article
        ? {
            article: {
              publishedTime: article.publishedTime,
              modifiedTime: article.modifiedTime,
              authors: article.authors,
            },
          }
        : {}),
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

