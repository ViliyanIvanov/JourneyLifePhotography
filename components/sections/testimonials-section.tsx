'use client';

import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { Star } from 'lucide-react';
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
    review: 'If you\'re looking for a photographer who is\nnot only skilled but also genuinely cares\nabout the task and clients, look no further\nthan Ivayla. I would definitely work with her\nagain and encourage anyone in need of\nphotography services to reach out!',
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

function AvatarInitial({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  const colorIndex = name.charCodeAt(0) % 5;

  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
      style={{
        backgroundColor: '#C4898A',
        opacity: 0.8 + (colorIndex * 0.04),
      }}
    >
      <span className="text-white text-lg font-semibold">{initials}</span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'text-brand-white/20'
          } transition-colors`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <ScrollAnimation
      direction="up"
      delay={index * 150}
      effect="float"
    >
      <div className="group relative">
        {/* Card content — fixed height, CSS hover lift instead of TiltCard */}
        <div className="relative backdrop-blur-sm bg-white/[0.07] border border-white/[0.15] rounded-2xl overflow-hidden card-glow-hover card-lift-hover transition-[background-color,border-color,box-shadow,transform] duration-500 group-hover:bg-white/[0.10] group-hover:border-brand-accent/30 flex flex-col h-[350px]">
          {/* Top edge highlight */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent flex-shrink-0" />

          <div className="p-8 flex flex-col flex-1">
            {/* Quote mark accent */}
            <div
              className="absolute top-6 right-6 text-6xl font-serif transition-opacity duration-500 group-hover:opacity-[0.35]"
              style={{ color: '#C4898A', opacity: '0.2' }}
            >
              &quot;
            </div>

            {/* Review text */}
            <p className="text-brand-white/80 leading-relaxed mb-6 text-sm md:text-base relative z-10 whitespace-pre-wrap flex-1 overflow-hidden">
              {testimonial.review}
            </p>

            {/* Divider */}
            <div
              className="h-px mb-6 flex-shrink-0"
              style={{
                background: `linear-gradient(to right, transparent, #C4898A 50%, transparent)`,
                opacity: '0.3',
              }}
            />

            {/* Footer with avatar, name, and rating */}
            <div className="flex items-center justify-between gap-4 flex-shrink-0">
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
    </ScrollAnimation>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-brand-warm-1 overflow-hidden">
      {/* Background orbs with breathe animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl animate-breathe"
          style={{ backgroundColor: '#C4898A', opacity: '0.09' }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-breathe"
          style={{ backgroundColor: '#C4898A', opacity: '0.09', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl animate-breathe"
          style={{ backgroundColor: '#C4898A', opacity: '0.05', animationDelay: '1s' }}
        />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <ScrollAnimation direction="fade" delay={0}>
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="h-px w-8" style={{ backgroundColor: '#C4898A', opacity: '0.5' }} />
              <span
                className="text-xs tracking-widest uppercase font-semibold"
                style={{ color: '#C4898A', opacity: '0.7' }}
              >
                Testimonials
              </span>
              <div className="h-px w-8" style={{ backgroundColor: '#C4898A', opacity: '0.5' }} />
            </div>
          </ScrollAnimation>

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

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Bottom accent line */}
        <ScrollAnimation direction="up" delay={400}>
          <div
            className="mt-16 md:mt-20 h-px"
            style={{
              background: `linear-gradient(to right, transparent, #C4898A 50%, transparent)`,
              opacity: '0.3',
            }}
          />
        </ScrollAnimation>
      </Container>
    </section>
  );
}
