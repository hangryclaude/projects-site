# spend-guard

Hard locks so AI automation can **never** surprise you with a bill. Flat, predictable cost for your own work. Near-$0 for background bots.

This is one half of the system. The other half is the single shared controller every script must use: `~/Tools/lib/ai.cjs`.

None of it is provider-specific. The architecture (choke-point module + free-first routing + rotation + one log + caps + kill-switch flag) ports to any stack.

## THE CORE IDEA: TWO SEPARATE TRICKS

**Trick 1 — For your own hands-on work, buy a FLAT plan and use it hard.**  
A flat monthly subscription (Claude Max, ChatGPT Pro, etc.) costs the same no matter how much you use. The only limit is a temporary cooldown. So use the top model, long sessions, automation overnight. Fixed cost rewards heavy use. (Implemented here via `AI_PREFER_MAX` + `claude -p` for "max" tier.)

**Trick 2 — For BACKGROUND automation/bots, never let them touch a paid API.**  
Bots never call a paid API directly. They all go through ONE shared controller (`ai.cjs`) that routes **every** request like this:
1. Try a FREE model first (GitHub Models free tier, Ollama Cloud, Groq/Gemini/OpenRouter/etc free tiers, local Ollama) — $0.
2. On rate limit (429/401/403), rotate to the next free token/account — still $0.
3. ONLY if every free option is exhausted does it fall back to a paid model (Anthropic etc.).
Default is free-first (env `AI_PREFER_FREE`, default ON), so step 3 almost never fires.

## THE ONE RULE THAT KEEPS IT NEAR $0
Keep free-first routing ON everywhere, keep your free tokens loaded (in `~/.ai.env`), and put a hard kill-switch behind it. Then your worst case isn't a surprise four-figure bill — it's your hard cap (e.g. ~$20) plus a text.

## HOW THE TWO PIECES WORK TOGETHER

### 1) ONE shared AI controller — the single choke point (`~/Tools/lib/ai.cjs`)
Every script does:
```js
const { ask, askJSON, fleet } = require('~/Tools/lib/ai.cjs');
// or import from ai.mjs
const text = await ask("...", { tier: "fast" });
```
Inside it:
- **Tiers** (`fast` / `smart` / `deep` / `max` / `free`) map to provider+model. Callers never hardcode a raw model id.
- `preferFree` (env `AI_PREFER_FREE=1` default). Cheap work → best free model; smarter → stronger free model.
- `AI_PREFER_MAX=1` (default): quality tiers (smart/deep) use your flat Claude Max subscription via `claude -p` at $0 marginal cost (never the metered API).
- ALL paid keys live only in this controller (or `~/.ai.env` / env it reads). Bots can't reach a key on their own → can't spend on their own.
- Free-quota stacking + rotation on throttle.
- Every call appends one JSON line to `~/.spend/usage.jsonl` with `cost` + `saved` (what it would have cost on paid).
- Respects the free-only lockdown flag and the spend log for over-cap detection.

See `node ~/Tools/lib/ai.cjs --help` style usage in the file header. Also has `--report`, `--ping`, `--lockdown on|off`, and a local HTTP brain server for latency-sensitive apps.

### 2) Free-quota stacking (rotation)
Free tiers are limited per *account* (RPM/RPD), not dollars. Keep several free tokens (GitHub accounts + other free-tier providers). On 429/401/403 the controller rotates to the next before ever trying paid. A handful of free accounts behaves like one big free tier.

Keys go in `~/.ai.env` (one per line, `NAME=sk-...`):
- `GITHUB_TOKEN=...` (or `GITHUB_TOKENS=token1,token2,...` for explicit stack)
- `OLLAMA_API_KEY=...`
- `GROQ_API_KEY=...`, `GEMINI_API_KEY=...`, `OPENROUTER_API_KEY=...` etc. (see ai.cjs `extraFreeProviders()`)

`gh auth login` also works as a fallback for GitHub.

### 3) Spend guard — the hard locks (this dir)
`guard.js` is the watchdog. It only *reads* the log the controller writes. It never knows keys.

Caps (edit `config.json`):
- **softCap** (e.g. $8/day): text warning, keeps running.
- **hardCap** (e.g. $20/day): text + `launchctl unload` **every** spending daemon + **creates `~/.spend/freeonly`** so the controller itself refuses *all* paid fallback for any call (manual scripts too). A runaway costs at most the hard cap before it stops and alerts you.
- **monthlyCap** (e.g. $300).
- Daily summary text after `summaryHour` (default 21).

On new calendar day: if spend is now under hard cap, guard auto-clears the free-only flag so normal (still free-first) operation resumes.

Also supports manual: `node guard.js lockdown on|off | clear`.

## Runs
Hourly via launchd (see com.angus.spendguard.plist or similar).

## Manual commands
```bash
node guard.js                 # check + alert + print report
node guard.js report          # print only
node guard.js lockdown on     # force free-only flag
node guard.js lockdown off    # clear flag, allow paid fallback again
node guard.js clear           # same as above
node guard.js test            # send test text

# From the controller (richer view, includes "saved by free" totals)
node ~/Tools/lib/ai.cjs --report
node ~/Tools/lib/ai.cjs --ping
node ~/Tools/lib/ai.cjs --lockdown on|off
```

## Re-enable paused daemons (after a hard cap day)
```bash
launchctl load ~/Library/LaunchAgents/com.madebyangus.leadagent.plist
# (and any others listed in config.json daemonsToPause)
node ~/Tools/lib/ai.cjs --lockdown off   # if you also want to clear the flag immediately
```

## Add logging to a new project
Just call through the controller. It writes the JSON automatically (with cost + saved). Example line:
```json
{"ts":"2026-...","source":"lib/ai","provider":"github","model":"openai/gpt-4o-mini","tier":"fast","in":312,"out":87,"cost":0,"saved":0.00123}
```
Guard will pick it up on next run. For pure local/Ollama or other free, cost stays 0.

## COPY-PASTE CHECKLIST
- [x] Flat subscription (Claude Max etc.) for heavy interactive work — use `AI_PREFER_MAX` + max tier
- [x] One shared AI module every script calls (paid keys live ONLY here / in ~/.ai.env)
- [x] Free model as the default (multiple free tiers + local)
- [x] Rotate across free tokens/accounts on rate-limit (GitHub + extras)
- [x] Spend guard: soft (warn) + hard (kill daemons + set freeonly flag) + monthly
- [x] Free-only lockdown flag (`~/.spend/freeonly`) that disables paid fallback entirely (controller + guard cooperate)
- [x] One usage log (`~/.spend/usage.jsonl`) + daily summary you actually receive (via iMessage)

## Net effect
Flat predictable cost for hands-on. ~$0 for background bots. A hard wall: nothing can run away past your chosen caps. Worst case a bad day costs your hard cap + you get a text.

See also: `~/Tools/spend-guard/token-budget.html` (visual), `SAVINGS.md`, and the big comment block at the top of `ai.cjs`.

## Quick verification
```bash
./demo-brain.sh
# or
node guard.js
node ~/Tools/lib/ai.cjs --report
```
