import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap select-none',
    'rounded-2xl',
    // modern type feel (no all caps)
    'font-semibold tracking-[0.01em]',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-150 ease-out',
    'will-change-transform',
    'hover:scale-[1.02] active:scale-[0.98] active:duration-75',
    // focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald/55 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    // disabled
    'disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:scale-100',
  ].join(' '),
  {
    variants: {
      variant: {
        /**
         * PRIMARY — modern luxury (quiet, not glossy)
         * Reads like a design brand: flat, confident, minimal.
         */
        default: [
          'bg-gradient-to-b from-brand-emerald to-brand-emerald/85 text-brand-white',
          'ring-1 ring-inset ring-white/10',
          'shadow-[0_12px_30px_-20px_rgba(0,0,0,0.6)]',
          'hover:from-brand-emerald/95 hover:to-brand-emerald/75',
          'hover:shadow-[0_16px_34px_-20px_rgba(0,0,0,0.7)]',
          'active:translate-y-[1px] active:shadow-[0_8px_22px_-14px_rgba(0,0,0,0.65)]',
        ].join(' '),

        /**
         * SECONDARY — glass outline (modern + premium on photos)
         * No heavy blur; just a whisper of translucency.
         */
        secondary: [
          'bg-white/[0.06] text-brand-white/90',
          'border border-white/35',
          'shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)]',
          'hover:bg-white/[0.12] hover:border-white/55 hover:text-brand-white',
          'active:translate-y-[1px]',
          'backdrop-blur-[2px]',
        ].join(' '),

        /**
         * GHOST — modern nav/action
         * Understated hover, no borders.
         */
        ghost: [
          'bg-transparent text-brand-white/70',
          'hover:text-brand-white hover:bg-white/[0.08]',
        ].join(' '),

        // Keep only if you need it for admin; otherwise delete.
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-4 text-[12px]',
        default: 'h-11 px-6 text-[13px]',
        lg: 'h-12 px-8 text-[14px]',
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
