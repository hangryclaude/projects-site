# creator-hunt

Finds startup / build-in-public / founder creators (**10k–100k followers**) across
**X, Threads, Instagram, TikTok**, extracts their business emails, scores them for NOX fit,
writes a personalized offer email for each, verifies deliverability, and (optionally) sends —
pitching them to post about **[NOX / heynox.com](https://heynox.com)** for
**$50 cash + free lifetime NOX Pro + an affiliate cut + a repost**.

Why this niche: NOX is a unified AI inbox for founders/operators, so a startup creator's
audience *is* the ICP.

## Pipeline

```
seeds / import / apify-discover
      │   (hopperleads 116 curated · publicbuilders · X/TikTok/IG/Threads via Apify)
      ▼
classify ──► enrich-links ──► verify ──► score ──► pitch ──► queue ──► send / followup
(free ai     (crawl bio       (local MX   (fit +   (free ai    (review    (Gmail,
 fleet ICP    links for        then        band +   fleet,      queue.md)   25/day,
 gate)        emails, $0)      Reoon)      email)   $50 offer)             bounce→suppress)
```

Discovery is **Apify** (pay-per-result actors — your own accounts/IP are never used, so no ban
risk). The old logged-in-browser discovery (`src/discover.js`, `src/browser.js`) is retained as
a fallback only.

## Setup

```bash
npm i
cp .env.example .env      # fill in the keys you need (all optional except for the step you run)
```

`.env` keys:
- `GMAIL_USER` + `GMAIL_APP_PASSWORD` — only for `--send` ([app password](https://myaccount.google.com/apppasswords), needs 2FA)
- `APIFY_TOKEN` — only for `--stage=…` discovery ([console](https://console.apify.com/account/integrations))
- `REOON_API_KEY` — email verification, free 600/mo ([reoon](https://emailverifier.reoon.com)); without it `--verify` does local MX only

**Required before `--send`:** set `sender.address` (a real physical mailing address) in
`config.json`. Sending hard-refuses without it (CAN-SPAM).

## Run

Steps compose — pass only the ones you want. Nothing sends until `--send`.

```bash
# --- free: batch 1 (no API keys) ---
node run.js --import-hopperleads --dry     # 116 curated prospects (50 with emails) → queue.md
node run.js --seeds-public                 # + publicbuilders #buildinpublic founders

# --- paid discovery (Apify, budget-gated) ---
node run.js --stage=x --max-items=200      # cheap schema-check first (~$0.05)
node run.js --stage=x                       # full X discovery
node run.js --stage=tiktok
node run.js --stage=instagram

# --- enrichment / gating (free) ---
node run.js --classify                      # ICP-tag in-band creators (free ai fleet)
node run.js --enrich-links                  # crawl bio links for emails
node run.js --stage=threads                 # Threads probe — ICP-confirmed handles only
node run.js --stage=contact                 # Apify IG contact scraper — email-less ICP IG only

# --- verify + send ---
node run.js --verify                        # local MX + Reoon; sets who's sendable
node run.js --dry                           # re-score/re-pitch from state (no discovery)
node run.js --send                          # send to verified, unsuppressed, unsent targets
node run.js --followups --send              # +3d bump to non-repliers

# --- list hygiene ---
node run.js --suppress=someone@x.com        # opt someone out (never emailed again)
node run.js --replied=someone@x.com         # mark a reply (stops their follow-up)
```

Force specific creators: add `x:handle` / `threads:handle` / `instagram:handle` / `tiktok:handle`
lines to `data/seed-handles.txt` (unknown platforms are rejected, not silently miscategorized).

## Budget safety

Every Apify stage is gated by `config.apify.stageBudgets` and `totalBudget`. `assertBudget()`
throws before a run if the stage or total cap is reached, and `recordSpend()` persists real
USD from each finished run to `data/state.json`. Full 4-platform pass ≈ $30–37 of a $45 budget.

## Config

`config.json`: the offer, per-platform deliverable, targeting (keywords/hashtags, 10k–100k band,
sweet-spot), Apify actor IDs + budgets, send cap + follow-up cadence, sender identity/address.

## Compliance

- CAN-SPAM: physical-address + opt-out footer on every email; send refuses without an address.
- FTC: the pitch requires the creator to add a `#ad` disclosure.
- Verified-only sending (Reoon `safe`/`valid`/`role_account`) keeps bounces under the reputation
  cliff; bounces and "no thanks" (via `--suppress`) feed a persistent suppression list.
