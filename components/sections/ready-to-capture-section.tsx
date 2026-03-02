'use client';

import { Container } from '@/components/layout/container';
import { Overlay } from '@/components/ui/overlay';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { MagneticHover } from '@/components/ui/magnetic-hover';
import Link from 'next/link';

const STATS = [
  { value: 500, suffix: '+', label: 'Sessions' },
  { value: 50, suffix: '+', label: 'Weddings' },
  { value: 8, suffix: '+', label: 'Years Experience' },
];

export function ReadyToCaptureSection() {
  return (
    <Overlay
      imageUrl="/JourneyLifePhotos/Weddings/Wedding 1/small size/Album cover_thumb.jpg"
      gradient="subtle"
      className="min-h-[80vh] py-40 md:py-56 flex items-center"
    >
      {/* Floating decorations — more prominent */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <div
          className="deco-line animate-float"
          style={{ top: '15%', right: '10%', height: '90px', animationDelay: '0s' }}
        />
        <div
          className="deco-dot animate-pulse-glow"
          style={{ top: '65%', left: '8%', animationDelay: '1.5s', width: '6px', height: '6px', opacity: '0.6' }}
        />
        <div
          className="deco-line animate-float-slow"
          style={{ top: '45%', left: '5%', height: '70px', animationDelay: '0.8s' }}
        />
        <div
          className="deco-line animate-drift"
          style={{ top: '30%', left: '15%', height: '50px', animationDelay: '1.2s' }}
        />
        <div
          className="deco-dot animate-breathe"
          style={{ top: '25%', right: '20%', animationDelay: '0.5s', width: '5px', height: '5px' }}
        />
        <div
          className="deco-line animate-float"
          style={{ bottom: '20%', right: '6%', height: '60px', animationDelay: '2s' }}
        />
      </div>

      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation direction="up" delay={100}>
            <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
              Ready to Capture Your Story?
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={250}>
            <Text size="lg" className="mb-12 text-brand-white/80 leading-relaxed">
              Let&apos;s discuss your vision and create something extraordinary together. Your moments deserve to be preserved with elegance and care.
            </Text>
          </ScrollAnimation>

          {/* Stats row with staggered animated counters */}
          <div className="mb-14 flex items-center justify-center gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <ScrollAnimation key={stat.label} direction="up" delay={350 + i * 150} effect="float">
                <div className="text-center">
                  <div className="font-serif text-3xl font-bold text-brand-white md:text-4xl overflow-hidden">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} />
                  </div>
                  <div className="mt-1 text-xs tracking-wider text-brand-white/50 uppercase">
                    {stat.label}
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation direction="up" delay={700} effect="float">
            <MagneticHover className="inline-block">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </MagneticHover>
          </ScrollAnimation>
        </div>
      </Container>
    </Overlay>
  );
}
