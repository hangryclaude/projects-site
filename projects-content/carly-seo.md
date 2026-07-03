# Carly SEO

Local SEO console for Captured & Created, a Santa Barbara courthouse-wedding photography side hustle. Tracks 36 keywords in real SERPs, monitors whether AI search engines cite the site, and packages every fix as a paste-ready deliverable. One hard rule shapes everything: the photographer's surname never appears anywhere public, because her primary photography brand must stay separated from — and never be outranked by — this one.

## How it works

A FastAPI dashboard on port 8742 reads a SQLite tracker DB filled by a daily cron: `serp.py` scrapes rankings (DuckDuckGo primary, Google fallback) and `run_ai_citations.py` checks Claude, Perplexity, and Google AI Overview for citations across 9 AI queries plus 6 brand-protection queries. A one-shot baseline from May 2026 SERPs makes progress measurable. The `deliverables/` folder is the point: a 9-step FOCAL fix sheet (headline move: strip the surname from the global title template), an 11-packet directory listing set, 12 JSON-LD schema files, and a 36-issue on-page audit.

## Stack

Python, FastAPI, SQLite, DuckDuckGo/Google scraping, Claude/Perplexity APIs.

## Status

Working — tracker runs on cron; top deliverables blocked on the client verifying her FOCAL site.
