# inbox-radar

Listens across the web for people **complaining about the exact pains RPLY / heynox.com solves**
— inbox overload, drowning in DMs, behind on replies, juggling Slack + iMessage + WhatsApp + email
— scores each post with the **free AI ensemble** (`~/Tools/lib/ai.cjs`, $0), drafts a genuinely
helpful reply, and drops it in a **review queue**. Nothing is ever auto-posted.

## Run

```bash
node radar.cjs          # scan → score → draft → queue
node radar.cjs --dry    # gather + score only (no drafts, no writes)
node review.cjs         # walk pending leads: [a]pprove+copy / skip / reject / open
node review.cjs --list  # quick one-line list
./run-loop.sh &         # scan every 90 min, forever
```

Approving a lead copies the draft to your clipboard — you paste & post it yourself, in your name.

## How it works

`radar.cjs` → `sources.cjs` (gather) → free-AI batch scorer (0-100 relevance) → keep ≥70 →
free-AI drafts a peer-to-peer helpful reply → `data/queue.json` + `REVIEW-QUEUE.md`.
A short iMessage summary fires via `~/Tools/cc-text` after each run.

Edit `config.json` to change pain queries, the relevance bar, tone, or sources.

## Sources & yield

| Source | Status | Notes |
|--------|--------|-------|
| Hacker News | ✅ live, no key | dev/founder venting about inboxes |
| Lemmy (fediverse) | ✅ live, no key | multiple instances |
| Reddit | ⚠️ needs key | the **#1 source** for this venting — see below |
| Bluesky | ⚠️ needs key | abundant once authed |

HN + Lemmy work out of the box but are tech-skewed, so genuine "I'm drowning in email" venting
is rarer there (the scorer is deliberately strict — quality over volume). **The big yield unlock
is Reddit + Bluesky**, which block anonymous access. To turn them on, add to `~/.ai.env`:

```bash
# Reddit — create a "script" app at https://www.reddit.com/prefs/apps (free)
REDDIT_CLIENT_ID=...
REDDIT_CLIENT_SECRET=...
# Bluesky — Settings → App Passwords (free)
BLUESKY_HANDLE=you.bsky.social
BLUESKY_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

They auto-activate on the next run. (X/Twitter can be added as an adapter in `sources.cjs`
using the `~/Tools/x-growth` Chrome profile if desired.)

Adapters fail soft: a blocked or dead source logs one line and the run continues.
