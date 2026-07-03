# Website Maker

> An agent that builds the **most interactive websites possible** — trained on a scored corpus of
> award-tier reference sites ("base models"), with a real skills library and a self-scoring build loop.

### 🔴 Live
- **Skills showcase** (all 35 modules running): https://wm-showcase.vercel.app
- **Generated sites** (avg 76/100 Immersive, zero API): [nocturne-agency](https://wm-nocturne-agency.vercel.app) · [halo-product](https://wm-halo-product.vercel.app) · [frequency-music](https://wm-frequency-music.vercel.app) · [ashgrove-architecture](https://wm-ashgrove-architecture.vercel.app) · [ledger-crypto](https://wm-ledger-crypto.vercel.app) · [atelier-fashion](https://wm-atelier-fashion.vercel.app)

Five parts, one loop — **scrape → score → decode → learn → generate (and self-grade)**:

| Part | What it does | Where |
|---|---|---|
| **Scorer** | Captures any site (DOM, JS/CSS, network, runtime, screenshots) and rates its interactivity 0–100 across 10 weighted dimensions. | `scraper/`, `scales/` |
| **Decoder** | A 7-facet multi-agent teardown of a captured site → blueprint + steal-list + per-dimension playbook. | `scraper/extract.mjs` + decode workflow, `corpus/sites/<slug>/decode.md` |
| **Skills** | Reusable, runnable interactive modules (the "crazy skills") across every dimension — each a real `index.ts` + standalone `demo.html`. | `skills/` |
| **Generator** | Brief → plan → assemble → **self-score → iterate** to a target tier. Produces runnable static sites. | `generator/` |
| **Agent** | The packaged `/website-maker` skill that retrieves craft from the corpus and runs the build loop. | `agent/`, `training/` |

## Quick start

```bash
npm install                                   # Playwright + chromium

# Score any site
npm run rate -- https://bruno-simon.com

# Generate a site (themes the master template, self-scores, picks the best of N palettes)
node generator/generate.mjs "a 3D product launch landing page" --target 78 --tries 3
# → generated/<slug>/index.html  (open it, or: vercel deploy generated/<slug> --prod)

# Query the knowledge base (the agent's retrieval brain)
node training/query.mjs "scroll storytelling with pinned sections" -k 8
```

## How it scores

Interactivity is decomposed into 10 weighted dimensions (Scroll 13% · App-state 13% · Motion 12% ·
Craft 12% · Micro-interactions 11% · 3D/WebGL 9% · Kinetic type 8% · Audio/video 8% · Cursor 7% ·
Physics 7%), each with 0–10 anchors and **automatable detection signals**. A site's overall score is
the weighted roll-up (+ a cohesion term), bucketed into tiers: Static → Basic → Engaging → Immersive
→ Award-tier. The generator self-grades on the same scale and iterates until it clears the target.
See [`agent/scoring-scale.md`](agent/scoring-scale.md).

## The skills library

`skills/<key>/` — each skill is a production-grade module with a typed `index.ts`, a standalone
`demo.html` that runs from CDN (no build step), a `README.md`, and `meta.json`. They're smoke-tested
in a real browser (`scraper/verify-skills.mjs`) and indexed in `skills/_manifest.json`. The generator
composes them; the agent retrieves them by brief. Coverage spans all 10 dimensions — WebGL shader
backgrounds, particle fields, glTF viewers, fluid cursors, Lenis smooth scroll, scrollytelling,
pinned-horizontal, custom cursors, magnetic buttons, Matter physics, audio-reactive visuals,
split-text, scramble, drag-drop, live-validation forms, preloaders, quality tiers, and more.

## Training / making it smarter

Claude can't be fine-tuned, so the practical "training" is **retrieval** plus a fine-tune dataset:
- `training/build-embeddings.mjs` → a dependency-free local TF-IDF RAG index over skills + decodes +
  rubric (`training/query.mjs` to search). This is what the agent consults before every build.
- `training/build-dataset.mjs` → `dataset.jsonl` (instruction→code chat pairs) for fine-tuning a
  hosted small model. See [`training/TRAINING.md`](training/TRAINING.md) for the RAG / fine-tune /
  local-LoRA paths.

## Layout

```
scales/     The 0–100 rubric: dimensions.json (signals) + scoring.json (weights, tiers, formula)
scraper/    Capture + score + extract + decode-build + skill-verify/manifest tooling
skills/     The runnable skills library (+ _manifest.json, README catalog)
generator/  plan.mjs · assemble.mjs · self-score.mjs · generate.mjs · batch.mjs · templates/
corpus/     Scored base-model sites + decodes + seeds.json + leaderboard
training/    dataset.jsonl + RAG index + retrieve/query + TRAINING.md
agent/       Website Maker system prompt, scoring scale, build playbook, /website-maker SKILL.md
generated/   Generated demo sites + GALLERY.md
```

Private repo · built autonomously by the Website Maker overnight run (see `NIGHT_LOG.md`).
