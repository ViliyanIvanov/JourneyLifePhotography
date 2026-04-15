'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { SplitText } from '@/components/ui/split-text';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How do I book a photography session?',
    answer:
      'Simply reach out through the contact form or send me an email with a brief description of your event or session. I\'ll respond within 24 hours with availability and a personalised quote. Once we agree on the details, a small deposit secures your date.',
  },
  {
    question: 'What should I wear to my photoshoot?',
    answer:
      'I recommend solid colours or subtle patterns that complement each other — avoid large logos or overly busy prints. Neutral and earthy tones photograph beautifully. I provide a detailed styling guide after booking to help you feel confident and camera-ready.',
  },
  {
    question: 'How long until I receive my photos?',
    answer:
      'For most sessions, your private online gallery will be ready within 2–3 weeks. Weddings typically take 4–6 weeks due to the volume of images. I always deliver a few sneak peeks within 48 hours so you have something to share right away.',
  },
  {
    question: 'Do you travel for photoshoots?',
    answer:
      'Absolutely! I\'m based in the UK but happy to travel for destination weddings, family holidays, or corporate events. Travel fees vary depending on the location — get in touch and I\'ll include everything in your personalised quote.',
  },
  {
    question: 'What happens if it rains on the day?',
    answer:
      'Rain creates some of the most dramatic and romantic photos! I always have backup plans and know how to work with natural conditions. For outdoor sessions, we can reschedule to a nearby date at no extra cost if you prefer.',
  },
  {
    question: 'Can I request specific editing styles?',
    answer:
      'Of course. While I have a signature editing style — warm, natural, and timeless — I\'m happy to discuss your preferences during our planning session. I can adjust colour grading, contrast, and tone to match your vision.',
  },
];

// JSON-LD structured data for SEO
function FaqJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqAccordionItem({ item, index, isOpen, onToggle }: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <ScrollAnimation direction="up" delay={index * 80}>
      <div
        className={`border rounded-xl transition-all duration-400 ${
          isOpen
            ? 'border-brand-accent/30 bg-brand-white/[0.05] shadow-[0_0_24px_rgba(176,204,209,0.1)]'
            : 'border-brand-white/[0.06] bg-brand-white/[0.02] hover:border-brand-white/[0.12]'
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
          aria-expanded={isOpen}
        >
          <h3 className={`font-serif text-base md:text-lg font-semibold transition-colors duration-300 ${
            isOpen ? 'text-brand-white' : 'text-brand-white/80'
          }`}>
            {item.question}
          </h3>
          <ChevronDown
            className={`w-5 h-5 shrink-0 transition-all duration-400 ${
              isOpen ? 'text-brand-accent rotate-180' : 'text-brand-white/30'
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-400 ease-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 md:px-6 pb-5 md:pb-6">
              <div className="h-px w-full bg-gradient-to-r from-brand-accent/20 via-brand-accent/5 to-transparent mb-4" />
              <p className="text-brand-white/60 text-sm md:text-base leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 bg-transparent overflow-hidden">
      <FaqJsonLd />
      <Container>
        {/* Header */}
        <ScrollAnimation direction="fade">
          <div className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-white mb-5 leading-tight tracking-tight">
              <SplitText text="Frequently Asked Questions" delay={60} className="inline" />
            </h2>
            <p className="text-brand-white/55 text-lg leading-relaxed">
              Everything you need to know before booking your session.
            </p>
          </div>
        </ScrollAnimation>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FaqAccordionItem
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
