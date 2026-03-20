'use client';

import { useRef, ReactNode, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };

export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * maxTilt);
      rotateY.set(x * maxTilt);
    },
    [maxTilt, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <div ref={ref} className={className} style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
