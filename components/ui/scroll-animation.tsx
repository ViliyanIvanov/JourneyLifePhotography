'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  effect?: 'float' | 'slide' | 'mask';
  threshold?: number;
}

const directionOffsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  fade: {},
};

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = 'up',
  effect = 'float',
  threshold = 0.35,
}: ScrollAnimationProps) {
  const isFloat = effect === 'float';

  // Prevent SSR rendering elements as invisible.
  // On server & first client render: initial=false → element renders visible.
  // After mount: initial switches to the hidden state so whileInView can animate.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const hidden = {
    opacity: 0,
    filter: isFloat ? 'blur(4px)' : 'blur(0px)',
    scale: isFloat ? 0.98 : 1,
    ...directionOffsets[direction],
  };

  const visible = {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      className={cn(className)}
      initial={mounted ? hidden : false}
      whileInView={visible}
      viewport={{ once: true, amount: threshold }}
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
