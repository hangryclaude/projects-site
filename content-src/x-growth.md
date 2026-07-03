# x-growth

Your X (Twitter) repost + reply assistant. It finds tweets that grow **your** account,
drafts reposts and witty replies **in your voice**, and queues them — **nothing posts until you approve.**
All the AI runs on the free brain (`~/Tools/lib/ai.cjs`), so it costs **$0**.

## Lanes it watches
- **mentions** — tweets about you / your projects
- **funny** — trending funny/relatable posts to ride for reach
- **niche** — teachers, classroom tech, indie builders, AI tools
- **bigaccounts** — reply early under big accounts in your space

Tune all of these (queries, weights, on/off, voice rules) in `config.json`.

## Setup (once)
1. Put your handle (no `@`) in `config.json` → `"handle"`.
2. `node x.cjs login`  → log into X in the window that opens, press Enter. Session is saved to a
   **dedicated automation profile** (`~/.x-growth/chrome-profile`), separate from your personal Chrome.
3. `node x.cjs learn`  → learns your voice from your last ~40 tweets.

## Daily use
```
node x.cjs run                 # find + draft → queue (texts you a digest via cc-text)
node x.cjs queue               # review everything queued
node x.cjs approve 2           # approve one  (or: approve all)
node x.cjs edit 2 "better line"# tweak a draft before approving
node x.cjs reject 4            # drop one
node x.cjs post                # publish everything you approved
```

## Run it on a schedule (optional)
`node x.cjs run` is safe to cron a few times a day — it only fills the queue, never posts.
Posting always stays a manual `approve` → `post`.

Data lives in `~/.x-growth/` (queue.json, history.json, voice.txt, chrome-profile/).
