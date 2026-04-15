import Link from 'next/link';
import { Container } from './container';
import { Instagram } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ivayladimitrov/' },
];

const footerLinks = {
  main: [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-brand-white/10 bg-transparent text-brand-white">
      <Container>
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-serif">Iva Dimitrov Photography</h3>
              <p className="text-sm text-brand-white/70">
                Capturing life&apos;s precious moments with professional photography
                services.
              </p>
              <div className="flex items-center">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="group inline-flex items-center gap-2.5 text-brand-white/70 transition-colors duration-300 hover:text-brand-white"
                      {...(social.href === '#' ? { rel: 'nofollow', tabIndex: -1 } : { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-sm font-semibold font-serif tracking-wide">@ivayladimitrov</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Main Links */}
            <div>
              <h4 className="mb-4 text-base font-semibold font-serif">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.main.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-white/70 hover:text-brand-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-base font-semibold font-serif">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-white/70">
                <li>
                  <Link href="/contact" className="hover:text-brand-white transition-colors">
                    Get in Touch
                  </Link>
                </li>
                <li>Email: info@ivadimitrovphotography.com</li>
                <li>Phone: +44 7907 977441</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-base font-semibold font-serif">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-white/70 hover:text-brand-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-brand-white/10 pt-8 text-center text-sm text-brand-white/70">
            <p>
              &copy; {new Date().getFullYear()} Iva Dimitrov Photography. All
              rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

