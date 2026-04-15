'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockServices, type Service } from '@/content/mock-data';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { Button } from '@/components/ui/button';
import { QuoteRequestModal } from '@/components/forms/quote-request-modal';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const AUTO_PLAY_MS = 5000;

/** Per-service image positioning tweaks */
const IMAGE_POSITION: Record<string, string> = {
  'wedding': 'center 30%',
  'family': 'center 40%',
};

/** Short labels for mobile tabs */
const TAB_LABELS: Record<string, string> = {
  'Wedding Photography': 'Wedding',
  'Family Photography': 'Family',
  'Corporate Photography': 'Corporate',
  'Sporting Events': 'Sports',
};

export function ServicesSectionCompact() {
  const services = mockServices;
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Direction: 1 = forward, -1 = backward (for slide direction)
  const [direction, setDirection] = useState(1);
  // Unique key that changes every switch to re-trigger mount animations
  const [transitionKey, setTransitionKey] = useState(0);
  // progressKey resets the CSS fill animation whenever the slide changes
  const [progressKey, setProgressKey] = useState(0);

  const activeService = services[activeIndex];

  const goTo = useCallback(
    (next: number, dir?: number) => {
      if (next === activeIndex) return;
      setDirection(dir ?? (next > activeIndex ? 1 : -1));
      setActiveIndex(next);
      setTransitionKey((k) => k + 1);
      setProgressKey((k) => k + 1);
    },
    [activeIndex],
  );

  // Auto-rotate via CSS animation end callback (no rAF loop)
  const handleProgressEnd = useCallback(() => {
    if (isPaused || modalOpen) return;
    const next = (activeIndex + 1) % services.length;
    goTo(next, 1);
  }, [activeIndex, isPaused, modalOpen, services.length, goTo]);

  // Reset progress bar when paused/unpaused
  useEffect(() => {
    setProgressKey((k) => k + 1);
  }, [isPaused, modalOpen]);

  const handleTabClick = (i: number) => {
    goTo(i);
  };

  // Slide transform based on direction
  const slideFrom = direction > 0 ? 'translate-x-[60px]' : 'translate-x-[-60px]';

  return (
    <section
      className="relative py-16 md:py-24 bg-transparent overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        {/* Header — centered */}
        <ScrollAnimation direction="fade">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-5 leading-tight tracking-tight">
              <SplitText text="What We Offer" delay={60} className="inline" />
            </h2>
            <p className="text-brand-white/55 text-lg leading-relaxed">
              Every project is unique. Tell me about yours and I&apos;ll craft a
              personalised quote tailored to your vision.
            </p>
          </div>
        </ScrollAnimation>

        {/* Tab bar */}
        <ScrollAnimation direction="up" delay={100}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-1 rounded-xl bg-brand-white/[0.04] border border-brand-white/[0.06] p-1.5">
              {services.map((service, i) => (
                <button
                  key={service.id}
                  onClick={() => handleTabClick(i)}
                  className={`relative px-3 md:px-4 py-2.5 font-medium tracking-wide transition-colors duration-300 rounded-lg whitespace-nowrap ${
                    i === activeIndex
                      ? 'text-brand-white'
                      : 'text-brand-white/40 hover:text-brand-white/60'
                  }`}
                >
                  {/* Mobile: short label / Desktop: full title */}
                  <span className="relative z-10 text-xs md:text-sm md:hidden">
                    {TAB_LABELS[service.title] ?? service.title}
                  </span>
                  <span className="relative z-10 text-sm hidden md:inline">
                    {service.title}
                  </span>

                  {/* Active indicator — progress bar that fills over 5s via CSS animation */}
                  {i === activeIndex && (
                    <span className="absolute inset-x-2 bottom-0.5 h-0.5 rounded-full bg-brand-white/10 overflow-hidden">
                      <span
                        key={progressKey}
                        className="absolute inset-y-0 left-0 bg-brand-accent rounded-full"
                        style={{
                          animation: isPaused || modalOpen ? 'none' : `indicator-fill ${AUTO_PLAY_MS}ms linear forwards`,
                        }}
                        onAnimationEnd={handleProgressEnd}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimation>

        {/* Active service card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div
            key={transitionKey}
            className=""
            style={{
              animation: `svc-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both`,
            }}
          >
            <div className="rounded-2xl border border-brand-white/[0.06] bg-brand-white/[0.03] overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Image with reveal */}
                <div
                  className="relative w-full md:w-[40%] aspect-[4/3] md:aspect-auto md:min-h-[360px] shrink-0 overflow-hidden"
                  style={{
                    animation: `svc-img-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both`,
                  }}
                >
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    style={{
                      objectPosition: IMAGE_POSITION[activeService.slug] ?? 'center top',
                      animation: `svc-img-zoom 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both`,
                    }}
                  />
                  {/* Accent glow on image edge */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-brand-black/40 hidden md:block" />
                </div>

                {/* Text content with staggered entrance */}
                <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 flex-1">
                  <h3
                    className="font-serif text-2xl md:text-3xl font-bold text-brand-white tracking-tight mb-2"
                    style={{
                      animation: `svc-text-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both`,
                    }}
                  >
                    {activeService.title}
                  </h3>
                  <p
                    className="text-brand-accent/80 text-sm font-medium uppercase tracking-widest mb-4"
                    style={{
                      animation: `svc-text-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.22s both`,
                    }}
                  >
                    {activeService.tagline}
                  </p>

                  {/* Divider — draws in */}
                  <div
                    className="h-px w-full bg-gradient-to-r from-brand-accent/30 via-brand-accent/10 to-transparent mb-5 origin-left"
                    style={{
                      animation: `svc-line-draw 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both`,
                    }}
                  />

                  {/* Features — staggered */}
                  <ul className="space-y-2 mb-6">
                    {activeService.features.slice(0, 5).map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-brand-white/70"
                        style={{
                          animation: `svc-text-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) ${0.32 + i * 0.06}s both`,
                        }}
                      >
                        <span className="text-brand-accent/60 shrink-0 mt-0.5">
                          —
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div
                    style={{
                      animation: `svc-text-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both`,
                    }}
                  >
                    <Button size="sm" onClick={() => setModalOpen(true)}>
                      Get a Quote
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer link */}
        <ScrollAnimation direction="fade" effect="float" delay={300}>
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

      <QuoteRequestModal
        service={activeService}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {/* Keyframe animations — injected once */}
      <style jsx global>{`
        @keyframes svc-card-in {
          from {
            opacity: 0;
            transform: ${slideFrom} scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes svc-img-reveal {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        @keyframes svc-img-zoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }
        @keyframes svc-text-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes svc-line-draw {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
