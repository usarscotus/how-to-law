# How to Law

How to Law is a professional Astro site that teaches foundational United States law with concise lessons, interactive quizzes, and a robust glossary. The project is optimized for GitHub Pages deployment at `/how-to-law`.

## Features

- **Astro v4 + MDX** for fast static pages with React islands only where interaction is required.
- **Structured curriculum** covering foundations, courts & jurisdiction, and Supreme Court practice with breadcrumbs, lesson objectives, and progress visuals.
- **Glossary autolink plugin** that automatically wraps defined terms in popovers sourced from `src/content/glossary/terms.json`.
- **FlexSearch-powered site search** with weighted fields, synonym handling, and highlighted results.
- **Accessible design** featuring WCAG AA-compliant colors, keyboard navigation, skip links, and respect for prefers-reduced-motion.
- **Tooling** including ESLint, Prettier, Tailwind CSS, and automated GitHub Actions that check, lint, and build the project.

## Getting started

```bash
npm install
npm run dev
```

The site is served at `http://localhost:4321/how-to-law` during development. Astro automatically rebuilds pages when content or components change.

## Scripts

- `npm run dev` – start the development server.
- `npm run check` – run `astro check` and ESLint.
- `npm run build` – generate the production build in `dist/`.
- `npm run preview` – preview the production build locally.
- `npm run format` – format files with Prettier.

## Content structure

- `src/content/classroom` – MDX lessons organized by module.
- `src/content/glossary/terms.json` – glossary definitions used throughout the site.
- `src/layouts` – shared page and lesson layouts with navigation, metadata, and accessibility features.
- `src/components` – UI components such as `Callout`, `Flow`, `Quiz`, `SearchInput`, and `Term` popovers.
- `src/plugins/remark-terms.js` – remark plugin for auto-linking glossary terms.

## Deployment

The project is configured for GitHub Pages. Set the repository’s Pages source to “Deploy from GitHub Actions.” The build output uses `base: '/how-to-law'` and `trailingSlash: 'always'` for stable URLs.

## License

Content and code are provided for educational purposes only and do not constitute legal advice.
