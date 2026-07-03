# viral-x

An agent that reverse-engineers **why** tweets go viral, then generates,
scores, and learns from its own posts. 100% local Ollama — no API keys, no
token spend.

## The loop

```
harvest → analyze → generate → score → post (gated) → measure → re-weight → repeat
```

1. **harvest** — collect viral tweets (>1M views) into the corpus. Ships with a
   seed set so it works immediately. Live harvest via the Chrome extension.
2. **analyze** (`node analyze.js`) — the smart model (qwen2.5:32b) dissects each
   tweet into the *one lever* that made it spread (reciprocity, curiosity gap,
   embarrassment, tribal agreement, utility…) and distills a ranked **playbook**.
3. **generate** (`node generate.js "<your niche>"`) — writes candidate tweets for
   each high-power pattern, then scores every one 0-100 for predicted virality
   and flags cringe/policy/generic risk. Only the best surface.
4. **post** (`node post.js <id>`) — **gated**. Prints the exact text. You (or
   Claude via the browser, on approval) post it. Nothing auto-posts.
5. **measure** (`node experiment.js record/metrics`) — log the real view count
   ~24h later.
6. **learn** — patterns that actually broke 100k views get weighted up in the
   next `generate` run (multi-armed bandit). The agent gets better at *your*
   audience over time.

## Why "experiments"
Each post is a labeled trial: (pattern → real views). `node experiment.js report`
shows avg views per pattern so you double down on what works for your account,
not generic advice.

## Quick start
```bash
node analyze.js                      # build the playbook from the corpus
node generate.js "AI side hustles"   # get scored candidates
node post.js c_xxxx                  # surface one to post
# ...post it, wait ~24h...
node experiment.js record c_xxxx https://x.com/.../status/123
node experiment.js metrics https://x.com/.../status/123 240000 5100 800
node experiment.js report            # which patterns win for YOU
```

## Notes
- Models: `VX_SMART` (analyze/score, default qwen2.5:32b), `VX_FAST` (bulk gen,
  default llama3.2:3b). Override via env.
- All state in `data/store.json`.
- Posting + live harvest are X-coupled and kept manual/gated on purpose —
  bulk auto-posting risks the account.
