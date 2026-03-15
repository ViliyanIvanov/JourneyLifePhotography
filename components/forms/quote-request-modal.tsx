'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { QuoteRequestForm } from '@/components/forms/quote-request-form';
import type { Service } from '@/content/mock-data';

interface QuoteRequestModalProps {
  service: Service;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteRequestModal({ service, open, onOpenChange }: QuoteRequestModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto border-brand-white/10 bg-brand-black sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-brand-white">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-brand-white/60">
            Tell me about your project and I&apos;ll get back to you with a personalised quote.
          </DialogDescription>
        </DialogHeader>
        <QuoteRequestForm service={service} />
      </DialogContent>
    </Dialog>
  );
}
