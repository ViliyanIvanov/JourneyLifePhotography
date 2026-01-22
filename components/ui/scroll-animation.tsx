'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  effect?: 'float' | 'slide' | 'mask';
  threshold?: number;
}

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  effect = 'float',
  threshold = 0.35,
}: ScrollAnimationProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    fallbackInView: false, // Disable fallback to ensure scroll-based triggering
    rootMargin: '0px 0px -10% 0px', // Trigger when element is 10% into viewport
  });

  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  const isMask = effect === 'mask';
  const isFloat = effect === 'float';
  const directionClasses = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    fade: '',
  };

  const shouldShow = hasEntered;

  return (
    <div
      ref={ref}
      className={cn(
        isMask
          ? 'transition-[opacity,transform,clip-path] duration-700 ease-out will-change-transform'
          : 'transition-[opacity,transform,filter] duration-700 ease-out will-change-transform',
        shouldShow
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0'
          : isMask
            ? 'opacity-0 translate-y-4'
            : isFloat
              ? 'opacity-0 translate-y-6 scale-[0.98] blur-[2px]'
              : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={{
        transitionDelay: shouldShow ? `${delay}ms` : '0ms',
        ...(isMask
          ? {
              clipPath: shouldShow ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
              WebkitClipPath: shouldShow ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
}
