import { ReactNode, useState } from 'react';
import { AlertTriangle, Lightbulb, Scale } from 'lucide-react';
import { cx } from '../lib/utils';
import { useRp } from '../lib/rp';

type CalloutProps = {
  kind: 'rp' | 'tip' | 'warn';
  title?: string;
  baseline?: ReactNode;
  rule?: ReactNode;
  children?: ReactNode;
};

const styles = {
  tip: 'border-sky-300/60 bg-sky-50/60 text-sky-900 dark:border-sky-700/80 dark:bg-sky-900/40 dark:text-sky-100',
  warn: 'border-amber-300/70 bg-amber-50/70 text-amber-900 dark:border-amber-700/80 dark:bg-amber-900/40 dark:text-amber-100',
  rp: 'border-violet-300/60 bg-violet-50/70 text-violet-900 dark:border-violet-700/80 dark:bg-violet-900/40 dark:text-violet-100'
};

const icons = {
  tip: Lightbulb,
  warn: AlertTriangle,
  rp: Scale
};

export default function Callout({ kind, title, baseline, rule, children }: CalloutProps) {
  const Icon = icons[kind];
  const { showRp } = useRp();
  const [expanded, setExpanded] = useState(kind !== 'rp');

  return (
    <section className={cx('my-8 rounded-2xl border p-6 shadow-subtle', styles[kind])}>
      <header className="flex items-center gap-3">
        <Icon className="h-6 w-6" aria-hidden />
        <div>
          <h3 className="text-base font-semibold">
            {title ?? (kind === 'tip' ? 'Roleplay tip' : kind === 'warn' ? 'Caution' : 'RP divergence')}
          </h3>
          {kind === 'rp' && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-xs font-medium text-violet-200 underline-offset-4 hover:underline"
              aria-expanded={expanded}
            >
              {expanded ? 'Hide details' : 'Show baseline vs RP rule'}
            </button>
          )}
        </div>
      </header>
      <div className="mt-4 text-sm leading-relaxed">
        {kind === 'rp' && showRp ? (
          expanded && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide">Baseline US law</h4>
                <div className="mt-2 rounded-xl border border-white/20 bg-white/10 p-3 text-sm shadow-inner dark:border-white/10 dark:bg-black/20">
                  {baseline}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wide">RP rule</h4>
                <div className="mt-2 rounded-xl border border-white/20 bg-white/10 p-3 text-sm shadow-inner dark:border-white/10 dark:bg-black/20">
                  {rule}
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            {children ?? (
              <p className="text-sm text-muted">
                RP view is off. Toggle it back on from the header to compare with baseline US law.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
