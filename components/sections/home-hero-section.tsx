import { Container } from '@/components/layout/container';
import { NavAnchor } from '@/components/layout/nav-anchor';
import { Button } from '@/components/ui/button';
import { Overlay } from '@/components/ui/overlay';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import Link from 'next/link';

const BACKGROUND_IMAGE_URL = '/JourneyLifePhotos/Hero.jpg';

export function HomeHeroSection() {
  return (
    <Overlay
      imageUrl={BACKGROUND_IMAGE_URL}
      gradient="default"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Luxury tint/legibility (works even if BG is empty) */}
      <div className="pointer-events-none absolute inset-0">
        {/* base darkening */}
        <div className="absolute inset-0 bg-black/20" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.30)_58%,rgba(0,0,0,0.60)_100%)]" />
        {/* subtle center lift so the logo reads cleanly */}
        <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        {/* gentle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <Container className="relative">
        {/* Centered, wide, minimal */}
        <div className="flex min-h-screen items-center justify-center pb-20 pt-28">
          <div className="w-full max-w-6xl px-4 text-center">
            <ScrollAnimation direction="fade" delay={140}>
              {/* Logo front-and-center */}
              <div className="flex justify-center">
                <img
                  src="/logo.png"
                  alt="Iva Dimitrov Photography"
                  className="h-auto w-[160px] opacity-95 drop-shadow-[0_18px_55px_rgba(0,0,0,0.70)] sm:w-[200px] lg:w-[240px]"
                />
              </div>
            </ScrollAnimation>

            {/* Minimal modern statement */}
            <div className="mx-auto mt-8 mb-4 max-w-3xl text-balance text-white/90">
              <SplitText
                text="Bespoke story-led photography"
                delay={200}
                className="text-[44px] leading-[1.18] tracking-[-0.04em] sm:text-[58px] lg:text-[48px]"
              />
            </div>

            <ScrollAnimation direction="up" delay={260}>
              {/* Minimal CTAs */}
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

      <NavAnchor desktopVh={90} mobileVh={87} />
    </Overlay>
  );
}


