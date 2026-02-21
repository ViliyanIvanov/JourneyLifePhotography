'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  scale?: boolean;
}

export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 60,
  scale = false,
}: SplitTextProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
    fallbackInView: true,
  });

  const words = text.split(' ').filter(Boolean);

  return (
    <div ref={ref} className={cn(className)} role="text" aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={cn(
              'inline-block overflow-hidden align-baseline',
              index < words.length - 1 ? 'mr-[0.25em]' : ''
            )}
          >
            <span
              className={cn(
                'inline-block will-change-transform transition-[transform,opacity] duration-500 ease-out',
                inView
                  ? 'translate-y-0 opacity-100 scale-100'
                  : scale
                    ? 'translate-y-[1em] opacity-0 scale-[1.1]'
                    : 'translate-y-[0.7em] opacity-0'
              )}
              style={{ transitionDelay: `${delay + index * stagger}ms` }}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}
