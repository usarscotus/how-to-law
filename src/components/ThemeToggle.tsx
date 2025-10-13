import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'htl:theme';

type ThemeOption = 'system' | 'light' | 'dark';

const options: { value: ThemeOption; label: string; icon: JSX.Element }[] = [
  { value: 'system', label: 'System', icon: <Monitor aria-hidden="true" className="h-4 w-4" /> },
  { value: 'light', label: 'Light', icon: <Sun aria-hidden="true" className="h-4 w-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon aria-hidden="true" className="h-4 w-4" /> }
];

function resolveTheme(theme: ThemeOption) {
  if (typeof window === 'undefined') return 'light';
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function applyTheme(theme: ThemeOption) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const resolved = resolveTheme(theme);
  root.classList.toggle('dark', resolved === 'dark');
  root.dataset.theme = resolved;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeOption>('system');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeOption | null;
      if (stored) {
        setTheme(stored);
      }
    } catch (error) {
      console.warn('Unable to read theme preference', error);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      console.warn('Unable to store theme preference', error);
    }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme('system');
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  return (
    <fieldset className="relative">
      <legend className="sr-only">Color theme</legend>
      <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-subtle">
        {options.map((option) => {
          const isActive = theme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTheme(option.value)}
              className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'bg-accent text-accent-foreground shadow-subtle'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
