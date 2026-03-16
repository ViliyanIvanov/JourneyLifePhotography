'use client';

import { useState } from 'react';
import { SectionShell } from '@/components/ui/section-shell';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import {
  MessageCircle,
  Coffee,
  Camera,
  Palette,
  Images,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

interface Step {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Initial Consultation',
    description:
      'A relaxed conversation about your vision, preferences, and what matters most to you. No pressure — just getting to know each other.',
  },
  {
    icon: Coffee,
    number: '02',
    title: 'Planning & Styling',
    description:
      'We nail down the details — locations, wardrobe ideas, timing, and anything special you have in mind. Every session is tailored to you.',
  },
  {
    icon: Camera,
    number: '03',
    title: 'The Session',
    description:
      'Relaxed, gently guided, and full of real emotion. I focus on beautiful light and authentic moments that feel like you.',
  },
  {
    icon: Palette,
    number: '04',
    title: 'Editing & Curation',
    description:
      "Every image is hand-edited — colour-graded, retouched, and carefully curated into a gallery you'll love from first frame to last.",
  },
  {
    icon: Images,
    number: '05',
    title: 'Delivery & Reveal',
    description:
      'Your private online gallery with high-resolution downloads, easy sharing with loved ones, and optional premium prints delivered to your door.',
  },
];

function AccordionItem({
  step,
  index,
  isOpen,
  onToggle,
}: {
  step: Step;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = step.icon;

  return (
    <ScrollAnimation direction="up" delay={index * 0.08}>
      <div
        className={`rounded-2xl border transition-all duration-500 ${
          isOpen
            ? 'border-brand-accent/30 bg-brand-white/[0.04] shadow-[0_0_30px_rgba(196,137,138,0.08)]'
            : 'border-brand-white/[0.06] bg-brand-white/[0.02] hover:border-brand-white/[0.12]'
        }`}
      >
        {/* Header — always visible */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-5 py-5 md:px-7 md:py-6 text-left cursor-pointer"
        >
          {/* Step number */}
          <span
            className={`hidden sm:block font-serif text-2xl md:text-3xl font-bold tabular-nums transition-colors duration-400 ${
              isOpen ? 'text-brand-accent' : 'text-brand-white/15'
            }`}
          >
            {step.number}
          </span>

          {/* Icon badge */}
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
              isOpen
                ? 'border-brand-accent/40 bg-brand-accent/15'
                : 'border-brand-white/10 bg-brand-white/[0.04]'
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] transition-colors duration-400 ${
                isOpen ? 'text-brand-accent' : 'text-brand-white/35'
              }`}
              strokeWidth={1.5}
            />
          </div>

          {/* Title */}
          <h3
            className={`flex-1 font-serif text-lg md:text-xl font-bold tracking-tight transition-colors duration-400 ${
              isOpen ? 'text-brand-white' : 'text-brand-white/40'
            }`}
          >
            {step.title}
          </h3>

          {/* Chevron */}
          <ChevronDown
            className={`h-5 w-5 shrink-0 transition-all duration-400 ${
              isOpen
                ? 'rotate-180 text-brand-accent'
                : 'rotate-0 text-brand-white/25'
            }`}
            strokeWidth={1.5}
          />
        </button>

        {/* Expandable content — grid-rows technique for smooth height animation */}
        <div
          className={`grid transition-[grid-template-rows] duration-400 ease-out ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-6 md:px-7 md:pb-7">
              {/* Gradient divider */}
              <div className="mb-4 h-px bg-gradient-to-r from-brand-accent/30 via-brand-accent/10 to-transparent" />

              <p className="text-brand-white/55 text-[15px] leading-relaxed sm:pl-[calc(theme(fontSize.3xl)+1rem)] md:pl-[calc(theme(fontSize.3xl)+1.5rem)]">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export function AboutBehindLensSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <SectionShell background="transparent" padding="lg">
      {/* Header */}
      <ScrollAnimation direction="fade">
        <div className="text-center mb-14 md:mb-16">
          <div className="mx-auto mb-5 h-px w-12 bg-brand-accent/40" />
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white tracking-tight mb-4">
            Behind the Lens
          </h2>
          <p className="text-brand-white/50 text-base md:text-lg max-w-md mx-auto">
            From our first conversation to your final gallery — here&apos;s how
            we create together.
          </p>
        </div>
      </ScrollAnimation>

      {/* Accordion stack */}
      <div className="max-w-3xl mx-auto space-y-3">
        {steps.map((step, i) => (
          <AccordionItem
            key={step.number}
            step={step}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </SectionShell>
  );
}
