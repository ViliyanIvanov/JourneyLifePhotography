'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useGlobalLoading } from '@/components/ui/global-loading';

const LOADER_DELAY_MS = 200;

function useDelayedVisibility(isActive: boolean, delayMs: number) {
  const [isVisible, setIsVisible] = useState(false);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isActive) {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
      }

      delayRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delayMs);
    } else {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }

      setIsVisible(false);
    }

    return () => {
      if (delayRef.current) {
        clearTimeout(delayRef.current);
        delayRef.current = null;
      }
    };
  }, [isActive, delayMs]);

  return isVisible;
}

function useInitialLoadBlocking() {
  // Do NOT block the initial render. Next.js SSR already delivers a fully
  // painted HTML page. Waiting for window.load on a photo-heavy site means
  // 1–3+ seconds of a black overlay — the #1 cause of perceived slowness.
  // Route-change loading is still handled by useRouteNavigation below.
  return false;
}

function useRouteNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ?? '';
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    setIsRouteLoading(false);
  }, [pathname, search]);

  useEffect(() => {
    const shouldTrigger = (href?: string | URL | null) => {
      if (!href) {
        return true;
      }

      try {
        const url = new URL(href.toString(), window.location.href);
        return (
          url.origin === window.location.origin &&
          (url.pathname !== window.location.pathname ||
            url.search !== window.location.search ||
            url.hash !== window.location.hash)
        );
      } catch {
        return true;
      }
    };

    const handleStart = (href?: string | URL | null) => {
      if (shouldTrigger(href)) {
        setIsRouteLoading(true);
      }
    };

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = (event.target as HTMLElement | null)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      const isUrlAction =
        href?.startsWith('#') ||
        href?.startsWith('mailto:') ||
        href?.startsWith('tel:') ||
        href?.startsWith('javascript:');

      if (isUrlAction) {
        return;
      }

      handleStart(href);
    };

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      handleStart(args[2]);
      return originalPushState.apply(this, args as never);
    };

    history.replaceState = function (...args) {
      handleStart(args[2]);
      return originalReplaceState.apply(this, args as never);
    };

    const handlePopstate = () => handleStart(window.location.href);
    window.addEventListener('popstate', handlePopstate);
    document.addEventListener('click', handleAnchorClick, true);

    return () => {
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handlePopstate);
      document.removeEventListener('click', handleAnchorClick, true);
    };
  }, []);

  return isRouteLoading;
}

export function GlobalLoader() {
  const { isGlobalLoading } = useGlobalLoading();
  const isInitialLoading = useInitialLoadBlocking();
  const isRouteLoading = useRouteNavigation();
  const shouldShow = isInitialLoading || isRouteLoading || isGlobalLoading;
  const isVisible = useDelayedVisibility(shouldShow, LOADER_DELAY_MS);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVisible]);

  const className = useMemo(
    () =>
      [
        'fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-400 ease-in-out',
        isVisible ? 'opacity-100 animate-loader-overlay' : 'pointer-events-none opacity-0',
      ].join(' '),
    [isVisible]
  );

  return (
    <div className={className} aria-hidden={!isVisible}>
      <div className="flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Iva Dimitrov Photography"
          className="h-64 w-64 rounded-full animate-loader-pulse opacity-100"
        />
      </div>
    </div>
  );
}
