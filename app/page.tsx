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
        {/* Atmosphere — pure CSS gradient, zero GPU filter cost */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
          {/* Subtle warm tonal variation using radial gradients only — replaces the
              blur-[60px]+scale-125 image which was the biggest paint bottleneck */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(196,137,138,0.04)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(196,137,138,0.025)_0%,transparent_60%)]" />
          {/* Fine grain texture — smaller tile is cheaper to repeat */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'g\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23g)\'/%3E%3C/svg%3E")',
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
