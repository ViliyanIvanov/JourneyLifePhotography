import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Container } from '@/components/layout/container';

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'black' | 'transparent' | 'dark-1' | 'dark-2' | 'dark-3' | 'warm-1' | 'warm-2';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Blurred background photo URL — creates warmth behind content */
  bgImage?: string;
  /** Overlay opacity over the bgImage (0-100). Default 80 */
  bgImageOpacity?: number;
  /** Render gradient fades at top/bottom for smooth section transitions */
  blendEdges?: boolean;
  /** Custom blend color for edge gradients (defaults to brand-black) */
  blendColor?: string;
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
  'warm-1': 'bg-brand-warm-1 text-brand-white',
  'warm-2': 'bg-brand-warm-2 text-brand-white',
};

const blendColorMap: Record<string, string> = {
  black: '#0A0A0A',
  'dark-1': '#111111',
  'dark-2': '#141414',
  'dark-3': '#1A1A1A',
  'warm-1': '#141210',
  'warm-2': '#1E1C1A',
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
  blendColor,
}: SectionShellProps) {
  const edgeColor = blendColor || blendColorMap[background] || '#0A0A0A';
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
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24"
          style={{ background: `linear-gradient(to bottom, ${edgeColor}, transparent)` }}
        />
      )}

      {/* Bottom gradient fade — blends smoothly into next section */}
      {blendEdges && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24"
          style={{ background: `linear-gradient(to top, ${edgeColor}, transparent)` }}
        />
      )}

      {/* Grain texture overlay — static, no animation to avoid GPU cost */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      <Container className={cn('relative z-[2]', containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
