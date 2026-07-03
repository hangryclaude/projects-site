# kalshi-copybot

Hybrid "smart money" Kalshi bot. Scrapes the public leaderboard, watches top traders' posts, monitors the anonymous trade tape for unusual large prints, fires mirror signals. Dry-run by default. $5 YOLO bankroll when armed.

## Reality check up-front

Kalshi's trade tape is **fully anonymous** (web + API). You cannot literally copy a specific trader's fills. Almost nobody uses Kalshi's /ideas profile posts either. So the bot's real edge is **anonymous large-print flow detection**, with the watched-trader list informing which markets are worth attention.

## Setup

```bash
cd ~/Tools/kalshi-copybot
npm install
cp .env.example .env
```

### Going live (optional)

1. Generate an API key at https://kalshi.com/account/profile → API Keys → "Create API key". Download the private key PEM.
2. `mv ~/Downloads/kalshi-private-key*.pem ./kalshi_private_key.pem && chmod 600 ./kalshi_private_key.pem`
3. Edit `.env`:
   ```
   KALSHI_API_KEY_ID=<from the Kalshi UI>
   KALSHI_PRIVATE_KEY_PATH=./kalshi_private_key.pem
   ANTHROPIC_API_KEY=<optional, for ambiguous post parsing>
   BOT_DRY_RUN=false
   ```
4. Confirm: `node src/scripts/balance.js`

## Run

```bash
# Foreground:
node src/index.js

# Background:
nohup node src/index.js > logs/bot.log 2>&1 &

# Dashboard only:
node src/dashboard/server.js
```

Dashboard: http://localhost:7474

## Smoke test

```bash
node src/scripts/smoke.js
```

Runs the curator, captures 30s of tape, fires the engine once, prints DB row counts.

## Structure

```
src/
├─ index.js             # orchestrator: cron jobs + dashboard subprocess
├─ db.js                # SQLite schema
├─ risk.js              # caps + daily loss kill + dedupe
├─ scrape/
│  ├─ browser.js        # shared puppeteer instance
│  ├─ leaderboard.js    # kalshi.com/social → top traders
│  └─ profiles.js       # /ideas/profiles/<user> → posts + metadata
├─ parse/post.js        # regex + haiku-4.5 fallback for trade theses
├─ market/
│  ├─ tape.js           # public /markets/trades polling + ring buffer + large-print detector
│  └─ meta.js           # /markets crawl + high-vol filter
├─ signal/
│  ├─ engine.js         # combines posts + flow → signals
│  └─ curator.js        # weekly trader re-ranking
├─ execute/
│  ├─ kalshi.js         # RSA-PSS signed REST + WS client
│  └─ executor.js       # places limit orders, logs to db
└─ dashboard/
   ├─ server.js         # Express + SSE
   └─ index.html        # dark UI, refresh 5s
```

## Backtest

```bash
npm run backtest
# or with knobs:
BT_FADE=true BT_TAKE_PROFIT=10 BT_LOOKBACK_MS=600000 BT_MIN_IMBALANCE=1.5 npm run backtest
```

Replays the collected `trades_tape` against the engine logic and reports hit rate, gross/fee/net P&L, and top winners/losers.

Knobs: `BT_MIN_FLOW_HITS`, `BT_MIN_FLOW_VOLUME`, `BT_MIN_IMBALANCE`, `BT_LOOKBACK_MS`, `BT_COOLDOWN_MS`, `BT_STOP_LOSS`, `BT_TAKE_PROFIT`, `BT_FADE=true` to invert signals.

**Initial finding** (24 min of tape, 2026-05-11): both follow-flow and fade-flow lose to fees on the current esports/tennis-heavy tape. Need to collect a few days of data and re-evaluate before live arming.

## Tuning

| Knob | Where |
|---|---|
| Watchlist size | `WATCH_TOP_N` in `src/signal/curator.js` |
| Signal thresholds | `MIN_FLOW_HITS`, `MIN_FLOW_VOLUME` in `src/signal/engine.js` |
| Large-print floor | `LARGE_PRINT_FLOOR` in `src/market/tape.js` |
| Risk caps | `BOT_MAX_CONTRACTS_OPEN`, `BOT_DAILY_LOSS_KILL_USD` in `.env` |
| Order size | `ORDER_SIZE` in `src/execute/executor.js` |
| Trader scoring weights | `score()` in `src/signal/curator.js` |

## Sub-agent

`~/.claude/agents/kalshi-copybot.md` defines a Claude Code sub-agent that knows how to start/stop/check/tune the bot. Invoke via Agent tool with `subagent_type: 'kalshi-copybot'`.
