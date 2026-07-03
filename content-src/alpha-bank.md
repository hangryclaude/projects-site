# Alpha Bank 🏦

A play-money banking system for the Alpha classroom — checking & savings, transfers,
peer-to-peer pay, achievements and teacher admin. Replaces the broken spreadsheet
the class outgrew with a real-time, animated app kids actually want to open.

## Features

- **Accounts** — checking & savings balances per student, with an animated balance
  card and live transaction history.
- **Transfers & Peer Pay** — students send each other Alpha currency (`TransferModal`,
  `PeerPayModal`) with confirmations and toasts.
- **Achievements** — badges and milestones (`AchievementBadge`, `lib/achievements.ts`)
  to reward good habits.
- **Charts** — balance and activity over time (`Charts.tsx`).
- **Work-hours lockout** — the bank locks outside allowed hours (`LockoutScreen`,
  `useLockout`) so it can't be used during the wrong part of the day.
- **Teacher admin** — manage students, balances and the school (`SchoolProvider`,
  `useSchool`).
- **Spreadsheet import** — bring the old data in from Excel (`xlsx`).
- **Delightful UI** — confetti, particle background, framer-motion animations, custom
  avatars and icons.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

### Environment

Auth and real-time data run on **Firebase**. Provide your Firebase web config via env
(see `src/lib/firebase.ts`):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Architecture

- `src/app/` — Next.js App Router (layout, page, global styles).
- `src/components/` — UI: balance card, transfer/peer-pay modals, charts, lockout,
  achievements, confetti, particle background, sidebar, toasts.
- `src/hooks/` — `useAuth`, `useSchool`, `useLockout`.
- `src/lib/` — `firebase.ts`, `achievements.ts`, `types.ts`, `constants.ts`.

Deploys on **Netlify** (`netlify.toml`, `@netlify/plugin-nextjs`).

> Note: targets **Next.js 16** (see `AGENTS.md`) — some APIs differ from older versions.

## Stack

Next.js 16 · React 19 · Firebase · framer-motion · Tailwind CSS 4 · TypeScript · Netlify.
