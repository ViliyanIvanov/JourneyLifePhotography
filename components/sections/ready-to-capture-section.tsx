import { Container } from '@/components/layout/container';
import { Overlay } from '@/components/ui/overlay';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';

const STATS = [
  { value: '500+', label: 'Sessions' },
  { value: '50+', label: 'Weddings' },
  { value: '8+', label: 'Years Experience' },
];

export function ReadyToCaptureSection() {
  return (
    <Overlay
      imageUrl="/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg"
      gradient="subtle"
      className="min-h-[80vh] py-40 md:py-56 flex items-center"
    >
      {/* Floating decorations */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <div
          className="deco-line animate-float"
          style={{ top: '20%', right: '10%', height: '70px', animationDelay: '0s' }}
        />
        <div
          className="deco-dot animate-pulse-glow"
          style={{ top: '65%', left: '8%', animationDelay: '1.5s' }}
        />
        <div
          className="deco-line animate-float-slow"
          style={{ top: '45%', left: '5%', height: '50px', animationDelay: '0.8s' }}
        />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation direction="up" delay={100}>
            <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
              Ready to Capture Your Story?
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={300}>
            <Text size="lg" className="mb-12 text-brand-white/80 leading-relaxed">
              Let&apos;s discuss your vision and create something extraordinary together. Your moments deserve to be preserved with elegance and care.
            </Text>
          </ScrollAnimation>

          {/* Stats row */}
          <ScrollAnimation direction="up" delay={400}>
            <div className="mb-14 flex items-center justify-center gap-8 md:gap-12">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-3xl font-bold text-brand-white md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs tracking-wider text-brand-white/50 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={500}>
            <Button asChild size="lg">
              <Link href="/contact">Start a Conversation</Link>
            </Button>
          </ScrollAnimation>
        </div>
      </Container>
    </Overlay>
  );
}
