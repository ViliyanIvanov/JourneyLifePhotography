import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Link from 'next/link';

const BACKGROUND_IMAGE_URL = '/JourneyLifePhotos/Hero.jpg';

export function HomeHeroSection() {
  return (
    <section className="sticky top-0 h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
      />

      {/* Luxury tint/legibility overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.30)_58%,rgba(0,0,0,0.60)_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' fill=\'white\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      <Container className="relative z-10 h-full">
        <div className="flex h-full items-center justify-center pb-20 pt-28">
          <div className="w-full max-w-6xl px-4 text-center">
            <ScrollAnimation direction="fade" delay={140}>
              <div className="flex justify-center">
                <img
                  src="/logo.png"
                  alt="Iva Dimitrov Photography"
                  className="h-auto w-[220px] opacity-95 drop-shadow-[0_18px_55px_rgba(0,0,0,0.70)] sm:w-[280px] lg:w-[320px]"
                />
              </div>
            </ScrollAnimation>

            <div className="mx-auto mt-8 mb-4 max-w-3xl text-balance text-white/90">
              <SplitText
                text="Bespoke story-led photography"
                delay={200}
                className="text-[44px] leading-[1.18] tracking-[-0.04em] sm:text-[58px] lg:text-[48px]"
              />
            </div>

            <ScrollAnimation direction="up" delay={260}>
              <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button asChild size="lg">
                  <Link href="/portfolio">Portfolio</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Book</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </Container>
    </section>
  );
}
