import Link from 'next/link';
import { Container } from './container';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
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
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-serif">Iva Dimitrov Photography</h3>
              <p className="text-sm text-brand-white/70">
                Capturing life&apos;s precious moments with professional photography
                services.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-brand-white/70 hover:text-brand-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Main Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold font-serif">Navigation</h4>
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
              <h4 className="mb-4 text-sm font-semibold font-serif">Contact</h4>
              <ul className="space-y-2 text-sm text-brand-white/70">
                <li>
                  <Link href="/contact" className="hover:text-brand-white transition-colors">
                    Get in Touch
                  </Link>
                </li>
                <li>Email: info@journeylifephotography.com</li>
                <li>Phone: +44 (0) 123 456 7890</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4 text-sm font-semibold font-serif">Legal</h4>
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

