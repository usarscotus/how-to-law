import type { PropsWithChildren, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CaseCardProps {
  title: string;
  href: string;
  description: string;
  badge?: ReactNode;
}

export default function CaseCard({ title, href, description, badge }: PropsWithChildren<CaseCardProps>) {
  return (
    <a
      href={href}
      className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-subtle transition hover:-translate-y-1 hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-accent" aria-hidden="true" />
        </div>
        {badge ? <div className="text-xs uppercase tracking-wide text-muted">{badge}</div> : null}
        <p className="text-sm text-foreground/90">{description}</p>
      </div>
    </a>
  );
}
