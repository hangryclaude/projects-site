# projects-site

theodore.net-style projects portfolio for hangryclaude. Static, no framework.

- `data/projects.json` — single source of truth (merged from `data/entries-*.json` by `tools/merge-entries.cjs`)
- `projects-content/<slug>.md` — detail-page writeups
- `node build.cjs` — renders `index.html` + `projects/<slug>/index.html`
- `NODE_PATH=$(npm root -g) node tools/thumbs.cjs` — thumbnails (Playwright shots of live sites + seeded generative tiles via `tools/tile.html`)
- deploy: `npx vercel --prod`
