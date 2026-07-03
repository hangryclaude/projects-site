<div align="center">

# 🪝 LeadKit

**An open-source, self-hosted cold-outreach engine.**
Find leads → validate emails → craft personalized outreach → send → auto-handle replies.

Multi-provider. Free-tier friendly. Runs on your own machine.

</div>

---

## What it does

LeadKit is a complete outbound pipeline built from ~240 small Node agents. You bring your own
keys (or none — it degrades gracefully to free/local mode), point it at a niche + location, and it
runs the whole funnel:

```
FIND → ENRICH → VALIDATE → SEND → REPLY → BOOK → INVOICE
```

| Stage | What happens | Key agents |
|-------|--------------|------------|
| **Find** | 30+ sources surface real businesses — Google Maps, Yelp, Etsy, Shopify, GitHub, BBB, chambers of commerce, gov/permit/SOS data, OSM | `agents/*Finder.js` |
| **Enrich** | Fill in email, phone, tech stack, and an ICP fit score | `leadEnricher.js`, `contactEnricher.js`, `emailGuesser.js`, `icpScorer.js` |
| **Validate** | A 4-layer anti-bounce gate (see below) keeps you off blocklists | `validator.js`, `emailVerifier.js`, `simpleValidator.js` |
| **Send** | Ramp-aware sending through Resend or Mailgun, with warmup + reputation monitoring | `postman.js`, `scheduler.js`, `reputation.js`, `warmupEngine.js` |
| **Reply** | IMAP watcher classifies replies and routes hot ones to calendar → Zoom → invoice | `replyHandler.js`, `autoReplyDrafter.js`, `calendar.js`, `invoice.js` |

A local dashboard (`npm run dash`, default `http://localhost:7700`) shows the agent tree and live stats.

## The Validator (anti-bounce gate)

Four implementations, cheapest-first, so you almost never pay. Each lead is marked
`1 = valid`, `2 = hard-fail → do-not-contact`, or `3 = soft-fail`:

| Layer | Cost | Checks |
|-------|------|--------|
| `simpleValidator.js` | **$0** | syntax · disposable-domain block · role-account block (`postmaster@`…) · DNS MX |
| `emailValidator.js` | **$0** | regex · typo-fix (gmial→gmail) · disposable · MX |
| `emailVerifier.js` | **$0** | escalating syntax → MX → optional SMTP `RCPT TO` probe (never sends DATA) |
| `validator.js` | ~$0.008 | ZeroBounce API — paid primary, falls back to the free layers automatically |

## Quick start

```bash
git clone https://github.com/YOUR_GITHUB_USER/leadkit.git
cd leadkit
npm install
cp .env.example .env        # fill in whatever keys you have (all optional)
npm run dash                # open http://localhost:7700
```

Then drive the pipeline:

```bash
npm run find-leads          # source leads for your niche
npm run enrich-leads        # add emails / phones / scores
npm run validate            # run the anti-bounce gate
npm run scheduler           # ramp-aware sending daemon
npm run reply-watch         # watch the inbox and classify replies
# or run everything supervised together:
npm start
```

**No keys?** It still runs: AI routes to free providers, the marketplace runs in `free_mode`,
and sending stays disabled until you add a Resend or Mailgun key.

## Configuration

Everything is environment-driven — see [`.env.example`](.env.example). Highlights:

- **AI** — add any one of `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GROQ_API_KEY`, `GEMINI_API_KEY`; the router picks the cheapest available.
- **Sending** — `RESEND_API_KEY` (recommended) or `MAILGUN_API_KEY` + `MAILGUN_DOMAIN`.
- **Validation** — `ZEROBOUNCE_API_KEY` (optional; free DNS/MX fallback otherwise).
- **Replies** — `IMAP_*` for the inbox watcher; `CAL_COM_API_KEY` + `ZOOM_*` to auto-book.

## Architecture

```
agents/    240+ single-purpose agents (finders, enrichers, validators, senders, reply handlers)
server/    Express dashboard + orchestrator (run-all.js supervises the daemons)
scripts/   one-shot ops: domain provisioning, spam checks, SEO page generation, seeding
data/      SQLite DBs + per-account secrets (gitignored — never committed)
```

Each agent runs standalone (`node agents/<name>.js`) or supervised via `server/run-all.js`.
State is a local SQLite DB (`better-sqlite3`) — no external database required.

## ⚖️ Use responsibly

Cold outreach is regulated. **You are responsible for compliance.**

- Follow **CAN-SPAM** (US), **GDPR/PECR** (EU/UK), **CASL** (Canada), and your local laws.
- Only email businesses where you have a lawful basis; honor unsubscribes immediately (`server/unsubscribe.js` is built in).
- Don't spoof identities, use deceptive subject lines, or scrape data you're not allowed to.
- Warm your domains, keep volume sane, and monitor your bounce/complaint rates (`reputation.js`).

LeadKit ships an unsubscribe handler, a do-not-contact gate, and a bounce-protection validator —
use them. This software is provided as-is under the MIT License with no warranty.

## License

[MIT](LICENSE) — do what you want, no warranty.
