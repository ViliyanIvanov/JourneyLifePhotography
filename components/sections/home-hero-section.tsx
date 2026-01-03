import { Container } from '@/components/layout/container';
import { NavAnchor } from '@/components/layout/nav-anchor';
import { Button } from '@/components/ui/button';
import { Overlay } from '@/components/ui/overlay';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import Link from 'next/link';

const LOGO_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8AAADq6ur6+vry8vLm5uZ3d3fv7+/39/ejo6O4uLjh4eHZ2dmysrLBwcFOTk6dnZ3T09OCgoJvb2/Nzc2NjY2srKwbGxtGRkZBQUE6OjrHx8eTk5NjY2NpaWkSEhJWVlYsLCwzMzOBQE+xAAACeUlEQVRoge2Xi67iIBCGh0sp5abQi9UWrb7/Qx5aaTWbdTfZQ5M9CX9jAMUPOswwAJCVlZWVlZX1c0U6uxu6uCDk9mGX6IQQ6veBKzTrxHeBywWOZGzipPDiCT8+WzVqUsLxEz6FasNChdUJ4fwJR6HazqU7JITDC14t9vkxcBLhfIWndPnoLbOXLPD2nBBuI1xEOEs58zd4t3jLHvAKQC8238MsLYCYy/GSEK4iPATmMJf3lDNf4VO0OUo587grohA7fk94vRucrRbaAy5W+IOkg+Nf4TeaHj5uL1Gkh183uNgFXmyxmhrO5iPMIp8e7rZ0ekoHXxN0WNC3jJcY3u0BX81i9oCbSLQbPGEqukZ4ucFZMva6nT9ggyfzc3KK8OEF14nYxR29z3YZ6TafonlZfhNtXYwfFE+2Gt0C/OR9H4bpp+9sjzHv38ZLvBER9UBv+lbWeIbPeTqZ+EV0+dulPx+utZN//PffpIa610BfmQcLhTlPmIn+f9nfmxC/XEI2/+x+ugatwIZBdEEVqEIbCw1UBhquhdIWvD4UmCqii0EY2pWgNB0EAQOFlqUEO4D5AOeuNr5xwKruXqCi7UblDINuAC+vlnUSWDlpYUffTKZvDs3Z1gYfupEiJY6XpqJs1J+2HR4O3qJqgXV9K9t+FLWiiEDXAJP94BwGxqypWbgTjfKKQ8dWEXnoZeWc6Z3yrQP0yW62PbqJXNtjZ7zS2oUH/GwtzeQR3DgAoyAaeXSjDz/4keHJCW8qplgXbKeBwcf9suXL1RsDB8rDh+ASwmKGgpLQDAsbWpyQpRtd7ulk7lFS4CEU5j6Q8LiUlZWVlZWVlfWmL0AoHblqE3RAAAAAAElFTkSuQmCC';

const BACKGROUND_IMAGE_URL = '/hero.png';

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
        <div className="absolute inset-0 bg-black/40" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.60)_58%,rgba(0,0,0,0.92)_100%)]" />
        {/* subtle center lift so the logo reads cleanly */}
        <div className="absolute left-1/2 top-1/2 h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        {/* gentle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      </div>

      <Container className="relative">
        {/* Centered, wide, minimal */}
        <div className="flex min-h-screen items-center justify-center pb-20 pt-28">
          <div className="w-full max-w-6xl px-4 text-center">
            <ScrollAnimation direction="fade" delay={80}>
              {/* Small editorial line (luxury detail, not “extra UI”) */}
              <div className="mb-7 flex items-center justify-center gap-4 text-[11px] tracking-[0.34em] text-white/65">
                <span className="h-px w-10 bg-white/15" />
                <span>BOUDOIR • MATERNITY • PORTRAITS</span>
                <span className="h-px w-10 bg-white/15" />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="fade" delay={140}>
              {/* Logo front-and-center */}
              <div className="flex justify-center">
                <img
                  src={LOGO_DATA_URL}
                  alt="Journey Life Photography"
                  className="h-auto w-[92px] opacity-95 drop-shadow-[0_18px_55px_rgba(0,0,0,0.70)] sm:w-[110px] lg:w-[120px]"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="fade" delay={200}>
              {/* Minimal modern statement */}
              <div className="mx-auto mt-8 max-w-3xl text-balance text-white/90">
                <div className="text-[44px] leading-[0.95] tracking-[-0.04em] sm:text-[58px] lg:text-[48px]">
                  A journey shaped by light.
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={260}>
              {/* Minimal CTAs */}
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button size="lg">Portfolio</Button>
              <Button size="lg" variant="secondary">Book</Button>

              </div>
            </ScrollAnimation>
          </div>
        </div>
      </Container>

      <NavAnchor desktopVh={90} mobileVh={87} />
    </Overlay>
  );
}
