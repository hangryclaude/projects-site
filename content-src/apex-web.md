# APEX · GPS Race Telemetry 🏁

**Real speed. Real bikes. Real podiums.** Surron · Pedal · Dirt · Street.

APEX turns GPS tracks into races: record a run, and APEX computes your speed
telemetry, ranks it on the leaderboard, and builds a feed of podiums across riding
styles. Built mobile-first (installable PWA).

## Features

- **Runs** — record/import a GPS run; `lib/geo.ts` derives speed, distance and splits.
- **Leaderboard** — ranked times/speeds by category (Surron, pedal, dirt, street).
- **Feed** — recent runs and podiums from riders.
- **Profile & settings** — per-rider history and preferences.
- **PWA** — installable, black-translucent status bar, app title "Apex".

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

### Environment

Run data is stored in **Upstash Redis**. Set the connection vars (auto-provisioned if
you add Upstash via the Vercel Marketplace):

```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## Architecture

- `app/` — App Router pages: `feed`, `leaderboard`, `profile`, `settings`, plus
  `api/runs` (record/list runs).
- `lib/geo.ts` — GPS → speed/distance telemetry. `lib/store.ts` — Upstash Redis data
  layer. `lib/types.ts` — shared types.

> Note: this targets **Next.js 16** (see `AGENTS.md`) — some APIs differ from older
> Next versions.

## Stack

Next.js 16 · React 19 · Upstash Redis · Tailwind CSS 4 · TypeScript · deploy on Vercel.
