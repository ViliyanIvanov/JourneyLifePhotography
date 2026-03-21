'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { mockServices } from '@/content/mock-data';
import { Container } from '@/components/layout/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useContactSubmit, ApiClientError, type ContactRequest } from '@/lib/api';
import { SplitText } from '@/components/ui/split-text';
import { Mail, Phone, MapPin, ArrowRight, Camera, Heart, Building2, Send } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = mockServices.slice(0, 3);

/** Distinct, evocative photos — not album covers — to encourage selection. */
const SERVICE_IMAGES: Record<string, string> = {
  'Wedding Photography':
    '/IvaDimitrovPhotos/Weddings/Engagement/DSC07010-Edit_thumb.jpg',
  'Family Photography':
    '/IvaDimitrovPhotos/Children and family/boy-with-daisies-spring-family-photoshoots-nottingham_thumb.jpg',
  'Corporate Photography':
    '/IvaDimitrovPhotos/Corporate small/DSC03799-Edit-3_thumb.jpg',
};

/** Three photos that bleed behind the hero heading — mood, not detail. */
const HERO_PHOTOS = [
  '/IvaDimitrovPhotos/Weddings/Wedding 2/DSC05107-Edit-3_thumb.jpg',
  '/IvaDimitrovPhotos/Children and family/kid-portrait-bluebell-forest-nottingham-journey-life-photography-woods-flowers_thumb.jpg',
  '/IvaDimitrovPhotos/Branding small/DSC05042_thumb.jpg',
];

const SERVICE_ICONS = [Heart, Camera, Building2] as const;

const contactDetails = [
  {
    icon: Mail,
    label: 'info@ivadimitrovphotography.com',
    href: 'mailto:info@ivadimitrovphotography.com',
  },
  {
    icon: Phone,
    label: '+44 7907 977441',
    href: 'tel:+447907977441',
  },
  {
    icon: MapPin,
    label: 'Available throughout the UK',
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Form schema                                                        */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  email: z.string().email('Please enter a valid email address').max(254),
  phone: z.string().max(50).optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(300),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  inquiryType: z.string().optional(),
  preferredDate: z.string().optional(),
  honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ContactPageContent() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  /* -- form -- */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    setValue('inquiryType', selectedService || '');
  }, [selectedService, setValue]);

  const contactSubmit = useContactSubmit({
    onSuccess: () => reset(),
    onError: (error) => {
      if (error instanceof ApiClientError && error.is('VALIDATION_ERROR')) {
        error.getAllFieldErrors().forEach(({ field, messages }) => {
          const fieldName = field.toLowerCase() as keyof ContactFormData;
          if (fieldName in contactSchema.shape) {
            setError(fieldName, { message: messages[0] });
          }
        });
      }
    },
  });

  const onSubmit = (data: ContactFormData) => {
    if (data.honeypot) return;
    const request: ContactRequest = {
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      message: data.message,
      inquiryType: data.inquiryType || undefined,
      preferredDate: data.preferredDate || undefined,
    };
    contactSubmit.mutate(request);
  };

  /* -- scroll triggers -- */
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [pickerRef, pickerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="min-h-screen">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section ref={heroRef} className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        {/* Floating photo strip — three photos fading through */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] md:w-[45%] overflow-hidden">
          <div className="absolute inset-0 flex gap-3 pr-4 items-center">
            {HERO_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo}
                className="relative h-[60%] min-w-[38%] rounded-lg overflow-hidden shrink-0"
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={
                  heroInView
                    ? { opacity: 0.35, x: 0, scale: 1 }
                    : {}
                }
                transition={{
                  duration: 1,
                  delay: 0.3 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="25vw"
                />
              </motion.div>
            ))}
          </div>
          {/* Fade-out masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50 z-10" />
        </div>

        <Container className="relative z-20">
          <div className="max-w-2xl">
            {/* Kicker */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="h-px w-10 bg-brand-accent/60" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-brand-accent/80">
                Get in Touch
              </span>
            </motion.div>

            {/* Heading — staggered word reveal */}
            <h1 className="font-serif font-bold text-brand-white leading-[1.06] tracking-tight mb-7">
              <SplitText
                text="Every Great Image"
                delay={200}
                stagger={70}
                className="text-[clamp(2.5rem,6vw,4.5rem)]"
              />
              <SplitText
                text="Starts With a Conversation"
                delay={500}
                stagger={70}
                className="text-[clamp(2.5rem,6vw,4.5rem)]"
              />
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-brand-white/45 text-lg md:text-xl leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Tell me about the moment you want to remember forever —
              and let&apos;s make it happen.
            </motion.p>

            {/* Scroll cue */}
            <motion.div
              className="mt-10 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <span className="block w-px h-8 bg-brand-white/15 animate-pulse" />
              <span className="text-brand-white/20 text-xs tracking-widest uppercase">
                Choose a service or scroll to write
              </span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  SERVICE PICKER                                               */}
      {/* ============================================================ */}
      <section ref={pickerRef} className="py-10 md:py-14">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={pickerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-brand-white/35 text-xs uppercase tracking-[0.2em] mb-5">
              I&apos;m interested in…
            </p>

            {/* Desktop: 3-col grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-3">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  icon={SERVICE_ICONS[i]}
                  isActive={selectedService === service.title}
                  onClick={() =>
                    setSelectedService((prev) =>
                      prev === service.title ? null : service.title
                    )
                  }
                  delay={i * 0.08}
                  inView={pickerInView}
                />
              ))}
            </div>

            {/* Mobile: horizontal scroll strip */}
            <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide -mx-4 px-4">
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  icon={SERVICE_ICONS[i]}
                  isActive={selectedService === service.title}
                  onClick={() =>
                    setSelectedService((prev) =>
                      prev === service.title ? null : service.title
                    )
                  }
                  delay={i * 0.08}
                  inView={pickerInView}
                  mobile
                />
              ))}
            </div>

            {/* Explore link */}
            <div className="mt-5">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-brand-white/30 hover:text-brand-accent transition-colors duration-300 text-[13px] group/link"
              >
                Not sure yet? Explore our services
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ============================================================ */}
      {/*  FORM + SIDEBAR                                               */}
      {/* ============================================================ */}
      <section ref={formRef} className="py-10 md:py-16 pb-24 md:pb-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* ---- Form column ---- */}
              <div className="lg:col-span-7">
                {/* Selected service pill */}
                <AnimatePresence>
                  {selectedService && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-2 mb-6">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-brand-white/30">
                          Selected:
                        </span>
                        <span className="text-sm text-brand-accent font-medium">
                          {selectedService}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedService(null)}
                          className="ml-1 text-brand-white/25 hover:text-brand-white/60 transition-colors text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    {...register('honeypot')}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <input type="hidden" {...register('inquiryType')} />

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Name" error={errors.name?.message} required>
                      <Input
                        {...register('name')}
                        placeholder="Your name"
                        aria-invalid={!!errors.name}
                        disabled={contactSubmit.isPending}
                        className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20"
                      />
                    </FormField>
                    <FormField label="Email" error={errors.email?.message} required>
                      <Input
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        aria-invalid={!!errors.email}
                        disabled={contactSubmit.isPending}
                        className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20"
                      />
                    </FormField>
                  </div>

                  {/* Phone + Date row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Phone" sublabel="optional">
                      <Input
                        type="tel"
                        {...register('phone')}
                        placeholder="Your phone number"
                        disabled={contactSubmit.isPending}
                        className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20"
                      />
                    </FormField>
                    <FormField label="Preferred Date" sublabel="optional">
                      <Input
                        type="date"
                        {...register('preferredDate')}
                        disabled={contactSubmit.isPending}
                        className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20 [color-scheme:dark]"
                      />
                    </FormField>
                  </div>

                  {/* Subject */}
                  <FormField label="Subject" error={errors.subject?.message} required>
                    <Input
                      {...register('subject')}
                      placeholder="What is this regarding?"
                      aria-invalid={!!errors.subject}
                      disabled={contactSubmit.isPending}
                      className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20"
                    />
                  </FormField>

                  {/* Message */}
                  <FormField label="Message" error={errors.message?.message} required>
                    <Textarea
                      {...register('message')}
                      placeholder="Tell me about your vision…"
                      rows={5}
                      aria-invalid={!!errors.message}
                      disabled={contactSubmit.isPending}
                      className="bg-brand-white/[0.04] border-brand-white/[0.08] focus-visible:border-brand-accent/40 focus-visible:ring-brand-accent/20 resize-none"
                    />
                  </FormField>

                  {/* Status messages */}
                  {contactSubmit.isSuccess && (
                    <div className="rounded-xl bg-green-500/[0.08] border border-green-500/30 p-4 text-green-400">
                      <p className="font-medium text-sm">Message sent!</p>
                      <p className="text-xs mt-1 text-green-400/70">
                        I&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {contactSubmit.isError &&
                    !contactSubmit.error.is?.('VALIDATION_ERROR') && (
                      <div className="rounded-xl bg-red-500/[0.08] border border-red-500/30 p-4 text-red-400">
                        <p className="font-medium text-sm">Something went wrong</p>
                        <p className="text-xs mt-1 text-red-400/70">
                          {contactSubmit.error.message ||
                            'Please try again or contact me directly.'}
                        </p>
                      </div>
                    )}

                  <Button
                    type="submit"
                    disabled={contactSubmit.isPending}
                    className="w-full sm:w-auto"
                  >
                    {contactSubmit.isPending ? (
                      'Sending…'
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* ---- Sidebar ---- */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                {/* Contact info */}
                <div>
                  <p className="text-brand-white/35 text-xs uppercase tracking-[0.2em] mb-6">
                    Or reach out directly
                  </p>

                  <div className="space-y-5">
                    {contactDetails.map((item) => {
                      const Icon = item.icon;
                      const inner = (
                        <div className="flex items-start gap-4 group/item">
                          <div className="w-10 h-10 rounded-full border border-brand-white/[0.08] bg-brand-white/[0.03] flex items-center justify-center shrink-0 group-hover/item:border-brand-accent/30 transition-colors duration-300">
                            <Icon className="w-4 h-4 text-brand-white/40 group-hover/item:text-brand-accent/70 transition-colors duration-300" />
                          </div>
                          <div className="pt-2">
                            <span className="text-sm text-brand-white/60 group-hover/item:text-brand-white/80 transition-colors duration-300">
                              {item.label}
                            </span>
                          </div>
                        </div>
                      );

                      if ('href' in item && item.href) {
                        return (
                          <a key={item.label} href={item.href} className="block">
                            {inner}
                          </a>
                        );
                      }
                      return <div key={item.label}>{inner}</div>;
                    })}
                  </div>
                </div>

                {/* Decorative quote */}
                <div className="mt-12 lg:mt-0">
                  <div className="border-l-2 border-brand-accent/20 pl-5">
                    <p className="font-serif text-lg italic text-brand-white/30 leading-relaxed">
                      &ldquo;The best images happen when people
                      feel comfortable being themselves.&rdquo;
                    </p>
                    <p className="text-brand-white/20 text-xs mt-3 tracking-wide">
                      — Iva
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Service picker card                                                */
/* ------------------------------------------------------------------ */

interface ServiceCardProps {
  service: (typeof mockServices)[0];
  icon: (typeof SERVICE_ICONS)[number];
  isActive: boolean;
  onClick: () => void;
  delay?: number;
  inView?: boolean;
  mobile?: boolean;
}

function ServiceCard({
  service,
  icon: Icon,
  isActive,
  onClick,
  delay = 0,
  inView = true,
  mobile,
}: ServiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative text-left overflow-hidden rounded-xl transition-all duration-500 ${
        mobile ? 'flex-shrink-0 min-w-[260px] snap-start' : ''
      } ${
        isActive
          ? 'border-2 border-brand-accent/40 shadow-[0_0_30px_rgba(176,204,209,0.12)]'
          : 'border-2 border-brand-white/[0.06] hover:border-brand-white/[0.12]'
      }`}
    >
      {/* Photo background */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={SERVICE_IMAGES[service.title] || service.image}
          alt={service.title}
          fill
          className={`object-cover object-top transition-all duration-700 ${
            isActive ? 'scale-105 brightness-90' : 'scale-100 brightness-75 group-hover:scale-105 group-hover:brightness-[0.85]'
          }`}
          sizes={mobile ? '260px' : '33vw'}
        />
        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative px-4 pb-4 pt-0 -mt-6">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-400 ${
              isActive
                ? 'bg-brand-accent/20 border border-brand-accent/40'
                : 'bg-brand-white/[0.05] border border-brand-white/[0.08]'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-colors duration-400 ${
                isActive ? 'text-brand-accent' : 'text-brand-white/40'
              }`}
            />
          </div>
          <h3
            className={`font-serif text-base font-semibold transition-colors duration-400 ${
              isActive ? 'text-brand-white' : 'text-brand-white/70'
            }`}
          >
            {service.title}
          </h3>
        </div>
        <p className="text-brand-white/30 text-xs leading-relaxed pl-[38px]">
          {service.tagline}
        </p>
      </div>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Form field wrapper                                                 */
/* ------------------------------------------------------------------ */

function FormField({
  label,
  sublabel,
  error,
  required,
  children,
}: {
  label: string;
  sublabel?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-brand-white/70 mb-2 block">
        {label}
        {required && <span className="text-brand-accent/60 ml-0.5">*</span>}
        {sublabel && (
          <span className="text-brand-white/25 ml-1.5 text-xs font-normal">
            {sublabel}
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-red-400/80 mt-1.5">{error}</p>}
    </div>
  );
}
