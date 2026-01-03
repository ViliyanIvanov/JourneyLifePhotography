import { createMetadata } from '@/lib/seo';
import { HomeHeroSection } from '@/components/sections/home-hero-section';
import { FeaturedAlbumsSection } from '@/components/sections/featured-albums-section';
import { ServicesPreviewSection } from '@/components/sections/services-preview-section';
import { ReadyToCaptureSection } from '@/components/sections/ready-to-capture-section';
import { mockAlbums, mockServices } from '@/content/mock-data';

export const metadata = createMetadata({
  title: 'Home',
  description:
    'Professional photography services capturing life\'s precious moments. Specializing in weddings, portraits, pets, and corporate photography.',
});

export default function HomePage() {
  const featuredAlbums = mockAlbums.slice(0, 3);
  const featuredServices = mockServices.slice(0, 3);

  return (
    <main>
      <HomeHeroSection />
      <FeaturedAlbumsSection albums={featuredAlbums} />
      <ServicesPreviewSection services={featuredServices} />
      <ReadyToCaptureSection />
    </main>
  );
}

