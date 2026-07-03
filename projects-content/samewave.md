# samewave

Met someone, loved her music, different vibes — wanted to *see* the overlap. samewave logs you in with Spotify, gives you a sharp read on your taste, then compares your vibe with someone else's: a 0–100 score, the honest breakdown, and a recommendation bridge — songs from their world you'd love, and yours they would.

## How it works

Next.js App Router with Auth.js (NextAuth v5) doing the server-side Spotify authorization-code flow with refresh. Taste snapshots go to Upstash Redis, with a file fallback so local dev needs zero setup. The interesting constraint: Spotify killed `audio-features`, `recommendations`, and `related-artists` for all apps created after Nov 2024, so "vibe" can't come from energy/valence numbers. Instead it's built from artist genres, top-artist/track overlap, and LLM interpretation — the free-first router (GitHub Models, then Ollama Cloud) does the reading and generates cross-recommendations, rendered as Spotify search links since the recommendations endpoint is dead. New Spotify apps are also a 5-user, manually-allowlisted sandbox, so this is a private 2–5 person tool by design; a `/manual` page lets anyone compare by typing artists, no login.

## Stack

TypeScript, Next.js, Tailwind, Auth.js, Spotify Web API, Upstash Redis, free-first LLM (GitHub Models / Ollama Cloud), Vercel

## Status

Working — private by Spotify's dev-mode rules, not a public link.
