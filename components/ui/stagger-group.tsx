'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  scale?: number;
  threshold?: number;
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.15,
  y = 50,
  scale = 0.92,
  threshold = 0.2,
}: StaggerGroupProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
    fallbackInView: true,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 50,
  scale = 0.92,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y, scale },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
