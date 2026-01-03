import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { AboutIntroSection } from '@/components/sections/about-intro-section';
import { AboutValuesSection } from '@/components/sections/about-values-section';
import { AboutEquipmentSection } from '@/components/sections/about-equipment-section';
import { AboutCtaSection } from '@/components/sections/about-cta-section';

export const metadata = createMetadata({
  title: 'About',
  description:
    'Learn about Journey Life Photography and our passion for capturing life\'s precious moments.',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Capturing life's precious moments with passion and expertise"
      />
      <main>
        <AboutIntroSection />
        <AboutValuesSection />
        <AboutEquipmentSection />
        <AboutCtaSection />
      </main>
    </>
  );
}

