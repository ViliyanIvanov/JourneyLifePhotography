import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'How Iva Dimitrov Photography collects, uses, and protects your personal information.',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />
      <main className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12 text-brand-white/70 leading-relaxed">
            <p className="text-sm text-brand-white/40">
              Last updated: 20 March 2026
            </p>

            <Section title="1. Who We Are">
              <p>
                Iva Dimitrov Photography (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
                the website journeylifephotography.com. This policy explains how we
                handle your personal data when you visit our site, enquire about our
                services, or book a session.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>
                  <strong className="text-brand-white/90">Contact details</strong> — name, email
                  address, phone number, and any other information you provide via our
                  contact form or email.
                </li>
                <li>
                  <strong className="text-brand-white/90">Booking details</strong> — preferred dates,
                  event type, location, and session requirements.
                </li>
                <li>
                  <strong className="text-brand-white/90">Usage data</strong> — pages visited,
                  browser type, device information, and anonymised analytics collected
                  through cookies or similar technologies.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>Your personal data is used to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Respond to your enquiries and provide quotes.</li>
                <li>Schedule, manage, and deliver photography sessions.</li>
                <li>Send relevant updates about your booking or our services.</li>
                <li>Improve our website and the experience we offer.</li>
              </ul>
              <p className="mt-3">
                We will never sell your personal information to third parties.
              </p>
            </Section>

            <Section title="4. Legal Basis for Processing">
              <p>
                We process your data based on your consent (when you submit a form),
                for the performance of a contract (when you book a session), or where
                we have a legitimate interest in improving our services.
              </p>
            </Section>

            <Section title="5. Data Sharing">
              <p>
                We do not share your personal data except where necessary to deliver
                our services (e.g. a venue or second photographer involved in your
                booking), to comply with legal obligations, or with your explicit
                consent.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain your personal data only for as long as necessary to fulfil
                the purposes outlined above or as required by law. Contact form
                submissions are retained for up to 12 months unless a booking is made.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Access the personal data we hold about you.</li>
                <li>Request correction or deletion of your data.</li>
                <li>Withdraw consent at any time.</li>
                <li>Object to processing based on legitimate interests.</li>
                <li>Request a portable copy of your data.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at{' '}
                <a
                  href="mailto:info@journeylifephotography.com"
                  className="text-brand-accent hover:text-brand-accent/80 transition-colors"
                >
                  info@journeylifephotography.com
                </a>
                .
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                Our website may use essential cookies to ensure proper functionality
                and analytics cookies to understand how visitors interact with the
                site. You can control cookie preferences through your browser settings.
              </p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>
                We may update this policy from time to time. Any changes will be
                posted on this page with an updated revision date.
              </p>
            </Section>

            <Section title="10. Contact">
              <p>
                If you have any questions about this privacy policy, please contact us
                at{' '}
                <a
                  href="mailto:info@journeylifephotography.com"
                  className="text-brand-accent hover:text-brand-accent/80 transition-colors"
                >
                  info@journeylifephotography.com
                </a>
                .
              </p>
            </Section>
          </div>
        </Container>
      </main>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl md:text-2xl text-brand-white mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
