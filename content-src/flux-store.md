# flux-store ⚡

A polished e-commerce storefront for **curated minimal tech accessories** — ambient
lighting, desk gadgets, the stuff that elevates a space. Full shopping flow with a
cart, checkout and order-success page, wrapped in smooth motion.

## Features

- **Storefront** — curated product grid with a clean, minimal aesthetic.
- **Cart** — add/remove items, persistent cart state (Zustand).
- **Checkout → Success** — complete flow (`/cart` → `/checkout` → `/success`).
- **Motion** — framer-motion transitions throughout.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
```

## Architecture

- `app/` — App Router: storefront (`page.tsx`), `cart`, `checkout`, `success`.
- State via **Zustand**; animations via **framer-motion**.
- Deploys on **Netlify** (`@netlify/plugin-nextjs`).

## Stack

Next.js 16 · React 19 · Zustand · framer-motion · Tailwind CSS 4 · TypeScript.
