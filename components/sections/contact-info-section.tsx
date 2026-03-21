'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/section-shell';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { ContactForm } from '@/components/forms/contact-form';
import { mockServices } from '@/content/mock-data';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const services = mockServices.slice(0, 3);

const SERVICE_TAGLINES: Record<string, string> = {
  'Wedding Photography': 'Your love story, beautifully told',
  'Family Photography': 'Moments that grow with you',
  'Corporate Photography': 'Professional imagery for your brand',
};

export function ContactInfoSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleCardClick = (title: string) => {
    setSelectedService((prev) => (prev === title ? null : title));
  };

  return (
    <>
      {/* Service Picker */}
      <SectionShell padding="sm" background="black">
        {/* Desktop: 3-col grid / Mobile: horizontal scroll strip */}
        <ScrollAnimation direction="up">
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-6">
            {services.map((service, i) => {
              const isActive = selectedService === service.title;
              return (
                <button
                  key={service.id}
                  onClick={() => handleCardClick(service.title)}
                  className={`group relative rounded-xl overflow-hidden h-[200px] transition-all duration-500 border-2 text-left ${
                    isActive
                      ? 'border-brand-accent/50 shadow-[0_0_24px_rgba(176,204,209,0.15)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 33vw"
                  />
                  {/* Gradient overlay — darker when inactive */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
                        : 'bg-gradient-to-t from-black/90 via-black/60 to-black/40'
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <h3 className="font-serif text-lg font-bold text-brand-white mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-brand-white/50 text-xs">
                      {SERVICE_TAGLINES[service.title] ?? service.tagline}
                    </p>
                  </div>
                  {/* Active check indicator */}
                  {isActive && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-accent/90 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile: horizontal scroll strip */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide mb-6">
            {services.map((service) => {
              const isActive = selectedService === service.title;
              return (
                <button
                  key={service.id}
                  onClick={() => handleCardClick(service.title)}
                  className={`group relative flex-shrink-0 min-w-[280px] snap-start rounded-xl overflow-hidden h-[180px] transition-all duration-500 border-2 text-left ${
                    isActive
                      ? 'border-brand-accent/50 shadow-[0_0_24px_rgba(176,204,209,0.15)]'
                      : 'border-white/10'
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
                        : 'bg-gradient-to-t from-black/90 via-black/60 to-black/40'
                    }`}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <h3 className="font-serif text-base font-bold text-brand-white mb-0.5">
                      {service.title}
                    </h3>
                    <p className="text-brand-white/50 text-xs">
                      {SERVICE_TAGLINES[service.title] ?? service.tagline}
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-accent/90 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explore link */}
          <div className="text-center mb-2">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-brand-white/40 hover:text-brand-accent transition-colors duration-300 text-sm group/link"
            >
              Not sure yet? Explore our services
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
            </Link>
          </div>
        </ScrollAnimation>
      </SectionShell>

      {/* Form */}
      <SectionShell padding="sm" background="black">
        <ScrollAnimation direction="up">
          <div className="max-w-2xl mx-auto">
            <ContactForm selectedService={selectedService ?? undefined} />
          </div>
        </ScrollAnimation>
      </SectionShell>

      {/* Contact details row */}
      <SectionShell padding="sm" background="black">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-brand-white/50 text-sm">
          <a
            href="mailto:info@ivadimitrovphotography.com"
            className="flex items-center gap-2 hover:text-brand-accent transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            info@ivadimitrovphotography.com
          </a>
          <a
            href="tel:+447907977441"
            className="flex items-center gap-2 hover:text-brand-accent transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            +44 7907 977441
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Available throughout the UK
          </span>
        </div>
      </SectionShell>
    </>
  );
}
