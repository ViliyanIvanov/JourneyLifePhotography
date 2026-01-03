import { cn } from '@/lib/utils';

interface NavAnchorProps {
  desktopVh?: number;
  mobileVh?: number;
  className?: string;
}

export function NavAnchor({
  desktopVh = 90,
  mobileVh = 100,
  className,
}: NavAnchorProps) {
  return (
    <div
      id="nav-anchor"
      aria-hidden="true"
      className={cn('pointer-events-none absolute left-0 right-0', className)}
      style={{
        '--nav-anchor-vh': mobileVh,
        '--nav-anchor-vh-desktop': desktopVh,
      } as React.CSSProperties}
    />
  );
}
