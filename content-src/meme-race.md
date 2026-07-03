# meme-race

**Live:** https://meme-race-silk.vercel.app

*Browser-based meme coin trading race — turn $20 into $10K before "Will" does.*

## What it does

A single-page app that lets you place leveraged bets on real meme coin prices (DOGE, SHIB, PEPE, BONK, WIF, FLOKI, BRETT) pulled live from the CoinGecko free API every 30 seconds. Your portfolio P/L and a rival ("Will") race each other down a neon synthwave 3D track rendered in Three.js — first to $9,980 profit wins. You can also spin an all-in roulette (0x rug at 45% through 100x moonshot at 0.5%). State persists in `localStorage` across reloads.

## Run

```bash
./serve.sh          # serves on http://localhost:7676
# or
python3 -m http.server 7676
```

Then open `http://localhost:7676` in a browser.

## Use

- **Place a bet** — pick a coin, enter a USD amount, optionally override the entry price, click `+ OPEN POSITION`
- **Close positions** — manage open trades from the positions panel
- **Spin** — all-in gamble against the weighted outcome table
- **Set Will's P/L** — manually enter Will's current P/L to update the rival racer
- **Reset** — wipes state back to $20 starting bankroll

## Stack

Vanilla ES modules · Three.js (CDN) · CoinGecko free API (no key, no paid API)
