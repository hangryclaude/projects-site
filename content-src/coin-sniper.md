# coin-sniper

Watches **pump.fun (Solana)** for brand-new coins and texts you (`cc-text`) the instant one is created. **Alert-only — no wallet, no money spent.** Free PumpPortal websocket feed, no API keys.

## Running
It runs 24/7 via launchd (`com.angus.coinsniper`), auto-starts on login, auto-restarts on crash/disconnect.

```bash
# status
launchctl list | grep coinsniper
# stop / start
launchctl unload ~/Library/LaunchAgents/com.angus.coinsniper.plist
launchctl load   ~/Library/LaunchAgents/com.angus.coinsniper.plist
# live log
tail -f ~/Tools/coin-sniper/coins.log
```

## Tuning the firehose (IMPORTANT)
pump.fun mints ~1,000+ coins/hour. Defaults filter to serious launches only. Edit the plist `EnvironmentVariables`, then reload.

- `MIN_SOL` (default **2**) — only alert if the creator's first buy ≥ N SOL. Higher = fewer, more serious. `0` = every coin (firehose).
- `NAME_FILTER` — only alert coins whose name/symbol contains this string, e.g. `ai`, `trump`, `dog`.
- `QUIET=1` — log only, no texts (testing).

Every new coin (pre-filter) is always written to `coins.log` regardless of filters.

## Files
- `sniper.js` — the watcher
- `coins.log` — every coin seen
- `seen.json` — dedupe cache
- `out.log` / `err.log` — launchd output
