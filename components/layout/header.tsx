'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container } from './container';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'PORTFOLIO', href: '/portfolio' },
  { name: 'SERVICES', href: '/services' },
  { name: 'BLOG', href: '/blog' },
  { name: 'ABOUT', href: '/about' },
];

/**
 * Tuning knobs
 * - Thresholds: how far to scroll before docking to top
 * - Smooth: how "springy" the float follows the anchor
 * - Deadzone: ignore tiny changes to prevent micro-jiggle
 */
function SlidingNav({ navigation, isActive }: { navigation: { name: string; href: string }[]; isActive: (href: string) => boolean }) {
  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [hasIndicator, setHasIndicator] = useState(false);
  const pathname = usePathname();

  const updateIndicator = useCallback(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
      setHasIndicator(true);
    } else {
      setHasIndicator(false);
    }
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [pathname, updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <nav ref={navRef} className="hidden md:flex items-center gap-8 relative">
      {hasIndicator && (
        <motion.div
          className="absolute -bottom-2 h-px bg-brand-white"
          animate={{ left: indicator.left, width: indicator.width }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      {navigation.map((item) => {
        const active = isActive(item.href);
        return (
          <motion.div key={item.name} whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link
              href={item.href}
              data-active={active}
              className={cn(
                'relative text-[11px] tracking-[0.28em] uppercase font-light transition-colors',
                active ? 'text-brand-white' : 'text-brand-white/70 hover:text-brand-white'
              )}
            >
              {item.name}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}

const SCROLL_THRESHOLD = 600;
const SCROLL_UNDOCK = 500;

const SMOOTHING = 0.20; // 0.10 = slower, 0.22 = snappier
const DEADZONE_PX = 2; // ignore tiny deltas to stop micro jiggle
const CLAMP_TOP = 14;
const CLAMP_BOTTOM_PADDING = 96;

const FALLBACK_VH_DESKTOP = 0.90;
const FALLBACK_VH_MOBILE = 0.82;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(!isHome); // Non-home pages start docked
  const [renderY, setRenderY] = useState(0);
  const [isReady, setIsReady] = useState(false); // Track when positioning is ready

  const menuRef = useRef<HTMLDivElement>(null);

  // refs for smooth animation loop
  const targetYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const lastSetRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /**
   * Dock / undock logic (hysteresis)
   */
  useEffect(() => {
    if (!isHome) {
      setIsDocked(true);
      setRenderY(0);
      targetYRef.current = 0;
      currentYRef.current = 0;
      lastSetRef.current = 0;
      return;
    }

    let timeoutId: number | null = null;

    const onScroll = () => {
      const y = window.scrollY || 0;
      lastScrollY.current = y;

      // Clear any pending state change
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      // Debounce the dock state change to prevent wiggle
      timeoutId = window.setTimeout(() => {
        const currentY = lastScrollY.current;

        if (isDocked) {
          if (currentY < SCROLL_UNDOCK) setIsDocked(false);
        } else {
          if (currentY > SCROLL_THRESHOLD) setIsDocked(true);
        }
      }, 50);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [isDocked, isHome]);

  /**
   * Compute targetY continuously:
   * - if page has #nav-anchor => follow it
   * - else => follow viewport fallback (e.g. 90vh / 82vh)
   */
  useEffect(() => {
    if (!isHome) {
      setIsReady(true);
      return;
    }

    let raf = 0;

    const computeTarget = () => {
      const anchor = document.getElementById('nav-anchor');

      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        const clamped = Math.min(
          Math.max(rect.top, CLAMP_TOP),
          window.innerHeight - CLAMP_BOTTOM_PADDING
        );
        targetYRef.current = clamped;
        return;
      }

      const vh = window.innerWidth < 768 ? FALLBACK_VH_MOBILE : FALLBACK_VH_DESKTOP;
      targetYRef.current = Math.round(window.innerHeight * vh);
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        computeTarget();
      });
    };

    // ✅ IMPORTANT: initialize position immediately
    computeTarget();
    const initial = Math.round(targetYRef.current);
    currentYRef.current = initial;
    lastSetRef.current = initial;
    setRenderY(initial);

    // Small delay before showing to ensure position is calculated
    requestAnimationFrame(() => {
      setIsReady(true);
    });

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);
  

  /**
   * Smoothly animate currentY -> targetY
   * - deadzone filters tiny changes
   * - snap to full pixels for stability
   */
  useEffect(() => {
    if (!isHome) return;
    const tick = () => {
      const desired = isDocked ? 0 : targetYRef.current;
      const current = currentYRef.current;

      const delta = desired - current;

      // If delta is tiny, treat as 0 to avoid micro jiggle
      const effectiveDelta = Math.abs(delta) < DEADZONE_PX ? 0 : delta;

      // Lerp toward target
      const next = current + effectiveDelta * SMOOTHING;

      currentYRef.current = next;

      // Round to whole pixels for stability
      const rounded = Math.round(next);

      // Only set state if changed enough (avoid too many renders)
      if (Math.abs(rounded - lastSetRef.current) >= 1) {
        lastSetRef.current = rounded;
        setRenderY(rounded);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDocked, isHome]);

  /**
   * Close mobile menu on route change
   */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  /**
   * Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  /**
   * Close menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen) return;
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const isFloating = !isDocked;

  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'transition-[background-color,backdrop-filter,border-radius,box-shadow,opacity] duration-500 ease-out',
          !isReady && isHome && 'opacity-0'
        )}
        style={{
          transform: `translateY(${renderY}px)`,
          willChange: 'transform',
        }}
      >
        {isFloating ? (
          <Container className="max-w-5xl">
            <div
              className={cn(
                'flex items-center justify-between gap-4',
                'transition-all duration-500 ease-out',
                'rounded-full border border-brand-white/15 bg-brand-black/35 backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.40)] px-5 md:px-7 py-3 md:py-4'
              )}
            >
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 group py-0"
                aria-label="Iva Dimitrov Photography"
              >
                <img
                  src="/logo.png"
                  alt="Iva Dimitrov Photography Logo"
                  className="h-8 w-8 rounded-full object-cover group-hover:opacity-80 transition-opacity"
                />
                <span className="font-serif text-brand-white text-base md:text-lg tracking-tight">
                  Iva Dimitrov Photography
                </span>
              </Link>

              <SlidingNav navigation={navigation} isActive={isActive} />

              {/* Actions */}
              <div className="flex items-center gap-3">
                <div className="hidden md:block">
                  <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Button asChild size="sm">
                      <Link href="/contact">Book</Link>
                    </Button>
                  </motion.div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-brand-white hover:text-brand-white/80 hover:bg-transparent"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </Container>
        ) : (
          <div
            className={cn(
              'flex items-center justify-between gap-4 w-full',
              'transition-all duration-500 ease-out',
              'border-b border-brand-white/10 bg-brand-black/75 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Iva Dimitrov Photography"
            >
              <img
                src="/logo.png"
                alt="Iva Dimitrov Photography Logo"
                className="h-8 w-8 rounded-full object-cover group-hover:opacity-80 transition-opacity"
              />
              <span className="font-serif text-brand-white text-base md:text-lg tracking-tight">
                Iva Dimitrov Photography
              </span>
            </Link>

            <SlidingNav navigation={navigation} isActive={isActive} />

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <Button asChild size="sm">
                    <Link href="/contact">Book</Link>
                  </Button>
                </motion.div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-brand-white hover:text-brand-white/80 hover:bg-transparent"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
<div
  className={cn(
    'fixed inset-0 z-[60] md:hidden',
    'bg-brand-black/80 backdrop-blur-md',
    'transition-opacity duration-300',
    mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
  )}
>
  <div ref={menuRef} className="h-full">
    <Container className="h-full py-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="font-serif text-brand-white text-lg tracking-tight">
            Iva Dimitrov
          </span>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="text-brand-white hover:text-brand-white/80 hover:bg-transparent"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Drawer */}
      <div className="mt-5 rounded-2xl border border-brand-white/10 bg-brand-black/55 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
        <nav className="flex flex-col">
          {navigation.map((item, i) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center justify-between px-5 py-4',
                  'text-base font-normal tracking-normal', // ✅ no wide letter spacing
                  'transition-[background-color,transform,opacity,color] duration-300',
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                  active
                    ? 'text-brand-white bg-brand-white/5'
                    : 'text-brand-white/85 hover:text-brand-white hover:bg-brand-white/5'
                )}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <span className={cn(active ? 'font-medium' : '')}>{item.name}</span>

                {/* Active indicator */}
                {active ? (
                  <span className="h-2 w-2 rounded-full bg-brand-white" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider + CTA */}
        <div className="border-t border-brand-white/10 p-4">
          <Button
            asChild
            size="lg"
            className="w-full"
          >
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Book a Session
            </Link>
          </Button>

          <p className="mt-3 text-xs text-brand-white/50 leading-relaxed">
            Available for weddings, portraits, corporate & editorial shoots.
          </p>
        </div>
      </div>
    </Container>
  </div>
</div>

    </>
  );
}
