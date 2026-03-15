'use client';

import Image from 'next/image';
import { mockServices } from '@/content/mock-data';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export function ServicesQuickNav() {
  const handleClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-10 pb-0 md:pt-14">
      <Container>
        {/* Mobile: horizontal scroll strip / Desktop: 3-col grid */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {mockServices.map((service, index) => (
            <ScrollAnimation key={service.id} direction="up" delay={index * 80}>
              <button
                onClick={() => handleClick(service.slug)}
                className="group relative min-w-[280px] snap-start overflow-hidden rounded-xl text-left md:min-w-0 md:w-full"
              >
                {/* Photo background */}
                <div className="relative h-[140px] md:h-[200px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />

                  {/* Accent border on hover */}
                  <div className="absolute inset-0 rounded-xl border border-white/10 transition-colors duration-500 group-hover:border-brand-accent/50" />

                  {/* Text overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="font-serif text-lg md:text-xl font-bold text-white leading-tight tracking-tight transition-colors duration-300 group-hover:text-brand-accent">
                      {service.title}
                    </p>
                    <p className="mt-1 text-xs md:text-sm text-white/60 leading-snug">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Subtle arrow indicator */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="translate-y-px">
                      <path d="M7 2v10M7 12l-3-3M7 12l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </button>
            </ScrollAnimation>
          ))}
        </div>
      </Container>
    </div>
  );
}
