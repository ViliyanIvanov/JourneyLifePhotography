import { siteUrl } from './seo';

export function createWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Iva Dimitrov Photography',
    url: siteUrl,
  };
}

export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Iva Dimitrov Photography',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@ivadimitrovphotography.com',
    },
  };
}

export function createPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Iva Dimitrov',
    jobTitle: 'Professional Photographer',
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
  };
}

export function createArticleSchema(post: {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  updatedAt?: string;
  featuredImage?: { webUrl?: string; thumbUrl?: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Iva Dimitrov',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Iva Dimitrov Photography',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    ...(post.featuredImage?.webUrl || post.featuredImage?.thumbUrl
      ? { image: post.featuredImage.webUrl || post.featuredImage.thumbUrl }
      : {}),
  };
}

export function createImageGallerySchema(album: {
  title: string;
  slug: string;
  description?: string;
  images: { url: string; alt: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: album.title,
    description: album.description,
    url: `${siteUrl}/portfolio/${album.slug}`,
    image: album.images.slice(0, 10).map((img) => ({
      '@type': 'ImageObject',
      contentUrl: img.url.startsWith('http') ? img.url : `${siteUrl}${img.url}`,
      name: img.alt,
    })),
  };
}

export function createBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}
