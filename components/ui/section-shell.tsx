import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Container } from '@/components/layout/container';

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  background?: 'black' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  sm: 'py-16 md:py-20',
  md: 'py-24 md:py-32',
  lg: 'py-32 md:py-40',
  xl: 'py-40 md:py-48',
};

export function SectionShell({
  children,
  className,
  containerClassName,
  background = 'black',
  padding = 'lg',
}: SectionShellProps) {
  const bgClass =
    background === 'black'
      ? 'bg-black text-brand-white'
      : 'bg-transparent text-brand-white';

  return (
    <section
      className={cn(
        'relative w-full',          // ensures full-width section
        paddingClasses[padding],
        bgClass,
        className
      )}
    >
      {/* Grain texture overlay - subtle noise for luxury feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' fill=\'white\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '400px 400px',
        }}
      />
      <Container className={cn('relative', containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
