import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface HeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
}

const sizeClasses = {
  xs: 'text-lg',
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl md:text-4xl',
  xl: 'text-4xl md:text-5xl',
  '2xl': 'text-5xl sm:text-6xl md:text-7xl',
  '3xl': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
  '4xl': 'text-6xl sm:text-7xl md:text-8xl',
};

export function Heading({ children, as = 'h2', size = 'lg', className }: HeadingProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        'font-serif font-bold tracking-tight leading-tight text-brand-white',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

