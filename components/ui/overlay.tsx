import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
  imageUrl?: string;
  gradient?: 'default' | 'heavy' | 'light' | 'subtle';
  className?: string;
}

const gradientClasses = {
  default: 'bg-gradient-to-b from-black/80 via-black/60 to-black/80',
  heavy: 'bg-black/70',
  light: 'bg-gradient-to-b from-black/85 via-black/55 to-black/85',
  subtle: 'bg-gradient-to-b from-black/60 via-black/35 to-black/60',
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

      {/* Grain texture overlay - subtle for luxury feel */}
      <div
        className="pointer-events-none absolute inset-0 z-5 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' result=\'noise\'/%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' fill=\'white\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}

