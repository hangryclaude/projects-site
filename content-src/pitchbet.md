# PitchBet 🎤📈

**Back the startup that wins.** A live, play-money prediction market for startup
pitch competitions — the audience bets fake currency on who'll win, odds move in
real time, and the admin settles payouts when a winner is called.

**Live:** https://pitchbet.vercel.app

## What it does

- **Bet on pitches** — each startup is a market; back the ones you think will win.
- **Plain-English odds + live payout preview** — see exactly what a bet pays before
  you place it, no decimal-odds math required.
- **Real-time** — the board polls every few seconds, so pools and odds update live
  as the room bets. Toast notifications confirm every action.
- **Guided flow** — pick a name, submit a startup, place a bet — each in a simple
  step, designed so a first-timer in the audience gets it instantly.
- **Admin winner panel** (`/admin`) — the host declares the winning startup and
  payouts are settled to everyone who backed it.
- **No accounts** — each browser gets a local play-money identity (`localStorage`),
  so people just open the link and start betting.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

State is stored in **Vercel Blob**, so it persists across the serverless functions
in production. Set `BLOB_READ_WRITE_TOKEN` (auto-provisioned when you add Vercel
Blob to the project).

## Stack

Next.js · React 19 · Vercel Blob (store) · deployed on Vercel.
