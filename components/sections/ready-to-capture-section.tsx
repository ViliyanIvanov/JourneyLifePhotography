'use client';

import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

import { MagneticHover } from '@/components/ui/magnetic-hover';
import Link from 'next/link';


export function ReadyToCaptureSection() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent">
      {/* Top divider */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, #C4898A 50%, transparent)',
          opacity: '0.2',
        }}
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation direction="left" effect="blur" delay={100}>
            <Heading as="h2" size="4xl" className="mb-6 font-serif tracking-tight">
              Ready to Capture Your Story?
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={250}>
            <Text size="lg" className="mb-10 text-brand-white/80 leading-relaxed">
              Let&apos;s discuss your vision and create something extraordinary together. Your moments deserve to be preserved with elegance and care.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={400} effect="float">
            <MagneticHover className="inline-block">
              <Button asChild size="lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </MagneticHover>
          </ScrollAnimation>
        </div>
      </Container>
    </section>
  );
}
