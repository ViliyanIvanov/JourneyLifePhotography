import { SectionShell } from '@/components/ui/section-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ReactNode } from 'react';

interface ContactInfo {
  icon: typeof Mail;
  title: string;
  content: string | ReactNode;
  href?: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: 'Email',
    content: 'info@journeylifephotography.com',
    href: 'mailto:info@journeylifephotography.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+44 (0) 123 456 7890',
    href: 'tel:+441234567890',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Available for shoots throughout the UK',
  },
];

function ContactInfoCard({ info }: { info: ContactInfo }) {
  const Icon = info.icon;
  const content = info.href ? (
    <a
      href={info.href}
      className="hover:text-brand-white transition-colors"
    >
      {info.content}
    </a>
  ) : (
    info.content
  );

  return (
    <Card className="border-2 border-brand-white/10 bg-brand-black">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-brand-white" />
          <CardTitle className="font-serif text-brand-white">{info.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-brand-white/70">{content}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function ContactInfoSection() {
  return (
    <SectionShell padding="md">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((info) => (
            <ContactInfoCard key={info.title} info={info} />
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  );
}
