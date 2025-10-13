import type { PropsWithChildren } from 'react';
import { AlertTriangle, Info, Lightbulb } from 'lucide-react';

export type CalloutKind = 'note' | 'tip' | 'warn';

const variantStyles: Record<CalloutKind, { icon: JSX.Element; className: string; heading: string }> = {
  note: {
    icon: <Info className="h-5 w-5" aria-hidden="true" />,
    className: 'border-accent/40 bg-accent/5 text-foreground',
    heading: 'Note'
  },
  tip: {
    icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
    className: 'border-emerald-400/40 bg-emerald-500/5 text-foreground',
    heading: 'Practice Tip'
  },
  warn: {
    icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
    className: 'border-amber-400/50 bg-amber-500/10 text-foreground',
    heading: 'Caution'
  }
};

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
}

export default function Callout({
  kind = 'note',
  title,
  children
}: PropsWithChildren<CalloutProps>) {
  const variant = variantStyles[kind];
  return (
    <aside
      className={`not-prose mt-6 flex items-start gap-3 rounded-2xl border p-4 shadow-subtle ${variant.className}`}
      role={kind === 'warn' ? 'alert' : 'note'}
    >
      <span className="mt-1 text-accent" aria-hidden="true">
        {variant.icon}
      </span>
      <div className="space-y-2 text-sm leading-relaxed">
        <p className="font-semibold text-foreground">
          {title ?? variant.heading}
        </p>
        <div className="text-foreground/90">{children}</div>
      </div>
    </aside>
  );
}
