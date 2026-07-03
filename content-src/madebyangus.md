# Made by Angus — portfolio

Static portfolio site for **madebyangus.com**. One main page + four lab/showcase microsites, all hand-built, no framework, no build step.

## Structure

```
.
├── index.html          # main portfolio
├── style.css
├── script.js
├── favicon.svg
└── showcases/
    ├── atelier/        # editorial agency (cream + red, magazine layout)
    ├── orbit/          # SaaS uptime tool (dark navy + coral, animated orbit hero)
    ├── longshore/      # coffee roaster commerce (warm cream + terracotta)
    └── rooftop/        # architecture studio (Swiss minimalist, signal red)
```

Each showcase is intentionally a totally different aesthetic — that's the point of the Labs section.

## Run locally

```bash
python3 -m http.server 8765
# → http://localhost:8765
```

## Deploy

Static, so any of these work in under five minutes:

- **Cloudflare Pages** — drag-and-drop the directory, point `madebyangus.com` at it.
- **Vercel** — `vercel deploy` from the directory.
- **Netlify** — `netlify deploy --prod --dir .`.
- **GitHub Pages** — push to a repo, enable Pages, point apex at it.

## Editing the project list

All eleven projects live in `index.html` under `<section id="work">` as `<li class="prj">` blocks. Each project has its own CSS-art "media" element rendered from `<div class="art art--<slug>">` — there are no image assets, so updates are pure HTML/CSS edits.

## Stack

Plain HTML/CSS/JS. Google Fonts for type (Fraunces, Bricolage Grotesque, Bodoni Moda, Newsreader, Instrument Serif, EB Garamond, Cormorant Garamond, Playfair Display, DM Sans, JetBrains Mono — different combinations per page). One JS file (`script.js`) for the cursor, clock, scroll-reveal, and live counter.
