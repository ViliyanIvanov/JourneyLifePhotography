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
      ? // use both so if brand token ever fails, bg-background still keeps it black
        'bg-brand-black bg-background text-brand-white'
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
      <Container className={cn('relative', containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
