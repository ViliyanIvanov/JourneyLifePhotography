import { createMetadata } from '@/lib/seo';
import { AtmosphereBackground } from '@/components/ui/atmosphere-background';
import { Container } from '@/components/layout/container';
import { SplitText } from '@/components/ui/split-text';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
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
        <section className="pt-32 md:pt-40 pb-8 md:pb-12">
          <Container className="text-center">
            <SplitText
              text="Our Services"
              className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-white"
              delay={120}
            />
            <ScrollAnimation direction="up" delay={200}>
              <p className="mt-4 text-brand-white/60 text-base md:text-lg max-w-xl mx-auto font-light">
                Every story deserves to be told beautifully. Explore our
                photography services and request a personalised quote.
              </p>
            </ScrollAnimation>
            <ScrollAnimation direction="fade" delay={400}>
              <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
            </ScrollAnimation>
          </Container>
        </section>
        <main>
          <ServicesQuickNav />
          <ServicesShowcase />
          <ServicesProcessSection />
        </main>
      </div>
    </>
  );
}
