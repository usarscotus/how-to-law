import { useEffect, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';

const STORAGE_KEY = 'htl:theme';

type Theme = 'light' | 'dark' | 'system';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  const resolved = theme === 'system' ? getSystemTheme() : theme;
  document.documentElement.classList.toggle('dark', resolved === 'dark');
  document.documentElement.setAttribute('data-theme', resolved);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme('system');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  const nextTheme: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const label = `Theme: ${theme}. Activate to switch to ${nextTheme}`;

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-muted/60 bg-card text-foreground shadow-subtle transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={label}
    >
      {theme === 'dark' ? <MoonStar className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  );
}
