'use client';

import { useState } from 'react';
import { mockServices, type Service } from '@/content/mock-data';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Button } from '@/components/ui/button';
import { QuoteRequestModal } from '@/components/forms/quote-request-modal';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ScrollAnimation direction="up" delay={index * 120}>
        <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[420px] md:h-[480px]">
          {/* Background image */}
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Dimming overlay — darkens more on hover */}
          <div className="absolute inset-0 bg-brand-black/50 transition-all duration-500 group-hover:bg-brand-black/70" />

          {/* Glass border overlay */}
          <div className="absolute inset-0 rounded-2xl border border-brand-white/[0.06] transition-all duration-500 group-hover:border-brand-accent/30 group-hover:shadow-[0_0_24px_rgba(196,137,138,0.3)]" />

          {/* Content container */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
            {/* Title + tagline — always visible */}
            <div className="relative z-10">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-white tracking-tight mb-2 transition-transform duration-500 group-hover:-translate-y-2">
                {service.title}
              </h3>
              <p className="text-brand-accent/80 text-sm font-medium uppercase tracking-widest mb-1 transition-transform duration-500 group-hover:-translate-y-2">
                {service.tagline}
              </p>
            </div>

            {/* Reveal content — features + CTA */}
            <div className="relative z-10 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-4">
              <div className="h-px w-full bg-gradient-to-r from-brand-accent/30 via-brand-accent/10 to-transparent mb-4" />

              <ul className="space-y-1.5 mb-5">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-white/70">
                    <span className="text-brand-accent/60 shrink-0 mt-0.5">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
              >
                Get a Quote
              </Button>
            </div>
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

export function ServicesSectionCompact() {
  const services = mockServices.slice(0, 3);

  return (
    <section className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      <Container>
        {/* Header */}
        <ScrollAnimation direction="fade">
          <div className="mb-14 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-5 leading-tight tracking-tight">
              <SplitText text="What We Offer" delay={60} className="inline" />
            </h2>
            <p className="text-brand-white/55 text-lg max-w-xl leading-relaxed">
              Every project is unique. Tell me about yours and I&apos;ll craft a personalised quote tailored to your vision.
            </p>
          </div>
        </ScrollAnimation>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <ScrollAnimation direction="up" delay={300}>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-brand-white/60 hover:text-brand-accent transition-colors duration-300 text-sm tracking-wide group/link"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
