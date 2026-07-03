# inbox-engine

Lead-sourced cold email that actually lands in the inbox — at scale. The engine
sources leads, verifies them, warms up a fleet of sending mailboxes for two
weeks, then sends CAN-SPAM-compliant cold email across ~100 domains while a
safety layer protects deliverability and a reply detector hands warm leads to
you by iMessage.

It is built for the **heynox / RPLY** download campaign but the campaign copy is
swappable. Cold mail carries **no link** but the unsubscribe footer; the actual
RPLY download link is sent **only after a lead replies**.

---

## What it is (and the 100-domain model)

Cold-email deliverability dies when one domain sends too much. So instead of one
domain blasting thousands, the engine spreads a modest daily volume across **~100
sending domains, each with one or more mailboxes**. Every mailbox:

1. Starts in **warmup** — it emails the *other* mailboxes in the fleet (peer-to-
   peer) for ~14 days, building a real two-way conversation history, opening and
   replying to that mail, and rescuing any of it from spam folders.
2. Graduates to **active** at `warmup_day >= 14`, then ramps its cold cap on a
   curve: 20/day → 30 → 40 → 50 (hard cap 50). It never exceeds that.
3. Sends on a human cadence (≈90s ±45% jitter between sends) inside a
   recipient-friendly window (Mon–Fri, 8am–5pm in the configured timezone).
4. Is watched by reputation circuit-breakers: a mailbox that bounces > 5% or gets
   > 0.1% complaints is paused automatically (optionally the whole domain).

100 warmed domains × ~50/day = up to ~5,000 high-quality, inbox-placed cold
emails/day — without torching any single sender's reputation.

Everything lives in one SQLite database (`data/inbox-engine.db`) so the
scheduler, warmup, rotator, and safety daemons share atomic state.

---

## Setup

### 1. Install

```bash
npm install
npx playwright install chromium   # only needed for `inbox source` (Google Maps)
```

### 2. Configure `.env`

Copy `.env.example` to `.env` and fill it in:

```bash
cp .env.example .env
```

| Var | Purpose |
| --- | --- |
| `SENDER_ORG`, `SENDER_NAME` | Identity in the CAN-SPAM footer |
| `PHYSICAL_ADDRESS` | **Required by CAN-SPAM** — a real mailing address (use a PMB/office, never a home address) |
| `UNSUB_BASE_URL` | Public base URL of the unsubscribe endpoint (point it at the dashboard, e.g. `https://u.heynox.com`) |
| `UNSUB_SECRET` | HMAC secret for unsubscribe tokens — set it so links stay valid across restarts |
| `ANTHROPIC_API_KEY` | Optional. If set, the crafter lightly personalizes the opening line; otherwise templates are used verbatim |
| `SEED_INBOXES_JSON` | JSON array of seed mailboxes for inbox-placement testing (see `inboxPlacement.js`) |
| `DB_PATH` | SQLite path (default `./data/inbox-engine.db`) |

### 3. Sanity check

```bash
node bin/cli.js doctor
```

Verifies env, the database schema, required/optional dependencies, and that the
orchestrator wiring loads cleanly.

### 4. Add domains + mailboxes

Generate the DNS records for each sending domain and add them at your registrar:

```bash
node bin/cli.js dns --domain mail12.example.com --provider custom
# add the printed SPF / DKIM / DMARC records, then verify them live:
node bin/cli.js dns --domain mail12.example.com --check
```

A domain is only safe to send from once `--check` reports `spf/dkim/dmarc/ok:
true`. Register each mailbox (flag-driven, no prompts):

```bash
node bin/cli.js addmailbox \
  --email john@mail12.example.com \
  --smtp-host smtp.example.com --smtp-port 587 --smtp-pass 'app-password' \
  --imap-host imap.example.com --imap-port 993 \
  --display-name "John from Nox" --status warming --warmup-day 0
```

IMAP credentials are needed for warmup reads and reply detection — add them.

### 5. Warm up for ~14 days

Run a warmup cycle (peer-to-peer send/read/reply/rescue) and advance the day:

```bash
node bin/cli.js warmup --cycle --advance     # run once per day during warmup
node bin/cli.js warmup --status              # see each mailbox's warmup day + cap
```

During a normal `--forever` run the orchestrator does this automatically on a
schedule (a warmup cycle every few hours; day-advance once per local day, which
promotes mailboxes to `active` at day 14). Mailboxes with `cap 0` are warmup-only
and will never send cold.

### 6. Test placement (optional but recommended)

With `SEED_INBOXES_JSON` configured:

```bash
node bin/cli.js placement --mailbox john@mail12.example.com
```

### 7. Source, verify, seed, and send

```bash
node bin/cli.js source --query "med spa" --location "Austin, TX" --max 100 --niche "med spa"
node bin/cli.js verify --limit 200
node bin/cli.js seed-campaign --name heynox-rply --enqueue-all
node bin/cli.js send --forever        # the scheduler loop
```

Start the read-only dashboard / unsubscribe server separately:

```bash
node dashboard/server.js              # http://localhost:7900
```

---

## CLI commands

| Command | What it does |
| --- | --- |
| `doctor` | Env + database + dependency + module-wiring sanity check |
| `source --query <q> [--location <l>] [--max <n>] [--niche <n>]` | Scrape Google Maps for leads (no sending), populate the `leads` table. Nationwide if location is blank |
| `verify [--limit <n>]` | Verify a batch of unverified leads (syntax/MX/disposable, optional SMTP probe); rescore quality |
| `warmup [--cycle] [--advance] [--status]` | Run a warmup cycle, advance warmup days, or print the warmup status table |
| `dns --domain <d> [--provider <p>] [--check] [--selector <s>]` | Generate SPF/DKIM/DMARC records, or verify them live with `--check` |
| `placement [--mailbox <id|email>]` | Run an inbox-placement seed test (needs `SEED_INBOXES_JSON`) |
| `send [--once] [--forever] [--interval <ms>]` | Run the orchestrator: one tick (default) or continuously |
| `run [--once] [--forever] [--interval <ms>]` | Alias for `send` |
| `status` | Print counts: leads by status, mailboxes, sends today, due now, replies, bounces, suppressed |
| `addmailbox --email --smtp-host --smtp-pass [...]` | Register a sending mailbox (and its domain). Flag-driven, no prompts |
| `seed-campaign [--name] [--template] [--enqueue-all]` | Create/update a campaign + its follow-up steps; optionally enqueue every verified, contactable lead |

npm script shortcuts also exist: `npm run doctor`, `npm run send`, `npm run dash`,
etc. (see `package.json`).

---

## What one tick does

`inbox send --once` (or each pass of `--forever`) runs, in order:

1. **Reset** daily send counters at local midnight.
2. **Verify** a batch of unverified leads (and rescore their quality).
3. **Send**: for each due lead — skip it unless it's contactable (`mayContact`)
   and its quality clears the floor; pick an eligible mailbox; craft the step's
   copy; send; record the send; advance the lead to its next step (or finish it).
   Hard bounces suppress the recipient and pause the lead; rate-limits back the
   tick off; transient errors leave the lead due to retry.
4. **Warmup** cycle (rate-limited — not every tick) + day advance once/day.
5. **Reply poll** (rate-limited) — pause replied leads and hand them to you.
6. **Safety** circuit-breakers — pause mailboxes breaching bounce/complaint rates.
7. **Hourly summary** by iMessage (sent / replies / bounces / active mailboxes).

---

## Safety & compliance guarantees

- **CAN-SPAM footer on every send** — real org name, real physical mailing
  address, and a working one-click unsubscribe link (the only link cold mail
  carries). RFC 8058 `List-Unsubscribe` / `List-Unsubscribe-Post` headers too.
- **Hard content gate** — every cold email is run through `lintCold` before it
  leaves: no price/money/`$`/`free`/discount language, no links except the
  unsubscribe link, no calendar/portfolio/website links, low punctuation. A
  violation **throws** — a non-compliant email never sends.
- **Suppression is permanent** — unsubscribes, hard bounces, and complaints are
  written to the `suppression` table and the lead is never contacted again. The
  sourcing and send paths both re-check suppression (defense in depth).
- **Reply = stop** — a detected reply pauses the lead's whole sequence; the bot
  goes silent on that thread and hands the warm lead to you by iMessage. It
  **never auto-replies**.
- **Warmup is internal** — warmup traffic only ever flows between *our own*
  mailboxes (gated on an `X-Warmup` tag), so it carries no third-party exposure.
- **Reputation breakers** — mailboxes are paused automatically when bounce rate
  > 5% or complaint rate > 0.1%; optionally the whole domain is paused on a burn.
- **Auth required** — a domain should only go live after SPF + DKIM + DMARC all
  verify (`dns --check`).

---

## The heynox / RPLY campaign flow

RPLY is "one inbox for all your messages" — a Mac app that unifies iMessage,
WhatsApp, Slack, email and more, with AI-drafted replies. The cold sequence
(`src/templates/heynox-rply.js`) is **three touches**:

- **Step 0 (cold):** curiosity + a single soft question ("how many apps do you
  bounce between?"). Ends with *"reply 'yes' and I'll send you the link."*
- **Step 1 (+3 days, no reply):** a short bump with the one-line value prop.
- **Step 2 (+5 days, no reply):** a final, low-pressure note, then it stops.

**No cold step contains a link.** When a lead replies, the sequence pauses and
you get pinged — you (or the optional `AUTO_REPLY_LINK=1` path) send the
`replyTemplates.sendLink` message, which is the *one* place the
`https://heynox.com/download` link is allowed, because they asked for it.

To swap campaigns, point a new template pack at `seed-campaign --template <key>`
and import it where the orchestrator imports `templatePack`.

---

## Dashboard

`node dashboard/server.js` serves (default port **7900**, override with
`DASHBOARD_PORT`):

- `GET /` — auto-refreshing read-only HTML status (fleet, today's sends, replies).
- `GET /api/status` — the same data as JSON.
- `GET /u/:token` and `POST /u/:token` — the live one-click unsubscribe endpoint
  that `UNSUB_BASE_URL` should point at.

The server is strictly read-only except for processing unsubscribes (the legally
required action).

---

## Layout

```
config/default.js              tuning: ramp, caps, window, quality, follow-ups, safety
src/db/                        SQLite handle + schema
src/lib/                       log, util (spintax/jitter/message-id), cc-text bridge
src/infra/                     domains + mailboxes CRUD, sender rotator, DNS auth
src/sourcing/                  Google Maps scraper, web crawler, email guesser, CSV import
src/verify/                    email verification + quality scoring
src/warmup/                    peer-to-peer mailbox warmup engine
src/deliverability/            content linter + inbox-placement testing
src/send/                      transport pool, mailer (sendCold), bounce classification
src/reply/                     reply detection + hand-off
src/campaign/                  compliance, crafter, sequences, orchestrator   ← glue
src/templates/heynox-rply.js   the RPLY cold sequence + reply link template
bin/cli.js                     operator CLI
dashboard/server.js            read-only status + unsubscribe endpoint
```
