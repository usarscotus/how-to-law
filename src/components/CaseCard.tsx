import { ExternalLink } from 'lucide-react';
import { ReactNode } from 'react';
import { cx } from '../lib/utils';

type CaseCardProps = {
  title: string;
  court: string;
  year: number;
  summary: ReactNode;
  href: string;
  className?: string;
};

export default function CaseCard({ title, court, year, summary, href, className }: CaseCardProps) {
  return (
    <article
      className={cx(
        'flex h-full flex-col justify-between rounded-2xl border border-muted/60 bg-card/70 p-6 shadow-subtle transition hover:border-accent',
        className
      )}
    >
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted">{court} · {year}</p>
        <div className="text-sm leading-relaxed text-foreground/80">{summary}</div>
      </div>
      <a
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        Read case <ExternalLink className="h-4 w-4" />
      </a>
    </article>
  );
}
