import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,md,mdx,tsx,ts}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--fg)',
        muted: 'var(--muted)',
        ring: 'var(--ring)',
        card: 'var(--card)',
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        }
      },
      fontFamily: {
        sans: ['"Inter var"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        subtle: '0 10px 30px -20px rgba(15, 23, 42, 0.3)'
      },
      keyframes: {
        fade: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      animation: {
        fade: 'fade 150ms ease-out'
      }
    }
  },
  plugins: [typography]
};
