import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Container } from '@/components/layout/container';

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'black' | 'transparent' | 'dark-1' | 'dark-2' | 'dark-3';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Blurred background photo URL — creates warmth behind content */
  bgImage?: string;
  /** Overlay opacity over the bgImage (0-100). Default 80 */
  bgImageOpacity?: number;
  /** Render gradient fades at top/bottom for smooth section transitions */
  blendEdges?: boolean;
}

const paddingClasses = {
  sm: 'py-16 md:py-20',
  md: 'py-24 md:py-32',
  lg: 'py-32 md:py-40',
  xl: 'py-40 md:py-48',
};

const bgClasses: Record<string, string> = {
  black: 'bg-brand-black text-brand-white',
  transparent: 'bg-transparent text-brand-white',
  'dark-1': 'bg-brand-dark-1 text-brand-white',
  'dark-2': 'bg-brand-dark-2 text-brand-white',
  'dark-3': 'bg-brand-dark-3 text-brand-white',
};

export function SectionShell({
  children,
  className,
  containerClassName,
  background = 'black',
  padding = 'lg',
  bgImage,
  bgImageOpacity = 80,
  blendEdges = false,
}: SectionShellProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        paddingClasses[padding],
        bgClasses[background],
        className
      )}
    >
      {/* Blurred background photo */}
      {bgImage && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0 scale-110 blur-2xl"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(10, 10, 10, ${bgImageOpacity / 100})` }}
          />
        </div>
      )}

      {/* Top gradient fade — blends smoothly from previous section */}
      {blendEdges && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-brand-black to-transparent" />
      )}

      {/* Bottom gradient fade — blends smoothly into next section */}
      {blendEdges && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-brand-black to-transparent" />
      )}

      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' fill=\'white\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />

      <Container className={cn('relative z-[2]', containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
