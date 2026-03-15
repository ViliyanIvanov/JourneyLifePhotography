import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { ServicesQuickNav } from '@/app/services/services-quick-nav';
import { ServicesShowcase } from '@/app/services/services-showcase';
import { ServicesProcessSection } from '@/components/sections/services-process-section';

export const metadata = createMetadata({
  title: 'Services',
  description:
    'Professional photography services — weddings, family portraits, and corporate photography. Request a personalised quote today.',
});

const ATMOSPHERE_PHOTO =
  '/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg';

export default function ServicesPage() {
  return (
    <>
      <AtmosphereBackground photoUrl={ATMOSPHERE_PHOTO} />
      <div className="relative z-[1]">
        <PageHeader
          title="Our Services"
          description="Every story deserves to be told beautifully. Explore our photography services and request a personalised quote — no fixed prices, just a package tailored to you."
          className="bg-transparent"
        />
        <main>
          <ServicesQuickNav />
          <ServicesShowcase />
          <ServicesProcessSection />
        </main>
      </div>
    </>
  );
}
