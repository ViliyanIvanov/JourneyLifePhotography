import { Container } from './container';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  const isTransparent = className?.includes('bg-transparent');

  return (
    <div
      className={cn(
        // Leave space for sticky header
        'relative text-brand-white pt-24 md:pt-28 pb-14 md:pb-20',
        isTransparent ? 'bg-transparent' : 'bg-brand-dark-1 overflow-hidden',
        className
      )}
    >
      {/* Subtle gradient overlay — skip when transparent (atmosphere bg handles it) */}
      {!isTransparent && (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark-1 via-brand-dark-1 to-brand-dark-1/95" />
      )}

      {/* Grain texture — skip when transparent (atmosphere bg has its own grain) */}
      {!isTransparent && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' fill=\'white\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundSize: '400px 400px',
          }}
        />
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg md:text-xl text-brand-white/75 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
