import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap select-none',
    'rounded-full',
    'font-medium tracking-wide',
    'transition-all duration-300 ease-out',
    'hover:scale-[1.02] active:scale-[0.98]',
    // focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    // disabled
    'disabled:pointer-events-none disabled:opacity-40 disabled:scale-100',
  ].join(' '),
  {
    variants: {
      variant: {
        /**
         * DEFAULT — Premium white button with depth
         * Polished, elegant, professional
         */
        default: [
          'bg-gradient-to-b from-brand-white to-brand-white/95',
          'text-brand-black font-semibold',
          'shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_8px_24px_-6px_rgba(255,255,255,0.2)]',
          'hover:shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_12px_32px_-6px_rgba(255,255,255,0.3)]',
          'hover:from-brand-white hover:to-brand-white',
        ].join(' '),

        /**
         * SECONDARY — Outlined glass style
         * Subtle with backdrop blur
         */
        secondary: [
          'bg-brand-white/5 text-brand-white',
          'border-2 border-brand-white/20',
          'backdrop-blur-sm',
          'shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]',
          'hover:bg-brand-white/10 hover:border-brand-white/30',
        ].join(' '),

        /**
         * GHOST — Minimal hover effect
         * For subtle actions
         */
        ghost: [
          'bg-transparent text-brand-white/80',
          'hover:text-brand-white hover:bg-brand-white/5',
        ].join(' '),

        /**
         * DESTRUCTIVE — For delete/warning actions
         */
        destructive: [
          'bg-red-500/90 text-white',
          'border border-red-400/30',
          'hover:bg-red-500',
        ].join(' '),
      },
      size: {
        sm: 'h-10 px-5 text-xs',
        default: 'h-12 px-8 text-sm',
        lg: 'h-14 px-10 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
