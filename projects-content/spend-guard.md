# spend-guard

If you run AI automation overnight, your worst case shouldn't be a surprise four-figure bill. spend-guard makes the worst case a number you chose: a runaway costs at most the hard cap (mine's $20/day) before everything spending money gets shut off and I get a text.

## How it works

It's the read-only half of a two-piece system. Every script routes AI calls through one shared controller (`~/Tools/lib/ai.cjs`) that tries free providers first, rotates tokens on rate limits, and appends a cost line per call to `~/.spend/usage.jsonl`. `guard.js` runs hourly via launchd and only reads that log — it never touches a key. Soft cap: text warning, keep running. Hard cap: text, `launchctl unload` every spending daemon, and drop a `~/.spend/freeonly` flag that makes the controller itself refuse all paid fallback — even for manual scripts. Next calendar day, if spend is back under the cap, the guard auto-clears the flag. Monthly cap and a daily summary text on top. Nothing here is provider-specific; the pattern (choke point + one log + caps + kill-switch flag) ports to any stack.

## Stack

Node.js, launchd, iMessage alerts via cc-text, JSONL spend log

## Status

Live — running hourly on my Mac, watching every AI call I make.
