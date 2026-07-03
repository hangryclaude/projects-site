# Polymarket Copybot

Copy-trades Polymarket's whale wallets. Unlike Kalshi, Polymarket runs on-chain, so every wallet's trades are public — meaning you can actually see what the $100k+ profit accounts are buying and follow them in. Sibling to kalshi-copybot; this one lives on port 7575.

## How it works

Four scrapers feed a SQLite db: the profit leaderboard (all-time / 30d / 7d / 1d windows) scores wallets and marks the top 50 as watched; an activity poller checks each watched wallet every 60 seconds; a markets scraper pulls liquidity and end dates from the gamma API. The signal engine fires when two or more watched whales buy the same outcome within 15 minutes, each trade over $500, weighted by the whales' scores.

A risk gate checks everything before an order goes out: max 5 open positions, market must resolve more than 2 hours out, $1k minimum 24h volume, daily loss kill, 80% bankroll cap. Execution goes through @polymarket/clob-client with GTC limit orders on Polygon — but only if two separate env flags agree. Dry by default; a marker process marks open positions to market every 2 minutes for paper P&L.

Bankroll if it ever goes live: $17 USDC in a Phantom wallet. Risk management for the truly cautious degenerate.

## Stack

Node.js, @polymarket/clob-client, Polygon, SQLite, Express + SSE, Polymarket leaderboard/data/gamma APIs

## Status

Working in dry-run. Live path is wired but never exercised; no exit logic yet. Validating paper P&L before flipping the switch.
