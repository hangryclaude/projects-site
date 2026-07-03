# Kalshi Copybot

A "smart money" bot for Kalshi prediction markets. The original plan was to copy-trade the leaderboard's top traders. One problem: Kalshi's trade tape is fully anonymous, so you literally cannot see who traded what. Instead of dying, the bot pivoted — it detects unusual large prints in the anonymous flow, and uses the scraped leaderboard to decide which markets deserve attention at all.

## How it works

An orchestrator runs cron jobs against SQLite. Puppeteer scrapes kalshi.com/social for the leaderboard and trader posts; a parser extracts trade theses with regex, falling back to Haiku 4.5 for ambiguous ones. Meanwhile a tape watcher polls the public trades endpoint into a ring buffer and flags large prints. The signal engine blends both feeds, a risk layer enforces position caps and a daily-loss kill switch, and an executor places limit orders through Kalshi's RSA-PSS-signed REST API. Express dashboard with SSE on :7474.

There's also a backtester that replays collected tape against the engine. First finding, from 24 minutes of tape: both following the flow and fading it lose to fees on the esports/tennis-heavy markets. Which is exactly why it ships dry-run by default with a $5 bankroll when armed.

## Stack

Node.js, Puppeteer, SQLite, Express + SSE, Kalshi REST/WS API (RSA-PSS signing), Claude Haiku for post parsing

## Status

Working in dry-run; not armed for live trading until a few days of tape says the edge beats the fees.
