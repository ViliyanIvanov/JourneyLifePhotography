import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  imageUrl?: string;
  gradient?: 'default' | 'heavy' | 'light';
  className?: string;
}

const gradientClasses = {
  default: 'bg-gradient-to-b from-brand-black/80 via-brand-black/60 to-brand-black/80',
  heavy: 'bg-brand-black/70',
  light: 'bg-gradient-to-b from-brand-black/85 via-brand-black/55 to-brand-black/85',
};

export function Overlay({ children, imageUrl, gradient = 'default', className }: OverlayProps) {
  return (
    <section className={cn('relative min-h-[70vh] flex items-center text-brand-white', className)}>
      {/* Background image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className={cn('absolute inset-0', gradientClasses[gradient])} />
        </div>
      )}
      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

