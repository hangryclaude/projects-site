# Inbox Radar

Social listening for RPLY/heynox: it scans the web for people complaining about the exact pains the product solves — inbox overload, drowning in DMs, behind on replies — scores each post with the free AI ensemble, drafts a genuinely helpful reply, and queues it for review. Nothing is ever auto-posted; approving copies the draft to your clipboard and you post it yourself, in your own name.

## How it works

`radar.cjs` runs gather → score → draft → queue. Source adapters in `sources.cjs` pull posts (Hacker News and Lemmy work keyless; Reddit and Bluesky — the real yield — activate when keys land in `~/.ai.env`), a free-AI batch scorer rates 0–100 relevance and keeps ≥70, then a second pass drafts a peer-to-peer reply into `data/queue.json`. `review.cjs` walks the queue: approve, skip, reject, open. Each run texts a digest via `cc-text`, and `run-loop.sh` re-scans every 90 minutes. Adapters fail soft — a dead source logs one line and the run continues. All AI is $0 via `~/Tools/lib/ai.cjs`.

## Stack

Node, free AI ensemble (`ai.cjs`), HN/Lemmy/Reddit/Bluesky APIs, cc-text.

## Status

Working — HN + Lemmy live out of the box; Reddit/Bluesky pending keys.
