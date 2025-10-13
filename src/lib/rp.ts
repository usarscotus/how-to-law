import { useCallback, useEffect, useState } from 'react';

type RpState = {
  showRp: boolean;
  toggle: () => void;
  set: (value: boolean) => void;
};

const STORAGE_KEY = 'htl:rp:show';
const EVENT_KEY = 'rp:toggle';

function readInitial(): boolean {
  if (typeof window === 'undefined') return true;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return true;
  return raw !== 'false';
}

export function useRp(): RpState {
  const [showRp, setShowRp] = useState(readInitial);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<boolean>).detail;
      setShowRp(detail);
    };
    window.addEventListener(EVENT_KEY, listener);
    setShowRp(readInitial());
    return () => {
      window.removeEventListener(EVENT_KEY, listener);
    };
  }, []);

  const persist = useCallback((value: boolean) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: value }));
  }, []);

  return {
    showRp,
    toggle: () => persist(!showRp),
    set: (value: boolean) => persist(value)
  };
}
