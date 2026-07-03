# Alpha Sites

An automated pipeline that finds local businesses without websites, generates a clean site for each one, and emails them a $50 offer. Discover → enrich → generate → review → send, with a human approval step in the middle so nothing embarrassing ships.

## How it works

Two discovery paths, same schema: hosted (a Claude agent on Vercel using web_search + web_fetch to find no-website businesses, saving to Supabase and chaining straight into site generation) or a local Playwright fallback that scrapes Google Maps for cheaper. A dashboard queues discovery runs, previews the generated sites, and bulk-approves; approved rows get a per-business LLM-written email via Gmail OAuth. On a yes: Stripe link, ~$12 domain, point DNS, mark converted. A proxy rewrites `<slug>.alphasites.app` to the generated site once the umbrella domain exists.

## Stack

TypeScript, Next.js, Supabase, Claude API, Playwright, Gmail API, Vercel

## Status

Working end-to-end. Parked pre-umbrella-domain.
