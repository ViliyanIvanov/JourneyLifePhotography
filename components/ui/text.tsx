import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  as?: 'p' | 'span' | 'div';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  muted?: boolean;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg md:text-xl',
  xl: 'text-xl',
};

export function Text({ children, as = 'p', size = 'md', className, muted = false }: TextProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        'leading-relaxed',
        sizeClasses[size],
        muted ? 'text-brand-white/70' : 'text-brand-white/90',
        className
      )}
    >
      {children}
    </Component>
  );
}

