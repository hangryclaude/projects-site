# /graham — evaluate a human the way Graham Duncan would 🧭

A reusable tool that reads a person and assesses them the way **Graham Duncan** (East Rock Capital — the legendary talent assessor the Dia-browser `/graham` skill is named after) would. His core question: **"What's going on here, with this human being?"**

It's grounded in **Graham Duncan's actual essays** (scraped from grahamduncan.blog) and runs entirely on the **free AI ensemble** — **$0, no Anthropic tokens.**

---

## Pipeline (all free)

| Step | Script | What it does |
|------|--------|--------------|
| 1. Scrape | `node scrape.cjs` | Pulls Duncan's essays → `corpus/*.txt` (pure HTTP, 0 tokens) |
| 2. Distill | `node distill.cjs` | Free-AI map-reduce over the essays → `graham-rubric.json` + `.md` (his weighted lens on people) |
| 3. Evaluate | `node graham.cjs ...` | Reads a person against the rubric + his own prose → a scored verdict |

## Evaluate someone

```bash
node graham.cjs "Jane Founder" "ex-Stripe PM, dropped out, built X to $2M ARR solo, blunt, great references"
node graham.cjs "Name" --file dossier.txt          # dossier from a file
node graham.cjs "Name" --url https://their-site/about   # pull text from a page
```

Output → console summary + `out/eval-<name>.md` and `out/eval-<name>.json`, with:
- **"What's going on here"** — the read beneath the surface story
- **Scores** per dimension (with evidence, weighted to an overall 0-100)
- **Green flags / red flags**
- **The one question** — the highest-leverage thing to ask in a reference call
- **Bet big if / Walk away if**
- **Verdict** in Duncan's voice

## Duncan's lens (the distilled rubric)

The weights come straight from his writing — full detail in `graham-rubric.md`:

1. **Self-Awareness & Reality Perception** (25%) — the gap between their self-narrative and reality
2. **Strategic Game Awareness** (20%) — do they see the real "playing field"
3. **Locus of Control & Agency** (18%) — ownership vs. victimhood
4. **Growth Trajectory & Learning Velocity** (15%) — rate of change, not just current state
5. **Credibility & Judgment** (12%) — track record read in context
6. **Infinite Game Mindset** (10%) — long game vs. quick finite wins

## Re-aim it

Edit `graham-rubric.json` (or re-run `distill.cjs --remap`) to tune the lens. Add more essays/interview transcripts as `.txt` files in `corpus/` and re-distill to deepen it.

---

_Built on free AI — costs nothing to run. The whole point: an honest, evidence-based read on a person, in Graham Duncan's voice._
