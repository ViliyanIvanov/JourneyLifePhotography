import { createMetadata } from '@/lib/seo';
import { HomeHeroSection } from '@/components/sections/home-hero-section';
import { ServicesSectionCompact } from '@/components/sections/services-section-compact';
import { ServicesProcessSection } from '@/components/sections/services-process-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ReadyToCaptureSection } from '@/components/sections/ready-to-capture-section';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';

export const metadata = createMetadata({
  title: 'Home',
  description:
    'Iva Dimitrov Photography — professional wedding, family, travel, architecture, and branding photography. Capturing life\'s precious moments with elegance and artistry.',
});

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
          itemOffered: { '@type': 'Service', name: 'Family Photography' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Corporate Photography' },
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
  return (
    <main>
      <JsonLd />
      <AtmosphereBackground
        photoUrl="/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg"
        darkness={88}
      />
      <div className="relative z-[1]">
        <HomeHeroSection />
        <ServicesSectionCompact />
        <ServicesProcessSection />
        <TestimonialsSection />
        <ReadyToCaptureSection />
        <FaqSection />
      </div>
    </main>
  );
}
