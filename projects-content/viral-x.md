# viral-x

An agent that reverse-engineers *why* tweets go viral, writes its own candidates, and learns from real view counts. 100% local Ollama — no API keys, no token spend, no platform API either.

## How it works

The loop is harvest → analyze → generate → score → post (gated) → measure → re-weight. A corpus of >1M-view tweets (seed set included; live harvest via a Chrome extension) gets dissected by qwen2.5:32b, which names the one lever that made each tweet spread — reciprocity, curiosity gap, embarrassment, tribal agreement, utility — and distills a ranked playbook. `generate.js` then writes candidates for your niche against each high-power pattern, scores every one 0–100 for predicted virality, and flags cringe/policy/generic risk; only the best surface. Nothing auto-posts: `post.js` prints the exact text and a human posts it. About 24 hours later you record the real view count, and patterns that actually broke 100k views get weighted up in the next run — a multi-armed bandit over your own audience. Each post is a labeled experiment, so `experiment.js report` shows average views per pattern for *your* account, not generic advice.

## Stack

Node.js, Ollama (qwen2.5:32b for analysis, llama3.2:3b for bulk generation), Chrome extension for harvest

## Status

Working — posting and live harvest deliberately kept manual/gated; bulk auto-posting risks the account.
