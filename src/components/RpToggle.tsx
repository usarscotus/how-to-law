import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useRp } from '../lib/rp';

export default function RpToggle() {
  const { showRp, toggle } = useRp();
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-muted/60 px-3 py-2 text-sm font-medium text-foreground transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-pressed={showRp}
    >
      {showRp ? <ShieldCheck className="h-4 w-4" aria-hidden /> : <ShieldAlert className="h-4 w-4" aria-hidden />}
      <span>{showRp ? 'RP view on' : 'RP view off'}</span>
    </button>
  );
}
