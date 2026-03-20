'use client';

import { useState } from 'react';
import { mockServices, type Service } from '@/content/mock-data';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Button } from '@/components/ui/button';
import { QuoteRequestModal } from '@/components/forms/quote-request-modal';
import Image from 'next/image';

// Tiny 4x5 transparent placeholder — keeps layout stable while image loads
const BLUR_PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjUiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4=';

function ServiceShowcaseBlock({ service, index }: { service: Service; index: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <>
      <ScrollAnimation direction={isReversed ? 'right' : 'left'} delay={100}>
        <div
          id={service.slug}
          className={`scroll-mt-24 flex flex-col gap-10 md:gap-14 lg:gap-20 items-center ${
            isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Image */}
          <div className="w-full md:w-5/12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                {...(index === 0 ? { priority: true } : {})}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-7/12">
            <div className="mb-4 h-px w-10 bg-brand-accent" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white mb-3 leading-tight tracking-tight">
              {service.title}
            </h2>
            <p className="text-brand-accent text-sm font-medium uppercase tracking-widest mb-6">
              {service.tagline}
            </p>
            <p className="text-brand-white/60 text-base leading-relaxed mb-8 max-w-lg">
              {service.description}
            </p>

            <ul className="space-y-3 mb-10">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-brand-white/75">
                  <span className="mt-0.5 text-brand-accent shrink-0">—</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button onClick={() => setModalOpen(true)} size="lg">
              Request a Quote
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

export function ServicesShowcase() {
  return (
    <div className="py-32 md:py-40">
      <Container>
        <div className="space-y-24 md:space-y-32">
          {mockServices.map((service, index) => (
            <ServiceShowcaseBlock key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}
