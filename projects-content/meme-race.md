# Meme Race

Turn $20 into $10K before "Will" does. A single-page browser game where you place leveraged bets on real meme coin prices, and your P/L races a rival down a neon synthwave track. Half trading sim, half arcade grudge match.

## How it works

Live prices for DOGE, SHIB, PEPE, BONK, WIF, FLOKI, and BRETT come from the CoinGecko free API (no key) every 30 seconds. You open leveraged positions; your portfolio P/L and Will's race each other down a 3D track rendered in Three.js — first to $9,980 profit wins. There's an all-in roulette with a weighted outcome table (45% chance of a 0x rug, 0.5% chance of a 100x moonshot). You can manually set Will's P/L to keep the rivalry honest. Everything persists in localStorage across reloads.

## Stack

Vanilla ES modules, Three.js (CDN), CoinGecko free API

## Status

Live at meme-race-silk.vercel.app — playable.
