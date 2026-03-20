import { createMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { Container } from '@/components/layout/container';

export const metadata = createMetadata({
  title: 'Terms of Service',
  description:
    'Terms and conditions for using the Iva Dimitrov Photography website and booking our services.',
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using our website or booking a session."
      />
      <main className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12 text-brand-white/70 leading-relaxed">
            <p className="text-sm text-brand-white/40">
              Last updated: 20 March 2026
            </p>

            <Section title="1. Introduction">
              <p>
                These terms and conditions govern your use of the Iva Dimitrov
                Photography website (journeylifephotography.com) and the photography
                services we offer. By using our website or booking a session, you
                agree to these terms.
              </p>
            </Section>

            <Section title="2. Services">
              <p>
                Iva Dimitrov Photography provides professional photography services
                including but not limited to wedding, family, corporate, travel,
                branding, and architectural photography. The specific details of each
                session — including duration, location, deliverables, and pricing —
                will be agreed upon prior to booking.
              </p>
            </Section>

            <Section title="3. Bookings &amp; Payments">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  A booking is confirmed once a signed agreement and deposit have been
                  received.
                </li>
                <li>
                  Deposit amounts and payment schedules will be outlined in your
                  individual booking agreement.
                </li>
                <li>
                  Final payment is due on or before the date specified in the
                  agreement.
                </li>
              </ul>
            </Section>

            <Section title="4. Cancellations &amp; Rescheduling">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Cancellations made more than 30 days before the session date are
                  eligible for a partial refund (minus the deposit).
                </li>
                <li>
                  Cancellations made within 30 days of the session date are
                  non-refundable.
                </li>
                <li>
                  We will make reasonable efforts to accommodate rescheduling requests
                  subject to availability.
                </li>
                <li>
                  In the unlikely event that we need to cancel, we will offer a full
                  refund or an alternative date.
                </li>
              </ul>
            </Section>

            <Section title="5. Copyright &amp; Image Usage">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  All photographs remain the intellectual property of Iva Dimitrov
                  Photography.
                </li>
                <li>
                  Clients receive a personal, non-commercial licence to use delivered
                  images for private purposes (printing, social media, etc.).
                </li>
                <li>
                  Images may not be sold, used for commercial purposes, or submitted
                  to competitions without prior written consent.
                </li>
                <li>
                  We reserve the right to use photographs for portfolio, marketing,
                  and social media purposes unless otherwise agreed in writing.
                </li>
              </ul>
            </Section>

            <Section title="6. Image Delivery">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Edited images are typically delivered within the timeframe specified
                  in your booking agreement.
                </li>
                <li>
                  Images are delivered digitally via an online gallery or download
                  link.
                </li>
                <li>
                  Raw, unedited files are not provided unless explicitly agreed upon.
                </li>
              </ul>
            </Section>

            <Section title="7. Limitation of Liability">
              <p>
                While we take every precaution to ensure the safety of your images, we
                are not liable for loss or damage caused by equipment failure, acts of
                God, or circumstances beyond our control. Our total liability shall
                not exceed the amount paid for the session.
              </p>
            </Section>

            <Section title="8. Website Use">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  The content on this website — including text, images, and design —
                  is protected by copyright.
                </li>
                <li>
                  You may not reproduce, distribute, or use any content from this site
                  without prior written permission.
                </li>
                <li>
                  We reserve the right to modify or discontinue any part of the
                  website at any time.
                </li>
              </ul>
            </Section>

            <Section title="9. Governing Law">
              <p>
                These terms are governed by and construed in accordance with the laws
                of England and Wales. Any disputes shall be subject to the exclusive
                jurisdiction of the courts of England and Wales.
              </p>
            </Section>

            <Section title="10. Changes to These Terms">
              <p>
                We may update these terms from time to time. Changes take effect once
                posted on this page. Continued use of the website or our services
                after changes are posted constitutes acceptance of the revised terms.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                If you have any questions about these terms, please contact us at{' '}
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
