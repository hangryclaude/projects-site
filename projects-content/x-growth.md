# X Growth

An X reply-and-repost assistant that grows my account without ever posting on its own. It watches four lanes — mentions, trending funny posts, niche (teachers, indie builders, AI tools), and early replies under big accounts — drafts responses in my voice, and queues everything for approval. All AI runs on the free brain, so it costs $0.

## How it works

One-time setup: `node x.cjs login` saves an X session to a dedicated Chrome automation profile (separate from personal Chrome), then `learn` reads my last ~40 tweets to build a voice file. Daily: `run` finds candidates across the lanes, drafts replies/reposts with `~/Tools/lib/ai.cjs`, queues them, and texts a digest via `cc-text`. Then `queue` / `approve` / `edit` / `reject` / `post` — posting is always a manual step, which makes `run` safe to cron a few times a day. Lanes, queries, weights, and voice rules live in `config.json`; state lives in `~/.x-growth/`.

## Stack

Node, Chrome automation (dedicated profile), free AI ensemble, cc-text.

## Status

Working.
