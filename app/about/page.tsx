import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { AboutMeetSection } from '@/components/sections/about-meet-section';
import { AboutBehindLensSection } from '@/components/sections/about-behind-lens-section';
import { AboutBookCtaSection } from '@/components/sections/about-book-cta-section';

export const metadata = createMetadata({
  title: 'About',
  description:
    'The story behind the lens — and the heart that guides every frame.',
});

const ATMOSPHERE_PHOTO =
  '/JourneyLifePhotos/Headshot/DSC07273 done finished_thumb.jpg';

export default function AboutPage() {
  return (
    <>
      <AtmosphereBackground photoUrl={ATMOSPHERE_PHOTO} />
      <div className="relative z-[1]">
        <PageHeader
          title="About"
          description="The story behind the lens — and the heart that guides every frame."
          className="bg-transparent"
        />
        <main>
          <AboutMeetSection />
          <AboutBehindLensSection />
          <AboutBookCtaSection />
        </main>
      </div>
    </>
  );
}
