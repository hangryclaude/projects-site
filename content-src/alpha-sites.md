# Alpha Sites

Automated pipeline that finds local businesses without websites, generates a clean site for each one via Claude + web search, and pitches it for $50.

## How it works

```
Discover  →  Enrich  →  Generate  →  Review  →  Send
(agent)      (agent)     (LLM)        (you)       (Gmail + LLM)
```

**Two paths, same schema:**

- **Hosted (default):** `POST /api/pipeline/discover` runs a Claude agent on Vercel. It uses `web_search` + `web_fetch` to find no-website businesses, save them to Supabase, and chain straight into LLM site generation. No local worker needed.
- **Local fallback:** `npm run pipeline -- serve` runs Playwright locally (cheaper, scrapes Google Maps directly).

---

## One-time setup

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. SQL Editor → paste `supabase/schema.sql` → Run
3. Settings → API → copy `URL`, `anon`, and `service_role` keys into `.env`

### 2. Anthropic

1. Create an API key at [console.anthropic.com](https://console.anthropic.com)
2. Drop into `.env` as `ANTHROPIC_API_KEY`
3. Pick a model (`CLAUDE_MODEL`): `claude-opus-4-7` (default, best quality) or `claude-sonnet-4-6` (~3x cheaper)

### 3. Gmail OAuth (for sending)

1. Make a dedicated Gmail (e.g. `alphasites.offers@gmail.com`)
2. [console.cloud.google.com](https://console.cloud.google.com) → enable **Gmail API** → create **Desktop** OAuth client
3. Use [OAuth Playground](https://developers.google.com/oauthplayground) with your own creds + `gmail.send` scope → sign in as the outreach Gmail → get a refresh token
4. Put `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_FROM` in `.env`

### 4. Environment + install

```bash
cp .env.example .env
# fill in all the blanks
npm install
```

---

## Daily use

```bash
npm run dev
# → http://localhost:3000
```

**In the dashboard:**

1. Type a neighborhood in the discover form (e.g. `restaurants in Montecito CA`) → click **Queue discovery**
2. Watch the active-run banner count up as the agent finds businesses
3. Click **Preview** on generated rows, **Approve** the good ones (bulk select works)
4. Click **Send N approved** — per-business LLM emails go out via Gmail

**Via API:**

```bash
curl -X POST https://your-app.vercel.app/api/pipeline/discover \
  -H "Authorization: Bearer $PIPELINE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "salons in Beverly Hills", "max": 5, "async": true}'
```

**When someone replies yes:**

1. Send them a Stripe/Venmo link for $50
2. Register `suggested_domain` on Namecheap/Porkbun (~$12)
3. In Vercel, add the domain → point DNS → mark the row as `converted`

---

## Deploying

```bash
vercel
```

Set all env vars in Vercel project settings. When you eventually own an umbrella
domain (e.g. `alphasites.app`), add it + a `*.alphasites.app` wildcard. The
`src/proxy.ts` automatically rewrites `<slug>.alphasites.app` → `/sites/<slug>`.

Until then, preview links use `https://your-project.vercel.app/sites/<slug>`.

---

## Cost controls

- `DAILY_COST_LIMIT_USD=5` in `.env` — hard cap; over this and new discovers return 429
- Swap `CLAUDE_MODEL=claude-sonnet-4-6` for ~1/3 the cost of Opus
- Set `max` lower in the API call (default 3 businesses per run)
- Dashboard shows cumulative cost and avg cost/site

---

## Tuning knobs

- `src/lib/agent/discover.ts` — agent system prompt + search strategy
- `src/lib/generator/llm.ts` — site-copy prompt
- `src/lib/email/llm.ts` — **THE email prompt** — this is where conversion lives or dies
- `src/lib/generator/templates/*.tsx` — the four fallback site templates

---

## Out of scope for v1

- Self-serve claim / Stripe automation — manual for now
- Reply/open tracking — use the CSV export to track offline
- Dashboard auth — Vercel URL is unguessable; set `PIPELINE_API_KEY` if you want auth on the API
