import { createMetadata } from '@/lib/seo';
import { HomeHeroSection } from '@/components/sections/home-hero-section';
import { ServicesSectionCompact } from '@/components/sections/services-section-compact';
import { ServicesProcessSection } from '@/components/sections/services-process-section';
import { PortfolioShowcaseSection } from '@/components/sections/portfolio-showcase-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { ReadyToCaptureSection } from '@/components/sections/ready-to-capture-section';


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

      {/* Hero — sticky, stays in place while content scrolls over it */}
      <HomeHeroSection />

      {/* Content — slides up over the sticky hero */}
      <div className="relative z-[1] bg-brand-black" style={{ transform: 'translateZ(0)' }}>
        {/* Atmosphere — absolute, scoped to content area only (not covering hero) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 scale-125 blur-[60px] saturate-50"
            style={{
              backgroundImage: `url("${encodeURI('/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg')}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.88)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'512\' height=\'512\' filter=\'url(%23g)\' opacity=\'1\'/%3E%3C/svg%3E")',
              backgroundSize: '256px 256px',
            }}
          />
        </div>

        <div className="relative z-[1]">
          <ServicesSectionCompact />
          <ServicesProcessSection />
          <PortfolioShowcaseSection />
          <TestimonialsSection />
          <ReadyToCaptureSection />
          <FaqSection />
        </div>
      </div>
    </main>
  );
}
