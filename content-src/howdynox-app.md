# nox-website

Marketing site for [RPLY by NOX](https://www.heynox.com) — a unified inbox for iMessage, WhatsApp, Slack, and email on macOS.

## Stack

- Next.js 15 (Pages Router; App Router used for `/referral/[code]`)
- React 18
- TypeScript
- Tailwind CSS + Sass modules
- Supabase (waitlist, referrals, QR tracking)
- Stripe (subscription checkout)
- GSAP / Framer Motion / Three.js / Matter.js / p5 (animations)

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

Required environment variables are listed in [`.env.example`](./.env.example). Copy to `.env.local` and fill in real values.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (`next/core-web-vitals`) |

## Deployment

Deployed via [Vercel](https://vercel.com). Pushes to `main` ship to production; PR branches get preview URLs automatically.

## Conventions

See [`CLAUDE.md`](./CLAUDE.md) for git safety rules — notably: never `git add .`, one concern per commit, and API routes are production infrastructure that require explicit intent for deletion.

Additional documentation lives in [`docs/`](./docs/).
