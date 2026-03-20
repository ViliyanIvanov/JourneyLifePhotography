'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLeft = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
];

const navRight = [
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];

const navigation = [...navLeft, ...navRight];

/* ─────────────────────────────────────────────
   Desktop nav link with hover lift + accent dot
   ───────────────────────────────────────────── */
function NavLink({
  item,
  isActive,
}: {
  item: { name: string; href: string };
  isActive: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex flex-col items-center"
    >
      <Link
        href={item.href}
        data-active={isActive}
        className={cn(
          'text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 whitespace-nowrap',
          isActive
            ? 'text-brand-white font-normal'
            : 'text-brand-white/50 hover:text-brand-white/90 font-light'
        )}
      >
        {item.name}
      </Link>

      {/* Active accent underline */}
      {isActive && (
        <motion.span
          layoutId="nav-underline"
          className="mt-1.5 h-px w-5 bg-brand-accent/70 rounded-full"
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        />
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Desktop split nav — 3-column grid
   ───────────────────────────────────────────── */
function SplitNav({
  leftLinks,
  rightLinks,
  isActive,
}: {
  leftLinks: { name: string; href: string }[];
  rightLinks: { name: string; href: string }[];
  isActive: (href: string) => boolean;
}) {
  return (
    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full relative">
      {/* Left links */}
      <nav className="flex items-center justify-end md:gap-7 lg:gap-10 xl:gap-14">
        {leftLinks.map((item) => (
          <NavLink key={item.name} item={item} isActive={isActive(item.href)} />
        ))}
      </nav>

      {/* Center logo */}
      <Link
        href="/"
        className="relative flex items-center justify-center mx-8 lg:mx-12 group"
        aria-label="Iva Dimitrov Photography"
      >
        {/* Accent glow on hover */}
        <div className="absolute inset-0 rounded-full bg-brand-accent/0 blur-2xl transition-all duration-500 group-hover:bg-brand-accent/10 group-hover:scale-125" />
        <img
          src="/logo.png"
          alt="Iva Dimitrov Photography Logo"
          className="relative h-12 w-12 rounded-full object-cover ring-1 ring-brand-white/[0.08] transition-all duration-500 group-hover:ring-brand-accent/30 group-hover:shadow-[0_0_30px_rgba(196,137,138,0.15)]"
        />
      </Link>

      {/* Right links + Book CTA */}
      <nav className="flex items-center justify-start md:gap-7 lg:gap-10 xl:gap-14">
        {rightLinks.map((item) => (
          <NavLink key={item.name} item={item} isActive={isActive(item.href)} />
        ))}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Button asChild size="sm">
            <Link href="/contact">Book</Link>
          </Button>
        </motion.div>
      </nav>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile menu item
   ───────────────────────────────────────────── */
function MobileNavItem({
  item,
  active,
  index,
  onClose,
}: {
  item: { name: string; href: string };
  active: boolean;
  index: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          'group relative flex flex-col items-center py-3',
          'transition-all duration-300',
          active
            ? 'text-brand-white'
            : 'text-brand-white/45 hover:text-brand-white/80'
        )}
      >
        <span className="text-[13px] tracking-[0.22em] uppercase font-light">
          {item.name}
        </span>

        {/* Active accent underline */}
        {active && (
          <span className="mt-1.5 h-px w-5 bg-brand-accent/70 rounded-full" />
        )}
      </Link>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════
   Header
   ═════════════════════════════════════════════ */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(!isHome);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /**
   * On home page: slide navbar from bottom of viewport to top.
   * Mutates DOM directly to stay in sync with native scroll (no React render delay).
   * Uses rAF to batch updates and avoid layout thrashing.
   */
  useEffect(() => {
    if (!isHome || !headerRef.current) {
      if (headerRef.current) headerRef.current.style.transform = '';
      setIsReady(true);
      return;
    }

    const el = headerRef.current;
    let rafId = 0;

    const update = () => {
      const navHeight = el.offsetHeight;
      const maxOffset = window.innerHeight - navHeight;
      const offset = Math.max(0, maxOffset - window.scrollY);
      el.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = 0;
      });
    };

    update();
    setIsReady(true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId);
    };
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!mobileMenuOpen || !menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'transition-opacity duration-300',
          !isReady && 'opacity-0'
        )}
        style={undefined}
      >
        <div
          className={cn(
            'relative w-full',
            'border-b border-brand-white/[0.06] bg-brand-black/70 backdrop-blur-xl',
            'px-5 sm:px-8 lg:px-12 py-3',
          )}
        >
          {/* Desktop: Split Nav */}
          <SplitNav leftLinks={navLeft} rightLinks={navRight} isActive={isActive} />

          {/* Mobile: Brand name + Animated burger */}
          <div className="flex md:hidden items-center justify-between">
            <Link
              href="/"
              className="group"
              aria-label="Iva Dimitrov Photography"
            >
              <div className="flex flex-col">
                <span className="font-serif text-brand-white text-base tracking-tight italic leading-tight">
                  Iva Dimitrov
                </span>
                <span className="text-[8px] tracking-[0.3em] uppercase text-brand-white/30 font-light">
                  Photography
                </span>
              </div>
            </Link>

            {/* Animated burger — two accent lines that morph to X */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="relative h-10 w-10 flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="absolute h-px w-5 bg-brand-accent/80 rounded-full"
                animate={mobileMenuOpen
                  ? { rotate: 45, y: 0 }
                  : { rotate: 0, y: -3 }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              />
              <motion.span
                className="absolute h-px w-5 bg-brand-accent/80 rounded-full"
                animate={mobileMenuOpen
                  ? { rotate: -45, y: 0 }
                  : { rotate: 0, y: 3 }
                }
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              />
            </button>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />
        </div>
      </header>

      {/* ─── Mobile Menu: Top-down panel ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Scrim — covers area below the panel */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[59] md:hidden bg-brand-black/50"
              onClick={closeMobile}
            />

            {/* Panel — drops down from top */}
            <motion.div
              key="panel"
              ref={menuRef}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className={cn(
                'fixed top-0 left-0 right-0 z-[60] md:hidden',
                'border-b border-brand-white/[0.06]',
                'bg-brand-black/95 backdrop-blur-xl',
                'shadow-[0_20px_60px_rgba(0,0,0,0.5)]',
              )}
            >
              {/* Ambient accent glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-brand-accent/[0.04] blur-[100px] pointer-events-none" />

              {/* Close button — accent X lines matching the burger */}
              <div className="flex items-center justify-end px-5 pt-4">
                <button
                  onClick={closeMobile}
                  className="relative h-10 w-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <span className="absolute h-px w-5 bg-brand-accent/80 rounded-full rotate-45" />
                  <span className="absolute h-px w-5 bg-brand-accent/80 rounded-full -rotate-45" />
                </button>
              </div>

              {/* Brand name — centered */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center pt-2 pb-6"
              >
                <Link href="/" onClick={closeMobile} className="flex flex-col items-center">
                  <span className="font-serif text-brand-white text-xl tracking-tight italic">
                    Iva Dimitrov
                  </span>
                  <span className="text-[9px] tracking-[0.35em] uppercase text-brand-white/30 font-light mt-1">
                    Photography
                  </span>
                </Link>
              </motion.div>

              {/* Accent divider */}
              <div className="mx-10 h-px bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent" />

              {/* Navigation links — centered */}
              <nav className="flex flex-col items-center py-5 gap-0.5">
                {navigation.map((item, i) => (
                  <MobileNavItem
                    key={item.name}
                    item={item}
                    active={isActive(item.href)}
                    index={i}
                    onClose={closeMobile}
                  />
                ))}
              </nav>

              {/* Accent divider */}
              <div className="mx-10 h-px bg-gradient-to-r from-transparent via-brand-white/[0.06] to-transparent" />

              {/* Book CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex justify-center py-5 pb-7"
              >
                <Button asChild size="sm">
                  <Link href="/contact" onClick={closeMobile}>
                    Book a Session
                  </Link>
                </Button>
              </motion.div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
