# How to Law

How to Law is a static Astro v4 site that teaches United States legal fundamentals with optional roleplay (RP) twists. It is designed for GitHub Pages hosting at `https://<USER>.github.io/how-to-law/` (replace `<USER>` with your GitHub handle).

## Features

- Astro + MDX content collections for modular lessons
- Tailwind CSS theming with light/dark support and CSS variables
- React islands for RP toggles, quizzes, progress rings, flows, and search
- Client-side FlexSearch index built at build time
- Persistent progress tracking in localStorage
- GitHub Pages deployment with base path `/how-to-law`

## Getting started

1. `npm install`
2. (Optional) export `ASTRO_SITE=https://<USER>.github.io/how-to-law` before building, or edit `astro.config.mjs` to point at your custom domain/base.
3. `npm run dev`
4. Commit and push to `main`
5. Ensure GitHub Pages is set to deploy from the `gh-pages` branch (the provided workflow handles publishing and drops a `.nojekyll` file so the generated `_astro` assets are served correctly)
6. Hosting at another base path? Update `site` and `base` in `astro.config.mjs`

## Scripts

- `npm run dev` – start the development server
- `npm run build` – generate the production build (`dist/`)
- `npm run preview` – preview the production build locally
- `npm run typecheck` – run `astro check`
- `npm run format` – format the project with Prettier

## Deployment

Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml`. The workflow installs dependencies, builds the project, uploads the `dist/` artifact, and publishes to GitHub Pages using the official action. The Astro configuration already sets the required `site` and `base` for a project site at `/how-to-law`.

## Content & data

- Lessons live in `src/content/classroom/**` with MDX frontmatter describing metadata, quiz items, and RP differences.
- Glossary terms (`src/content/glossary/terms.json`) power inline definitions and the glossary browser.
- A build hook writes `dist/search-index.json` using lesson and glossary metadata for FlexSearch.

> **Note:** The content is educational and narrative-focused—it is not legal advice.
