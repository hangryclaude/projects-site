# lib

Every AI project I build needs to call a model, and paid API tokens leak fast when bots run overnight. `lib` is the fix: one shared module every script on my machine requires, and the single place any AI call is allowed to happen. It routes free-first — a learned chain of free hosted providers (Ollama Cloud, GitHub Models, Groq, Gemini, OpenRouter, Cerebras, and more) handles the bulk, quality work goes through my flat Claude Max plan at $0 marginal, and the metered Anthropic API is a genuine last resort.

## How it works

Callers ask for a tier, never a model id: `ask("prompt", { tier: "fast" })`. Tiers map to routes — `free` and `fast` walk the free chain and rotate tokens on 429s, `smart`/`deep` go to Sonnet/Opus via `claude -p`, and `genius` has a free model draft, then Claude verify and refine. `clone-agent.cjs` rebuilds the agent layer on free models too: recall from a memory DB, plan into typed sub-tasks, fan out to the best-fit model per type (picked by a capability benchmark), synthesize, remember. Every call appends a cost line to `~/.spend/usage.jsonl`, which is what spend-guard watches, and a lockdown flag can refuse all paid fallback stack-wide.

## Stack

Node.js, zero runtime deps in the router, GitHub Models, Ollama Cloud, Groq, Gemini, OpenRouter, Anthropic (fallback only)

## Status

Working — it's the choke point every other project here routes through daily.
