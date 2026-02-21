import { createMetadata } from '@/lib/seo';
import { HomeHeroSection } from '@/components/sections/home-hero-section';
import { FeaturedAlbumsSection } from '@/components/sections/featured-albums-section';
import { ServicesPreviewSection } from '@/components/sections/services-preview-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ReadyToCaptureSection } from '@/components/sections/ready-to-capture-section';
import { mockServices } from '@/content/mock-data';
import { albumsData, getImageUrl, getFullImageUrl } from '@/content/albums-data';
import { CarouselAlbum } from '@/components/carousel/album-carousel';

export const metadata = createMetadata({
  title: 'Home',
  description:
    'Iva Dimitrov Photography — professional wedding, family, travel, architecture, and branding photography. Capturing life\'s precious moments with elegance and artistry.',
});

// Select 5 albums (1 per category) for the carousel
const CAROUSEL_ALBUM_IDS = [
  'wedding-1',
  'children-family',
  'travel',
  'architecture-interiors',
  'branding',
];

function getCarouselAlbums(): CarouselAlbum[] {
  return CAROUSEL_ALBUM_IDS.map((id) => {
    const album = albumsData.find((a) => a.id === id);
    if (!album) throw new Error(`Album ${id} not found`);
    return {
      slug: album.slug,
      title: album.title,
      category: album.category,
      coverImage: getImageUrl(album.coverImagePath),
      fullImage: getFullImageUrl(album.coverImagePath),
      imageCount: album.imageCount,
    };
  });
}

// JSON-LD structured data
function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Iva Dimitrov Photography',
    description:
      'Professional photography services specializing in weddings, family portraits, travel, architecture, and branding photography.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://journeylifephotography.com',
    image: '/JourneyLifePhotos/Hero.jpg',
    priceRange: '$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Wedding Photography' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Family & Children Photography' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Travel Photography' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Architecture & Interiors Photography' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Branding Photography' },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  const carouselAlbums = getCarouselAlbums();
  const featuredServices = mockServices.slice(0, 3);

  return (
    <main>
      <JsonLd />
      <HomeHeroSection />
      <FeaturedAlbumsSection albums={carouselAlbums} />
      <ServicesPreviewSection services={featuredServices} />
      <TestimonialsSection />
      <ReadyToCaptureSection />
    </main>
  );
}
