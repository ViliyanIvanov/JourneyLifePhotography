'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SplitText } from '@/components/ui/split-text';

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marco Masi',
    review: 'We are beyond happy with how our photos turned out and would highly recommend Ivayla to anyone looking for high-quality, professional family photography - especially for those with little ones! We\'ll definitely be booking again for any future events or shoots.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Lizzie Paddock',
    review: 'If you\'re looking for a photographer who is not only skilled but also genuinely cares about the task and clients, look no further than Ivayla. I would definitely work with her again and encourage anyone in need of photography services to reach out!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sam Emery',
    review: 'Great photoshoot and photos. Iva was very good with my 2 year old and (teething) 6 months old. The photoshoot was relaxed and my 2 year old loved exploring the props. Iva even got some good photos of my (very unhappy) 6 months old! Will be booking again for another shoot next year!',
    rating: 5,
  },
  {
    id: '4',
    name: 'Mari Marline',
    review: 'Amazing person, you could tell Iva was doing her job with passion and love. She was there for us all the time. Captured all the happiness, amazing moments and laughter during the day. Very patient, organised and professional. I am so grateful I found her and she was there for us in this special day. Thank you and you are now part of our life story forever.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Natalie Pickford',
    review: 'Iva went out of her way to ensure we had a great set of family photos. So many wonderful pictures to cherish, will definitely be booking her again in the future.',
    rating: 5,
  },
];

const TOTAL = testimonials.length;

function AvatarInitial({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const colorIndex = name.charCodeAt(0) % 5;

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
      style={{
        backgroundColor: '#C4898A',
        opacity: 0.8 + (colorIndex * 0.04),
      }}
    >
      <span className="text-white text-sm font-semibold">{initials}</span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-brand-white/20'
          } transition-colors`}
        />
      ))}
    </div>
  );
}

const TestimonialCard = memo(function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative h-full px-3 lg:px-4">
      <div className="relative bg-white/[0.07] border border-white/[0.15] rounded-2xl overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 group-hover:bg-white/[0.10] group-hover:border-brand-accent/30 flex flex-col h-[320px]">
        {/* Top edge highlight */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent flex-shrink-0" />

        <div className="p-6 md:p-7 flex flex-col flex-1">
          {/* Quote mark accent */}
          <div
            className="absolute top-5 right-5 text-5xl font-serif transition-opacity duration-500 group-hover:opacity-[0.35]"
            style={{ color: '#C4898A', opacity: '0.2' }}
          >
            &quot;
          </div>

          {/* Review text */}
          <p className="text-brand-white/80 leading-relaxed mb-auto text-sm relative z-10 line-clamp-6">
            {testimonial.review}
          </p>

          {/* Divider */}
          <div
            className="h-px my-5 flex-shrink-0"
            style={{
              background: `linear-gradient(to right, transparent, #C4898A 50%, transparent)`,
              opacity: '0.3',
            }}
          />

          {/* Footer with avatar, name, and rating */}
          <div className="flex items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <AvatarInitial name={testimonial.name} />
              <p className="font-serif text-brand-white text-sm font-semibold truncate">
                {testimonial.name}
              </p>
            </div>
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>
    </div>
  );
});

/* ─── Responsive visible count ─── */

function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const update = () => setCount(window.innerWidth >= 768 ? 3 : 1);
    update();
    let rafId = 0;
    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);
  return count;
}

/* ─── Infinite carousel ─── */

export function TestimonialsSection() {
  const visibleCount = useVisibleCount();
  const [offset, setOffset] = useState(TOTAL); // start in the "real" middle set
  const [animate, setAnimate] = useState(true);
  // progressKey resets the CSS fill animation whenever the slide changes
  const [progressKey, setProgressKey] = useState(0);

  const extended = useMemo(() => [...testimonials, ...testimonials, ...testimonials], []);

  const realIndex = ((offset % TOTAL) + TOTAL) % TOTAL;

  // After each animated transition, snap back to real range if in clone zone
  const handleTransitionEnd = useCallback(() => {
    if (offset < TOTAL) {
      setAnimate(false);
      setOffset(offset + TOTAL);
    } else if (offset >= TOTAL * 2) {
      setAnimate(false);
      setOffset(offset - TOTAL);
    }
  }, [offset]);

  // Re-enable animation after snap
  useEffect(() => {
    if (!animate) {
      let id: number;
      const reEnable = () => {
        id = requestAnimationFrame(() => {
          setAnimate(true);
        });
      };
      const outer = requestAnimationFrame(reEnable);
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(id);
      };
    }
  }, [animate]);

  const goNext = useCallback(() => setOffset((o) => o + 1), []);
  const goPrev = useCallback(() => setOffset((o) => o - 1), []);

  const goToReal = useCallback(
    (i: number) => {
      setOffset(TOTAL + i);
    },
    []
  );

  // Reset progress bar whenever the slide changes
  useEffect(() => {
    setProgressKey((k) => k + 1);
  }, [offset]);

  // When the progress bar finishes filling, advance to next slide
  const handleProgressEnd = useCallback(() => {
    goNext();
  }, [goNext]);

  return (
    <section className="relative py-24 md:py-32 bg-transparent overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-14 md:mb-16 text-center max-w-3xl mx-auto">
          <ScrollAnimation direction="up" delay={80}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-6 leading-tight">
              <SplitText
                text="What Clients Say"
                delay={120}
                className="inline"
              />
            </h2>
          </ScrollAnimation>

          <ScrollAnimation direction="up" delay={160}>
            <p className="text-lg text-brand-white/70 leading-relaxed">
              Hear from clients who&apos;ve experienced our photography services firsthand.
            </p>
          </ScrollAnimation>
        </div>

        {/* Carousel */}
        <ScrollAnimation direction="up" delay={200}>
          <div className="relative">
            {/* Track */}
            <div className="overflow-hidden -mx-3 lg:-mx-4">
              <div
                className={animate ? 'transition-transform duration-500 ease-out' : ''}
                style={{
                  display: 'flex',
                  width: `${(extended.length / visibleCount) * 100}%`,
                  transform: `translateX(-${offset * (100 / extended.length)}%)`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extended.map((testimonial, i) => (
                  <div
                    key={`${testimonial.id}-${i}`}
                    style={{ width: `${100 / extended.length}%` }}
                    className="flex-shrink-0"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={goPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-white/[0.1] bg-brand-white/[0.03] hover:border-brand-accent/30 hover:bg-brand-white/[0.06] transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-brand-white/60" />
              </button>

              {/* Progress-bar indicators */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToReal(i)}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-brand-white/10"
                    style={{ width: i === realIndex ? 32 : 8 }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  >
                    {i === realIndex && (
                      <div
                        key={progressKey}
                        className="absolute inset-y-0 left-0 rounded-full bg-brand-accent"
                        style={{
                          animation: 'indicator-fill 5s linear forwards',
                        }}
                        onAnimationEnd={handleProgressEnd}
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-white/[0.1] bg-brand-white/[0.03] hover:border-brand-accent/30 hover:bg-brand-white/[0.06] transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-brand-white/60" />
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </Container>
    </section>
  );
}
