'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().optional(), // Spam protection
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      // Bot detected, silently fail
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Mock API call - replace with actual API call later
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate success
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-brand-white/10 bg-brand-black">
      <CardHeader>
        <CardTitle className="font-serif text-2xl text-brand-white">Send us a message</CardTitle>
        <CardDescription className="text-brand-white/70">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            {...register('honeypot')}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium mb-2 block text-brand-white">
                Name *
              </label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Your name"
                aria-invalid={errors.name ? 'true' : 'false'}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium mb-2 block text-brand-white">
                Email *
              </label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium mb-2 block text-brand-white">
              Phone (optional)
            </label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="+44 (0) 123 456 7890"
            />
          </div>

          <div>
            <label htmlFor="subject" className="text-sm font-medium mb-2 block text-brand-white">
              Subject *
            </label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="What is this regarding?"
              aria-invalid={errors.subject ? 'true' : 'false'}
            />
            {errors.subject && (
              <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="text-sm font-medium mb-2 block text-brand-white">
              Message *
            </label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell us about your photography needs..."
              rows={6}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>

          {submitStatus === 'success' && (
            <div className="rounded-lg bg-brand-emerald/10 border-2 border-brand-emerald p-4 text-brand-emerald">
              <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm mt-1">
                We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="rounded-lg bg-brand-white/10 border-2 border-brand-white/30 p-4 text-brand-white">
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm mt-1">
                Please try again later or contact us directly.
              </p>
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

