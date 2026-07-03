# SendLab — your own Resend, in a box

Send millions of emails through whichever provider is cheapest, for pennies.
A friendly app (SendLab.app) on top of a multi-provider sending engine.

## Run it
```bash
# the app auto-starts the engine, but to run it manually:
cd ~/Tools/sendlab-engine
node server.cjs            # API on http://localhost:7799
node verify.cjs           # full end-to-end test (17 checks)
```
Or just double-click **~/Applications/SendLab.app** — it boots the engine itself.

## The app (SendLab.app) — tabs
- **📊 Dashboard** — live sent / delivered / opened / clicked / bounced
- **💥 Blast** — mass send, one button. Pick a number or upload a CSV. Instant blast OR safe warm-up ramp.
- **✉️ Send** — single email, with templates + open/click tracking
- **⚙️ Setup** — connect a provider (one paste → real sending), add domains (auto SPF/DKIM/DMARC), mint API keys, suppression list
- **🌳 Breakdown · 📡 Providers · 🚀 Scale** — planners

## The engine (HTTP API, Resend-style)
| Method | Route | Does |
|---|---|---|
| POST | `/emails` | send one `{from,to,subject,html}` |
| POST | `/emails/batch` | send to `{to:[...]}` |
| POST | `/blast` | mass send `{count|to[], concurrency}` → jobId |
| GET | `/blast/:id` | blast progress |
| POST | `/campaign` | warm-up ramp `{startPerDay, doubleEvery, dayMs}` |
| GET | `/campaign/:id` | ramp progress |
| POST | `/provider-key` | connect a provider live `{provider, key, ...}` |
| POST | `/domains` | add domain → returns DNS records |
| POST | `/keys` | mint an API key |
| POST | `/webhooks/bounce` | bounce/complaint → suppress |
| GET | `/stats` `/emails` `/domains` `/keys` `/suppress` | reads |
| GET | `/t/o/:id` `/t/c/:id` | open pixel / click redirect |

## How it routes
`router.cjs` ranks every **configured** provider by cost for your volume and picks the cheapest,
with **failover** + a **circuit breaker** (a dead provider is skipped after 5 fails for 30s, so it
never tanks throughput). Add a key in Setup and it goes live instantly.

## Providers
Adapters in `providers/`: `dryrun` (free, simulates — default), `elasticemail` (REST, cheapest $0.09/1k),
`mailgun` (REST), `smtp` (any SMTP host via nodemailer). Add more by dropping a `{id, configured(), send()}` module in.

## Files
`index.cjs` send()/breaker · `router.cjs` cheapest-pick · `blast.cjs` mass send · `campaign.cjs` warm-up ·
`store.cjs` JSON persistence (~/.sendlab/data.json) · `config.cjs` provider keys (~/.sendlab/providers.json) ·
`tracking.cjs` open/click · `prices.cjs` provider table · `server.cjs` HTTP API · `verify.cjs` tests.

## To send REAL mail (vs dryrun)
1. Get a provider key (Elastic Email free tier = 3k/mo) → paste in Setup
2. Add + verify a domain (paste the 3 DNS records)
3. Send. Costs ~$0.10 per 1,000 to the provider, $0 to anyone else.

Reputation/warm-up still applies — use the 🐢 warm-up mode for cold senders.

## Performance
1,000,000 sends through the engine in ~1s (dryrun) at ~1M/sec — real-world rate is provider/network-bound.
