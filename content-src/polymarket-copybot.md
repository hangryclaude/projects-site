# polymarket-copybot

Copy-trades the top Polymarket whale wallets. Polygon CLOB execution via
`@polymarket/clob-client`. Phantom wallet, $17 USDC bankroll, hard risk caps.

Sibling to `~/Tools/kalshi-copybot` (port 7474). This one runs on **port 7575**.

## What it does

1. `src/scrape/leaderboard.js` — pulls `lb-api.polymarket.com/profit?window=…`
   for `all|30d|7d|1d` + volume, scores each wallet, marks top
   `COPY_TOP_N_TRADERS` as `watched`.
2. `src/scrape/activity.js` — every 60s, polls
   `data-api.polymarket.com/activity?user=0x…` per watched wallet, inserts
   new trades. ~1.2s delay between wallets to be polite.
3. `src/scrape/markets.js` — pulls `gamma-api.polymarket.com/markets` for
   condition_ids we've seen recently (end_date, liquidity, 24h vol).
4. `src/signal/engine.js` — every 60s, scans the last 15 min for ≥2 watched
   whales BUYing the same outcome (each trade ≥ `MIN_WHALE_TRADE_USDC` USDC).
   Dedupes per (condition, outcome) for 30 min. Fires signal weighted by
   the sum of those whales' scores.
5. `src/execute/risk.js` — gates every order: max 5 open, ≥2h TTR, ≥$1k
   24h volume, daily $-loss kill, 80% bankroll cap.
6. `src/execute/executor.js` — places a GTC limit at top-of-book ask + 1c
   slip. **DRY by default.** Hits the CLOB only if `LIVE=true && DRY_RUN=false`.
7. `src/execute/marker.js` — every 2 min, marks open positions to market
   from `clob/price` for paper P&L.
8. `src/dashboard/server.js` — express + SSE on **:7575**. Dark UI.

## Run / stop

```bash
cd ~/Tools/polymarket-copybot
npm install
./scripts/run.sh                # idempotent: kills old procs first, then loops with restart
```

Foreground / quick smoke tests:

```bash
npm run scrape    # pull leaderboard, mark watched
npm run activity  # poll watched wallets once
npm run signal    # run signal engine once
npm run dash      # dashboard only
npm start         # full orchestrator (no auto-restart)
```

Stop:

```bash
pkill -9 -f 'polymarket-copybot/src/index\.js'
pkill -9 -f 'polymarket-copybot/src/dashboard/server\.js'
lsof -ti :7575 | xargs kill -9
```

## Where to read state

| What | Where |
|---|---|
| Live dashboard | http://localhost:7575 |
| JSON state | http://localhost:7575/api/state |
| SQLite db | `data/poly.db` |
| Logs | `logs/bot-*.log` (last 10 kept) |
| Wallet addr | `data/poly.db` → `state` table key `wallet_address` |

Useful SQL:

```sql
-- top watched whales
SELECT pseudonym, ROUND(score,2) s, pnl_30d, pnl_7d, trade_count
FROM traders WHERE watched=1 ORDER BY score DESC LIMIT 20;

-- recent signals
SELECT datetime(fired_at/1000,'unixepoch','localtime') t, title, outcome,
       whale_count, ROUND(weight,1) w, executed, reason
FROM signals ORDER BY fired_at DESC LIMIT 10;

-- orders
SELECT datetime(placed_at/1000,'unixepoch','localtime') t, title, outcome,
       size_usdc, price, fill_price, pnl_usdc, status, dry
FROM orders ORDER BY placed_at DESC LIMIT 20;

-- daily P&L
SELECT date(placed_at/1000,'unixepoch','localtime') day,
       COUNT(*) n, ROUND(SUM(size_usdc),2) deployed, ROUND(SUM(pnl_usdc),2) pnl
FROM orders GROUP BY day ORDER BY day DESC LIMIT 7;
```

## Tune knobs (.env)

```ini
WALLET_PRIVATE_KEY=0x…   # Phantom Polygon EVM key (32-byte hex)
DRY_RUN=true             # KEEP TRUE until you've validated. Logs only.
LIVE=false               # MUST be 'true' AND DRY_RUN=false to place real orders.

BANKROLL_USDC=17         # total bankroll cap
MAX_COPY_SIZE_USDC=1     # per-order ceiling
DAILY_LOSS_CAP_USDC=3    # daily kill threshold
COPY_TOP_N_TRADERS=50    # how many leaderboard wallets to watch
MIN_TRADER_PNL_USDC=100000  # must have ≥$100k in all-time OR 30d profit
MIN_WHALE_TRADE_USDC=500    # ignore individual whale trades smaller than this
```

Hard-coded floors (in code, not .env): max 5 open positions; min $1 per
order (Polymarket minimum); 80% remaining-bankroll cap per order; skip if
market resolves in <2h; skip if 24h volume <$1k.

## Going live (TODO before flipping `LIVE=true`)

1. **Fund the wallet.** Coinbase → buy USDC → withdraw to Phantom address
   on **Polygon network** (NOT Ethereum mainnet). Also send ~$3 MATIC for
   gas. Connect Phantom on polymarket.com → Deposit (this proxies into a
   Polymarket-managed wallet — the proxy address is what
   `@polymarket/clob-client` will use, **not** the raw signer address).
2. **First-run API key derivation.** On first call with LIVE=true, the
   client calls `client.createOrDeriveApiKey()` which signs an EIP-712
   message with the wallet. The returned `{key, secret, passphrase}` should
   be persisted to `.env` (`POLYMARKET_API_KEY`, `_SECRET`, `_PASSPHRASE`)
   so subsequent boots skip re-derivation. Right now the executor derives
   each boot — manually copy these into .env after the first live boot.
3. **Validate dry-run track record first.** Let the bot run 2-3 days in
   DRY mode and inspect `orders.pnl_usdc` distribution. If the mark-to-
   market simulated PnL looks profitable (>55% win rate, positive net
   after slippage), only then flip live.
4. **VPN.** Polymarket geoblocks US. Run behind Canada/EU VPN. If
   `data-api` returns 451/403, you'll see `GEOBLOCK` in the runs log.

## Known gaps / TODO

- Signal scoring is a simple `whale_count + sum(score)` blend. No
  evaluator (no fair-value check, no momentum/orderbook factors). Add a
  `src/signal/evaluator.js` modelled on kalshi-copybot's once we have ~50
  dry orders worth of feedback.
- No bait filter yet. Sibling repo has `polymarket/bait_filter.js`; port
  it if leaderboard surfaces wash-traders.
- No SELL / exit logic. Orders sit open until manually closed or market
  resolves. For copy-mode that's fine (whales also sit), but a stop-loss
  / take-profit would be smart before live.
- `@polymarket/clob-client` LIVE path is wired but never exercised. Read
  through executor.js carefully + try a $1 manual order via the package
  REPL before flipping `LIVE=true`.

## Architecture notes

- **No private key in logs.** `index.js` masks to `0x…last4`. The derived
  EVM address goes into `state.wallet_address`.
- **Idempotent launcher.** `scripts/run.sh` pre-kills anything on :7575
  + any zombie node procs matching the path, then loops with 5s
  restart, then rotates `logs/bot-*.log` to last 10.
- **All trades stored.** `trades` table keeps every watched-wallet trade
  (BUY and SELL), not just signals — so we can backtest other strategies
  later without re-scraping.
