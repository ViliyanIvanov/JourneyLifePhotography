'use client';

import { useState } from 'react';
import { Service } from '@/content/mock-data';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { QuoteRequestModal } from '@/components/forms/quote-request-modal';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesPreviewSectionProps {
  services: Service[];
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <>
      <ScrollAnimation direction="up" delay={100}>
        <div
          className={`flex flex-col gap-8 md:gap-12 lg:gap-16 items-center ${
            isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2">
            <div className="mb-4 h-px w-10 bg-brand-accent" />
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-3 leading-tight tracking-tight">
              {service.title}
            </h3>
            <p className="text-brand-accent text-sm font-medium uppercase tracking-widest mb-5">
              {service.tagline}
            </p>
            <p className="text-brand-white/60 text-base leading-relaxed mb-8">
              {service.description}
            </p>

            <ul className="space-y-3 mb-8">
              {service.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-brand-white/75">
                  <span className="mt-0.5 text-brand-accent shrink-0">—</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button onClick={() => setModalOpen(true)} size="lg">
              Get a Quote
            </Button>
          </div>
        </div>
      </ScrollAnimation>

      <QuoteRequestModal
        service={service}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}

export function ServicesPreviewSection({ services }: ServicesPreviewSectionProps) {
  return (
    <section className="relative bg-brand-black py-32 md:py-48 overflow-hidden">
      {/* Subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(176,204,209,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 md:px-8 relative">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0}>
          <div className="mb-20 md:mb-28">
            <div className="mb-5 h-px w-12 bg-brand-accent" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-5 leading-tight tracking-tight">
              <SplitText text="Our Services" delay={60} className="inline" />
            </h2>
            <p className="text-brand-white/55 text-lg max-w-xl leading-relaxed">
              Every project is unique. Tell me about yours and I&apos;ll craft a personalised quote tailored to your vision.
            </p>
          </div>
        </ScrollAnimation>

        {/* Alternating service blocks */}
        <div className="space-y-24 md:space-y-32 mb-20">
          {services.map((service, i) => (
            <ServiceBlock key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA */}
        <ScrollAnimation direction="up" delay={200}>
          <div className="text-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
