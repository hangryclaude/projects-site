# Leads Cold Call

A cold-calling cockpit for pitching heynox to real-estate offices. Scrapes phone numbers for free, feeds you a live script with rotating A/B prices, and keeps score on which price actually closes. You place every call yourself — it just makes sure you never dial blind.

## How it works

Three scripts. `scrape.js` drives Google Maps with Playwright over every niche × city in `config.js`, scrolls the feeds, qualifies leads on rating/reviews/phone, and dedupes into `leads.db` — no API, no cost. `call.js` pulls the next best lead (warm ones first), prints the pitch from `pitch.js` with a rotating price variant (monthly / annual / lifetime), and logs the outcome; a `sold` fires an iMessage via `cc-text`. `stats.js` reports answer rate, close rate, and the pricing A/B scoreboard, optionally texted to me.

The pitch: heynox drafts the perfect reply in any app in ~2 seconds, and in real estate speed-to-lead wins deals. $100/seat, team-wide.

## Stack

Node, Playwright, SQLite, cc-text (iMessage).

## Status

Working — nothing dials automatically by design; DNC compliance is on the caller.
