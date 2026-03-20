'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/container';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import {
  MessageCircle,
  Coffee,
  Camera,
  Palette,
  Images,
  type LucideIcon,
} from 'lucide-react';

interface Step {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    label: 'Day 1',
    title: 'You reach out',
    description:
      'Tell me about your event, vision, and dates. I respond within 24 hours with availability and a personalised quote.',
  },
  {
    icon: Coffee,
    label: '1–2 weeks before',
    title: 'Planning session',
    description:
      'We meet over coffee or a video call to walk through locations, shot list, timeline, and any special requests.',
  },
  {
    icon: Camera,
    label: 'The day',
    title: 'The session',
    description:
      'Relaxed, directed, and thorough. I focus on real moments — candid emotions, beautiful light, and the details that make your story yours.',
  },
  {
    icon: Palette,
    label: '2–3 weeks after',
    title: 'Editing & curation',
    description:
      "Every image is hand-edited — colour-graded, retouched, and curated down to a final gallery you'll love.",
  },
  {
    icon: Images,
    label: 'Delivery',
    title: 'Your private gallery',
    description:
      'High-resolution downloads, easy sharing with family, and optional premium prints & albums delivered to your door.',
  },
];

/* ─── Desktop: Horizontal stepper with progress bar ─── */

function DesktopStepper({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="hidden md:block">
      {/* Node row */}
      <div className="relative flex items-start justify-between max-w-3xl mx-auto mb-12">
        {/* Background track — aligned to center of icon (h-11 = 44px, so 22px) */}
        <div className="absolute left-0 right-0 top-[22px] h-px bg-brand-white/10" />

        {/* Filled track */}
        <div
          className="absolute left-0 top-[22px] h-px bg-brand-accent transition-all duration-500 ease-out"
          style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          const isPast = i < active;

          return (
            <button
              key={step.title}
              onClick={() => onSelect(i)}
              className="group relative z-10 flex flex-col items-center gap-5"
            >
              {/* Node circle */}
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-400 ${
                  isActive
                    ? 'border-brand-accent bg-brand-accent/15 shadow-[0_0_24px_rgba(196,137,138,0.3)]'
                    : isPast
                      ? 'border-brand-accent/50 bg-brand-accent/10'
                      : 'border-brand-white/15 bg-brand-black hover:border-brand-white/30'
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-colors duration-400 ${
                    isActive
                      ? 'text-brand-accent'
                      : isPast
                        ? 'text-brand-accent/60'
                        : 'text-brand-white/40 group-hover:text-brand-white/60'
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              {/* Step label */}
              <span
                className={`text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-400 whitespace-nowrap ${
                  isActive
                    ? 'text-brand-accent'
                    : isPast
                      ? 'text-brand-white/45'
                      : 'text-brand-white/25 group-hover:text-brand-white/40'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content card */}
      <DesktopContent step={steps[active]} index={active} total={steps.length} />
    </div>
  );
}

function DesktopContent({
  step,
  index,
  total,
}: {
  step: Step;
  index: number;
  total: number;
}) {
  const Icon = step.icon;

  return (
    <div className="relative max-w-2xl mx-auto">
      <div
        key={step.title}
        className="rounded-2xl border border-brand-white/[0.06] bg-brand-white/[0.03] p-8 md:p-10 animate-in fade-in slide-in-from-bottom-2 duration-400"
      >
        <div className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 border border-brand-accent/20">
            <Icon className="h-5 w-5 text-brand-accent" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-accent/60 mb-1.5">
              Step {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-white tracking-tight mb-3">
              {step.title}
            </h3>
            <p className="text-brand-white/55 text-[15px] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile: Vertical stepper with progress line ─── */

function MobileStepper({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="md:hidden">
      {/* Vertical node rail + active content */}
      <div className="relative pl-20">
        {/* Vertical track */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-brand-white/10" />

        {/* Filled track */}
        <div
          className="absolute left-[19px] top-0 w-px bg-brand-accent transition-all duration-500 ease-out"
          style={{ height: `${(active / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;
          const isPast = i < active;

          return (
            <div key={step.title} className="relative pb-8 last:pb-0">
              {/* Node */}
              <button
                onClick={() => onSelect(i)}
                className={`absolute left-[-45px] flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-400 ${
                  isActive
                    ? 'border-brand-accent bg-brand-accent/15 shadow-[0_0_20px_rgba(196,137,138,0.25)]'
                    : isPast
                      ? 'border-brand-accent/40 bg-brand-accent/10'
                      : 'border-brand-white/15 bg-brand-black'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-colors duration-400 ${
                    isActive
                      ? 'text-brand-accent'
                      : isPast
                        ? 'text-brand-accent/50'
                        : 'text-brand-white/30'
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Collapsed: just title */}
              {!isActive && (
                <button
                  onClick={() => onSelect(i)}
                  className="block w-full text-left pt-1.5"
                >
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      isPast ? 'text-brand-white/40' : 'text-brand-white/30'
                    }`}
                  >
                    {step.title}
                  </p>
                </button>
              )}

              {/* Expanded: full content */}
              {isActive && (
                <div className="animate-in fade-in slide-in-from-bottom-1 duration-300 pt-0.5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-accent/60 mb-1">
                    {step.label}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-brand-white tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-brand-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}

/* ─── Exported section ─── */

export function ServicesProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <div className="py-24 md:py-32">
      <Container>
        {/* Header */}
        <ScrollAnimation direction="fade">
          <div className="text-center mb-14 md:mb-16">
            <div className="mx-auto mb-5 h-px w-12 bg-brand-accent/40" />
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-white tracking-tight mb-4">
              What to Expect
            </h2>
            <p className="text-brand-white/50 text-base md:text-lg max-w-md mx-auto">
              From first message to final gallery — here&apos;s how we work
              together.
            </p>
          </div>
        </ScrollAnimation>

        {/* Desktop stepper */}
        <ScrollAnimation direction="left">
          <DesktopStepper active={active} onSelect={setActive} />
        </ScrollAnimation>

        {/* Mobile stepper */}
        <ScrollAnimation direction="right">
          <MobileStepper
            active={active}
            onSelect={setActive}
          />
        </ScrollAnimation>

      </Container>
    </div>
  );
}
