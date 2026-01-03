import { Container } from './container';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        // Leave space for sticky header
        'bg-brand-black text-brand-white pt-24 md:pt-28 pb-14 md:pb-20 border-b border-brand-emerald/20',
        className
      )}
    >
      <Container>

        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg md:text-xl text-brand-white/75 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
