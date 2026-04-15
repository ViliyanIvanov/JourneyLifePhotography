'use client';

import Image from 'next/image';
import { SectionShell } from '@/components/ui/section-shell';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { TiltCard } from '@/components/ui/tilt-card';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function AboutMeetSection() {
  return (
    <SectionShell background="transparent" padding="lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Portrait */}
        <div className="md:col-span-5">
          <ScrollAnimation direction="left">
            <TiltCard maxTilt={4}>
              <div className="relative rounded-xl overflow-hidden border border-brand-white/[0.08] shadow-[0_0_60px_rgba(176,204,209,0.12)]">
                <Image
                  src="/IvaDimitrovPhotos/Headshot/DSC07273 done finished_thumb.jpg"
                  alt="Iva Dimitrov — photographer"
                  width={600}
                  height={800}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </TiltCard>
            {/* Thin accent line */}
            <div className="mt-6 mx-auto h-px w-16 bg-brand-accent/40" />
          </ScrollAnimation>
        </div>

        {/* Bio */}
        <div className="md:col-span-7">
          <ScrollAnimation direction="right">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-accent mb-4">
              Meet Iva
            </p>
          </ScrollAnimation>

          <ScrollAnimation direction="right" delay={100}>
            <Heading as="h2" size="xl" className="mb-6">
              The Heart Behind Every Frame
            </Heading>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={200}>
            <Text size="lg" muted className="mb-5">
              I am Iva - a photographer with a deep love for natural light, honest emotion,
              and the quiet moments that tell the biggest stories.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={300}>
            <Text size="lg" muted className="mb-5">
              Photography found me long before I called it a career. What started as curiosity
              with a borrowed camera and desire to capture the precious, fleeing moments of my
              little boy&apos;s life, became a lifelong passion for preserving the feelings people
              carry in their most meaningful moments — a glance, a laugh, the way light falls
              across a room.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={400}>
            <Text size="lg" muted className="mb-5">
              My approach is calm, intentional, and always centred on you. I believe the best
              images happen when people feel comfortable being themselves — so every session
              begins with connection, not posing.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={500}>
            <Text size="lg" muted className="mb-8">
              When I am not behind the lens, I embrace the beautiful chaos of family life and
              motherhood. My background as a trained civil engineer gives me a practical,
              structured perspective, balancing creativity with precision. In my free time, I
              push my limits by participating in endurance events, while travelling gives me the
              chance to discover new places, immerse myself in diverse cultures, and gather
              experiences that shape both my work and my perspective on life.
            </Text>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={600}>
            <p className="font-serif text-xl italic text-brand-white/60">
              — Iva
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </SectionShell>
  );
}
