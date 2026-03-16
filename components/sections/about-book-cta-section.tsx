'use client';

import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { MagneticHover } from '@/components/ui/magnetic-hover';
import Link from 'next/link';

export function AboutBookCtaSection() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent">
      {/* Top accent gradient divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #C4898A 50%, transparent)',
          opacity: '0.2',
        }}
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation direction="up" delay={100}>
            <Heading as="h2" size="xl" className="mb-6">
              Let&apos;s Create Something Beautiful
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={250}>
            <Text size="lg" muted className="mb-12 leading-relaxed">
              Whether it&apos;s a milestone, a love story, or simply a moment worth
              remembering — I&apos;d love to hear your vision and bring it to life.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={400} effect="float">
            <MagneticHover className="inline-block">
              <Button asChild size="lg">
                <Link href="/contact">Book a Session</Link>
              </Button>
            </MagneticHover>
          </ScrollAnimation>
        </div>
      </Container>
    </section>
  );
}
