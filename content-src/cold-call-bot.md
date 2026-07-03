# cold-call-bot

Claude agent that finds 5★ local businesses without websites, then writes a checkbox checklist of phone numbers to a Google Doc.

## Setup

```bash
cd /Users/angus/cold-call-bot
npm install
cp .env.example .env
# fill in ANTHROPIC_API_KEY and Google OAuth creds
```

### Google OAuth (one-time)

1. console.cloud.google.com → enable **Docs API** and **Drive API**.
2. Create OAuth 2.0 client (Desktop). You can reuse the credentials you used for `alpha-sites` Gmail — just add the new scopes.
3. developers.google.com/oauthplayground → "Use your own OAuth credentials" → request:
   - `https://www.googleapis.com/auth/documents`
   - `https://www.googleapis.com/auth/drive.file`
4. Sign in, exchange code, copy the refresh token into `.env` as `GOOGLE_REFRESH_TOKEN`.

## Usage

```bash
npm run run -- --query "restaurants in Santa Barbara CA" --count 15
npm run run -- --query "auto repair shops in Ventura CA" --count 20 --title "Tuesday calls"
```

Each run creates a fresh Google Doc titled like `Cold Call List — restaurants in Santa Barbara CA — 2026-04-28` with one checkbox per lead.

## Lead criteria

- 5.0★ rating (or 4.9+ if 5.0 has too few reviews)
- 25+ reviews
- No business website listed on Yelp / Google
- Has a phone number
- Single-location, family-owned (skip chains/franchises)

## Tuning

The agent's system prompt lives in `src/agent.ts`. The two highest-leverage knobs:

- Rating/review threshold (`SaveInput` validation in agent.ts)
- Search strategy (the `SYSTEM` constant)
