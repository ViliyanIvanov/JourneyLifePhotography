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

