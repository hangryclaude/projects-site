# Carly SEO Console

Local SEO tracking + deliverables for **Captured & Created** (capturedandcreated.com), Carly Otness's Santa Barbara courthouse-wedding side hustle.

> **Hard rule across every deliverable:** the photographer's surname (`Otness`) never appears on the public site, in any directory listing, or in any structured-data file we publish. The two brands stay separated — `carlyotness.com` is her primary photography business and must never be linked to or outranked by `capturedandcreated.com`.

---

## Quick start

```bash
./setup.sh        # one-time
./start.sh        # serves dashboard at http://127.0.0.1:8742
./run-tracker.sh  # daily SERP + AI citation run (also good as a cron entry)
```

Daily cron (already documented inside `run-tracker.sh`):

```cron
0 7 * * * /Users/angus/Tools/carly-seo/run-tracker.sh >> /Users/angus/Tools/carly-seo/data/cron.log 2>&1
```

---

## What's where

```
carly-seo/
├── server/               # FastAPI dashboard (port 8742)
│   ├── app.py            # endpoints: /api/summary, /api/timeseries, /api/queries, /api/competitors, /api/ai-citations, /api/event, /api/run-now
│   ├── templates/dashboard.html
│   └── static/dashboard.{css,js}
├── scraper/
│   ├── serp.py           # SERP scraper (DuckDuckGo primary, Google fallback)
│   ├── ai_search.py      # Claude/Perplexity/Google-AI-Overview citation backends
│   ├── audit_live.py     # on-page SEO auditor — re-run any time
│   ├── run.py            # daily SERP collection
│   ├── run_ai_citations.py
│   ├── seed_baseline.py  # one-shot 2026-05-08 baseline from real SERPs
│   └── db.py             # SQLite layer
├── data/
│   ├── carly_seo.db      # rolling tracker DB (gitignored)
│   └── baseline/         # baseline-2026-05-08.db kept in repo
├── keywords.json         # 36 tracked keywords, 9 AI search queries, 6 brand-protection queries
└── deliverables/         # everything Carly / Angus actually does in the world ↓
    ├── FOCAL-fix-sheet.md          # 9-step paste guide for FOCAL editor — TOP PRIORITY
    ├── email-reply-draft.md        # also saved as a Gmail draft
    ├── audit/onpage-audit.md       # 36 issues across 9 pages, dated 2026-05-08
    ├── listings/                   # 11 directory packets (GBP, Yelp, Knot, etc.)
    └── schema/                     # 12 JSON-LD files for FOCAL custom-code paste
```

---

## Order to ship

1. **Wait on Carly** for FOCAL site verification (with FOCAL support) so Search Console can attach.
2. **Apply `deliverables/FOCAL-fix-sheet.md`** — single biggest move is removing `Carly Otness` from the global title template. That kills the brand-leak everywhere in one click.
3. **Submit `deliverables/listings/google-business-profile.md`** — postcard verification takes 5–14 days, so start it the same day.
4. **Paste `deliverables/schema/01-localbusiness.json` + `10-website-sitenavigation.json`** site-wide; FAQ schemas per page.
5. **Submit other 10 listings** in the order in `_master-info.md`'s submission tracker.
6. **Publish blog posts** from `deliverables/blog/` — one per week, internal-link them per `_publishing-plan.md`.
7. **Re-run audit + tracker** daily. Watch the dashboard's hero number climb.

---

## How to log a fix to the dashboard

Every fix posts an event so the "Project log" panel and the chart annotations stay accurate:

```bash
curl -X POST http://127.0.0.1:8742/api/event \
  -H 'Content-Type: application/json' \
  -d '{"kind":"focal_fix","summary":"Removed Carly Otness from global title template"}'
```

---

## Ground truth — 2026-05-08 baseline

- Visibility score: **14.3 / 100**
- Top-10 ranking keywords: **1 / 22** (and that one is the brand-leak we're killing)
- Estimated organic clicks/month: **~20** (almost all from her name leaking)
- AI search hit rate: **0 / 25** runs
- Highest competitor surface: `annadelores.com` and `rewindphotography.com` (both rank top-3 across 5+ courthouse keywords)

---

## Brand separation rule (verbatim from Carly's email, May 7 2026)

> "It would be best if my actual name Carly Otness wasn't associated with the courthouse wedding (captured and created) at all. So please try and get it to pop up when you google santa barbara courthouse weddings but not when you google Carly Otness… So try not to use my actual name at all."

If a deliverable can't pass the test "does this associate Carly Otness the person with the courthouse-wedding brand?" — don't ship it.
