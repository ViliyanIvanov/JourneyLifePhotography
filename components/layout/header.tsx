'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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

function SlidingNav({
  navigation,
  isActive,
}: {
  navigation: { name: string; href: string }[];
  isActive: (href: string) => boolean;
}) {
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
   */
  useEffect(() => {
    if (!isHome || !headerRef.current) {
      if (headerRef.current) headerRef.current.style.transform = '';
      setIsReady(true);
      return;
    }

    const el = headerRef.current;

    const update = () => {
      const navHeight = el.offsetHeight;
      const maxOffset = window.innerHeight - navHeight;
      const offset = Math.max(0, maxOffset - window.scrollY);
      el.style.transform = `translateY(${offset}px)`;
    };

    update();
    setIsReady(true);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
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

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed left-0 right-0 top-0 z-50',
          'transition-opacity duration-300',
          !isReady && 'opacity-0'
        )}
        style={{ willChange: isHome ? 'transform' : undefined }}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4 w-full',
            'border-b border-brand-white/10 bg-brand-black/75 backdrop-blur-md',
            'px-4 sm:px-6 lg:px-8 py-4',
            'shadow-[0_10px_30px_rgba(0,0,0,0.25)]'
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
          <div className="h-full px-4 sm:px-6 py-5">
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
                        'text-base font-normal tracking-normal',
                        'transition-[background-color,transform,opacity,color] duration-300',
                        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                        active
                          ? 'text-brand-white bg-brand-white/5'
                          : 'text-brand-white/85 hover:text-brand-white hover:bg-brand-white/5'
                      )}
                      style={{ transitionDelay: `${i * 45}ms` }}
                    >
                      <span className={cn(active ? 'font-medium' : '')}>{item.name}</span>
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
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Book a Session
                  </Link>
                </Button>
                <p className="mt-3 text-xs text-brand-white/50 leading-relaxed">
                  Available for weddings, portraits, corporate & editorial shoots.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
