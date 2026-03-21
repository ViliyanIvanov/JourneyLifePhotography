import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-[13px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-brand-white/20 flex-shrink-0" />
              )}
              {isLast ? (
                <span className="text-brand-white/50 truncate max-w-[200px]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-brand-white/30 hover:text-brand-accent transition-colors duration-300"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
