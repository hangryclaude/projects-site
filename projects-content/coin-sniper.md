# Coin Sniper

Watches pump.fun on Solana and texts me the instant a new coin is minted. Alert-only — no wallet, no keys, no money at risk. The itch: pump.fun launches move in minutes, and by the time you see one on Twitter you're the exit liquidity. This gets the alert to my phone at creation time.

## How it works

One Node process holds a websocket open to PumpPortal's free new-token feed (no API key needed) and pipes matches through `cc-text`, my Mac-to-iMessage notifier. The hard part isn't the plumbing, it's the firehose: pump.fun mints over 1,000 coins an hour, nearly all garbage. So filters do the work — `MIN_SOL` only alerts when the creator's own first buy is at least N SOL (default 2; skin in the game is the best spam filter), and `NAME_FILTER` narrows to a keyword like "ai" or "dog". Every coin still lands in `coins.log` pre-filter, with a `seen.json` dedupe cache.

Runs 24/7 as a launchd agent: auto-starts on login, auto-restarts on crash or websocket disconnect. Tuning is editing env vars in the plist and reloading.

## Stack

Node.js, WebSocket (PumpPortal feed), launchd, cc-text/iMessage

## Status

Live — running around the clock on my Mac.
