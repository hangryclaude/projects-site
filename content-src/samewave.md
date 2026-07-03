# samewave

A music-taste reader & compatibility engine. Log in with Spotify → get a sharp read on
your taste → compare your vibe with someone else's, with a 0–100 score, the honest
breakdown, and a recommendation bridge (songs from their world you'd love, and yours
they would).

Built because: met someone, loved her music, different vibes — wanted to *see* the overlap.

## Stack
- **Next.js (App Router) + TypeScript + Tailwind**, deploy on Vercel.
- **Auth.js (NextAuth v5)** Spotify provider, server-side Authorization Code flow + refresh.
- **Upstash Redis** (Vercel Marketplace) for snapshots; **file fallback** for local dev (no setup).
- **Free-first LLM** via `lib/ai.ts` → GitHub Models then Ollama Cloud (zero API cost).

## Why no audio-features / recommendations
Spotify **blocked** `audio-features`, `audio-analysis`, `recommendations`, `related-artists`,
browse, and bulk `?ids=` lookups for any app created after Nov 2024. So "vibe" is built from
**artist genres + top-artist/track overlap + LLM interpretation** — not energy/valence numbers.
Cross-recs are LLM-generated and rendered as `open.spotify.com/search/<name>` links (no
dependency on the dead `/recommendations` endpoint).

## Spotify Dev Mode reality
New apps are a **5-user, manually-allowlisted sandbox**, and the app owner must have Premium.
Extended Mode (unlimited users) needs a registered business + 250k MAU — not for hobby tools.
So this is a **private 2–5 person tool**, not a public link. The `/manual` page lets you compare
by typing in artists, so it's useful before anyone is allowlisted.

## Local setup
1. `npm install`
2. `cp .env.example .env.local` and fill in (see `.env.example` for what each is):
   - `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` (from developer.spotify.com)
   - `AUTH_SECRET` (`openssl rand -base64 32`)
   - `GITHUB_TOKEN` and/or `OLLAMA_API_KEY` (free LLM)
3. In the Spotify dashboard, register redirect URI `http://127.0.0.1:3000/api/auth/callback/spotify`
   (**not** `localhost` — Spotify bans it now), and **allowlist** your Spotify account.
4. `npm run dev` → open `http://127.0.0.1:3000`

## Routes
- `/` — login / landing
- `/me/[id]` — one person's taste read (archetype, genres, constellation)
- `/compare/[a]/[b]` — the vibe match
- `/manual` — compare by typing artists, no login
- `/api/ai-ping` — sanity-check the free LLM is reachable
