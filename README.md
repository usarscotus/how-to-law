# How to Law

## What this project is
- A free, community-built learning hub for people exploring the foundations of United States law.
- A place to share plain-language explainers, interactive lessons, and curated resources anyone can improve together.

## What this project is not
- A source of legal advice or a substitute for personalized counsel. Everything here is educational only.

## Getting started
```bash
npm install
npm run dev
```
The dev server runs at `http://localhost:4321/how-to-law` so content loads under the same base path the production site uses.

## Contributing
- **Write in plain English.** Example: say “The court reviews the evidence” instead of “Herein the tribunal evaluates exhibits.”
- **State rules succinctly, then illustrate.** Lead with the rule sentence, then add a short example or scenario to show how it works.
- **Cite primary sources when helpful.** Link to trusted references like Cornell’s LII or Oyez when you explain doctrines or cases.
- **Skip roleplay content.** No mock client dramas or simulated attorney conversations—keep explanations factual and instructional.

When you open a pull request, mention the lesson or glossary item you updated and note any new sources you linked.

## Deployment
- GitHub Actions workflow `Deploy Astro site` runs on pushes to `main` or manual dispatch.
- The build job installs dependencies (`npm ci`), runs `npm run check`, builds the site, and uploads the `dist` artifact.
- The deploy job publishes that artifact to GitHub Pages. The public site lives at `https://example.github.io/how-to-law/` (replace `example` with the repository owner) and must retain the `/how-to-law` base path.

## Accessibility & performance checklist
- Provide descriptive link text and alt text for images.
- Preserve keyboard focus order and include skip links where relevant.
- Meet WCAG AA color contrast and respect reduced-motion preferences.
- Keep headings hierarchical (no skipping levels) and use semantic HTML.
- Minimize bundle cost: prefer static Markdown content and lightweight islands only when interaction is necessary.

## Code style
- Use ESLint and Prettier via `npm run check` and `npm run format` before committing.
- Keep frontmatter fields ordered logically: metadata first, then arrays (`objectives`, `prereqs`, `tags`), followed by quiz or further reading. Use the numeric `order` field to control lesson sequencing (increment from 1 within each module).
- Module IDs currently in use (directory names under `src/content/classroom`): `civ-pro`, `civil-procedure`, `constitutional-law`, `courts`, `crim-pro`, `criminal-law`, `criminal-procedure`, `evidence`, `foundations`, `remedies`, `scotus-practice`.
