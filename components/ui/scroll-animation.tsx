'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element enters FROM: 'up' = from below, 'left' = from the left, etc. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  effect?: 'float' | 'slide' | 'mask';
  threshold?: number;
}

const directionOffsets = {
  up: { y: 55 },
  down: { y: -55 },
  left: { x: -50 },
  right: { x: 50 },
  fade: {},
};

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  effect = 'float',
  threshold = 0.15,
}: ScrollAnimationProps) {
  const prefersReduced = useReducedMotion();
  const isFloat = effect === 'float';

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  if (prefersReduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  const hidden = {
    opacity: 0,
    scale: isFloat ? 0.92 : 1,
    ...directionOffsets[direction],
  };

  const visible = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}
