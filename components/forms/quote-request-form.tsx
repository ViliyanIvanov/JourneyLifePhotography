'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Service } from '@/content/mock-data';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(200),
  email: z.string().email('Please enter a valid email address').max(254),
  phone: z.string().max(50).optional(),
  preferredDate: z.string().min(1, 'Please enter a preferred date').max(200),
  location: z.string().min(1, 'Please enter a location').max(500),
  duration: z.string().min(1, 'Please select an estimated duration'),
  details: z.string().max(5000).optional(),
  honeypot: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteRequestFormProps {
  service: Service;
  onSuccess?: () => void;
}

export function QuoteRequestForm({ service, onSuccess }: QuoteRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serviceOptions, setServiceOptions] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    if (data.honeypot) return;

    // Frontend-only: log and show success
    console.log('Quote request:', { ...data, service: service.title, options: serviceOptions });
    setIsSubmitted(true);
    reset();
    setServiceOptions({});
    onSuccess?.();
  };

  if (isSubmitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
          <svg className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-brand-white mb-2">Request Sent</h3>
        <p className="text-brand-white/60 text-sm max-w-sm mx-auto">
          Thank you for your interest in {service.title}. I&apos;ll review your details and get back to you with a custom quote within 24–48 hours.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4"
          onClick={() => setIsSubmitted(false)}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name & Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="text-sm font-medium mb-1.5 block text-brand-white">
            Name *
          </label>
          <Input
            id="quote-name"
            {...register('name')}
            placeholder="Your name"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="quote-email" className="text-sm font-medium mb-1.5 block text-brand-white">
            Email *
          </label>
          <Input
            id="quote-email"
            type="email"
            {...register('email')}
            placeholder="your.email@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="quote-phone" className="text-sm font-medium mb-1.5 block text-brand-white">
          Phone (optional)
        </label>
        <Input
          id="quote-phone"
          type="tel"
          {...register('phone')}
          placeholder="+44 (0) 123 456 7890"
        />
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-date" className="text-sm font-medium mb-1.5 block text-brand-white">
            Preferred Date *
          </label>
          <Input
            id="quote-date"
            {...register('preferredDate')}
            placeholder="e.g. 15 June 2026"
            aria-invalid={errors.preferredDate ? 'true' : 'false'}
          />
          {errors.preferredDate && (
            <p className="text-sm text-red-400 mt-1">{errors.preferredDate.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="quote-location" className="text-sm font-medium mb-1.5 block text-brand-white">
            Location *
          </label>
          <Input
            id="quote-location"
            {...register('location')}
            placeholder="City or venue"
            aria-invalid={errors.location ? 'true' : 'false'}
          />
          {errors.location && (
            <p className="text-sm text-red-400 mt-1">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="quote-duration" className="text-sm font-medium mb-1.5 block text-brand-white">
          Estimated Duration *
        </label>
        <select
          id="quote-duration"
          {...register('duration')}
          className="flex h-10 w-full rounded-lg border-2 border-brand-white/10 bg-brand-black text-brand-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-white/40 focus-visible:border-brand-white/50 focus-visible:ring-offset-2 transition-colors appearance-none cursor-pointer"
          aria-invalid={errors.duration ? 'true' : 'false'}
        >
          <option value="" className="bg-brand-black">Select duration</option>
          <option value="Half day" className="bg-brand-black">Half day</option>
          <option value="Full day" className="bg-brand-black">Full day</option>
          <option value="Multi-day" className="bg-brand-black">Multi-day</option>
        </select>
        {errors.duration && (
          <p className="text-sm text-red-400 mt-1">{errors.duration.message}</p>
        )}
      </div>

      {/* Service-specific options */}
      {service.options.map((option) => (
        <div key={option.label}>
          <label className="text-sm font-medium mb-1.5 block text-brand-white">
            {option.label}
          </label>
          <select
            value={serviceOptions[option.label] || ''}
            onChange={(e) =>
              setServiceOptions((prev) => ({ ...prev, [option.label]: e.target.value }))
            }
            className="flex h-10 w-full rounded-lg border-2 border-brand-white/10 bg-brand-black text-brand-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-white/40 focus-visible:border-brand-white/50 focus-visible:ring-offset-2 transition-colors appearance-none cursor-pointer"
          >
            <option value="" className="bg-brand-black">Select {option.label.toLowerCase()}</option>
            {option.values.map((val) => (
              <option key={val} value={val} className="bg-brand-black">{val}</option>
            ))}
          </select>
        </div>
      ))}

      {/* Additional details */}
      <div>
        <label htmlFor="quote-details" className="text-sm font-medium mb-1.5 block text-brand-white">
          Additional Details
        </label>
        <Textarea
          id="quote-details"
          {...register('details')}
          placeholder="Tell me more about what you have in mind..."
          rows={4}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Request a Quote'}
      </Button>
    </form>
  );
}
