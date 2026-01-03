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
  return (
    <section
      className={cn(
        paddingClasses[padding],
        background === 'black' ? 'bg-brand-black text-brand-white' : 'text-brand-white',
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

