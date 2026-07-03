# APEX

GPS race telemetry for kids on bikes — Surron, pedal, dirt, street. Record a run and APEX computes your speed, distance and splits, ranks it on a per-category leaderboard, and builds a feed of podiums. Strava, but for the specific question of who's fastest on the hill.

## How it works

Mobile-first installable PWA. `lib/geo.ts` turns raw GPS tracks into speed/distance telemetry; runs post to an `api/runs` route and land in Upstash Redis. Feed, leaderboard, profile and settings are App Router pages over that one data layer.

## Stack

TypeScript, Next.js 16, React 19, Upstash Redis, Tailwind CSS 4

## Status

Working prototype, deploys on Vercel.
