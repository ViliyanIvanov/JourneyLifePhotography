import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap select-none',
    'rounded-xl',
    // modern type feel
    'font-medium tracking-[0.08em] uppercase',
    'transition-colors duration-200',
    // focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    // disabled
    'disabled:pointer-events-none disabled:opacity-45',
  ].join(' '),
  {
    variants: {
      variant: {
        /**
         * PRIMARY — modern luxury (quiet, not glossy)
         * Reads like a design brand: flat, confident, minimal.
         */
        default: [
          'bg-brand-emerald text-brand-white',
          'hover:bg-brand-emerald/92',
          // tiny material cue without shadow: inner hairline
          'ring-1 ring-inset ring-white/10',
        ].join(' '),

        /**
         * SECONDARY — glass outline (modern + premium on photos)
         * No heavy blur; just a whisper of translucency.
         */
        secondary: [
          'bg-white/[0.04] text-brand-white',
          'border border-white/45',
          'hover:bg-white/[0.08] hover:border-white/70',
          'backdrop-blur-[2px]',
        ].join(' '),

        /**
         * GHOST — modern nav/action
         * Understated hover, no borders.
         */
        ghost: [
          'bg-transparent text-brand-white/80',
          'hover:text-brand-white',
          'hover:bg-white/[0.06]',
        ].join(' '),

        // Keep only if you need it for admin; otherwise delete.
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-4 text-[11px]',
        default: 'h-11 px-6 text-[11px]',
        lg: 'h-12 px-8 text-[12px]',
        icon: 'h-11 w-11 p-0',
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
