# Art tile design brief — READ FIRST, follow exactly

You design portfolio card art tiles for Angus's projects site. One tile per project. These replace generic tiles — each must be a bespoke, at-a-glance visual that explains the project with wit. The bar is high; the whole set must read as ONE system.

## Hard rules (non-negotiable)
- One file per project: `/Users/angus/dev/projects-site/tools/art/<slug>.html`
- Structure exactly:
  ```html
  <!doctype html><html><head><meta charset="utf-8">
  <link rel="stylesheet" href="base.css">
  <style> /* your scene styles, scoped under #scene */ </style>
  </head><body>
  <div id="frame" data-label="<slug>"><div id="scene"> … </div></div>
  </body></html>
  ```
- NEVER restyle `#frame`, its `::before` (inset hairline) or `::after` (slug label). base.css owns the frame + label. Your work lives inside `#scene`.
- CSS + inline SVG ONLY. No external images, no web fonts, no JS, no network. System fonts only: `"SF Mono", Menlo, monospace` for mono/UI, `-apple-system, system-ui, sans-serif` for display.
- Background stays dark (#0f0f11 from the frame). Do not paint a light full-bleed background unless the project genuinely is a light UI (rare).
- MAX 1–2 accent colors per tile + off-white (#ebe8e2) and grays. Restraint reads as expensive. The creative/visual projects may use richer color but stay composed, never rainbow soup.
- ONE big central iconographic composition that reads clearly at 350px wide (cards are small). No tiny scattered detail that turns to mush. Big shapes, few words.
- A short witty label/caption line is great (like ghostype's "accepts · every app · 100% local") but keep total text minimal — the image carries it.

## The look (study these)
- Read `/Users/angus/dev/projects-site/tools/art/base.css` (the scaffold).
- Read `/Users/angus/dev/projects-site/tools/art/ghostype.html` — the reference: a ghost-completed sentence + a Tab keycap + app dots. That level of clarity and restraint is the target.
- Render + look at the reference: `sips -s format png /Users/angus/dev/projects-site/assets/thumbs/ghostype.webp --out /private/tmp/claude-501/-Users-angus/694d47b2-ac6a-4266-8455-267d2d2299b3/scratchpad/ref.png` then Read it.
- Other strong examples already built you can open for reference: `inbox-engine.html` (grid), `spend-guard.html` (gauge), `malware-scanner.html` (verdict list), `coin-sniper.html` (chart).

## How to design each one
1. Read the project's writeup: `/Users/angus/dev/projects-site/projects-content/<slug>.md` and note its tagline (in the entry JSON / on the card). Understand what it actually DOES.
2. Find the single strongest visual metaphor — a UI moment, a before→after, a diagram, an object. Draw THAT. When in doubt: show the product's actual interface or output as a stylized mock, not an abstract pattern.
3. Keep it honest to the project. Don't invent features. A thin/parked project can have a simpler, quieter tile — that's fine.

## Palette hints by category (loose, not mandatory)
- Growth machine / NOX & RPLY: signal orange/amber on black, or a cold-email green.
- AI agents & orchestration: phosphor green, or violet for "AI".
- macOS power tools: cool gray-blue, Apple-UI restraint.
- Web & creative: richer/iridescent, most beautiful of the set.
- Commerce & hustles: money green, receipt/retail energy.
- School & learning: chalk/notebook, blue or warm.
- Markets & bots: red/green candles, terminal.
- Games/family/chaos: playful, higher color.
- Scraps & experiments: muted, honest, a little rough is OK.

## VERIFY (mandatory before you report)
After writing your batch, render them:
`cd /Users/angus/dev/projects-site && NODE_PATH=$(npm root -g) node tools/render-art.cjs <slug1> <slug2> …`
Then for EACH tile: convert to png and Read it —
`sips -s format png assets/thumbs/<slug>.webp --out /private/tmp/claude-501/-Users-angus/694d47b2-ac6a-4266-8455-267d2d2299b3/scratchpad/chk-<slug>.png`
Fix anything cramped, overflowing the frame, colliding with the label (bottom-left), unbalanced, or unclear — then re-render. Ship only tiles you'd defend. Text must not overlap the inset frame or the label chip.

Report one line per tile: `<slug> — <what the scene shows> — verified`.
