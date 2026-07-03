# HopperLeads · heynox edition

The **Hopper Leads** desktop app (built from `~/Lead-Agent/desktop`) repurposed as a
side project for the **heynox.com / RPLY download campaign**.

Instead of homeowner leads, it streams **116 scored RPLY prospects** — the ranked
micro-influencers from `rply-console/influencer-finder` — each routed through one of
the **22 heynox landing domains** (`nox-domains.txt`). Highest-fit prospects surface
first; new ones drip in live so the bunny fires a native "new prospect" notification.

Everything is local and **$0** — no Stripe, free-mode claims that "reveal" each
prospect's contact path + assigned heynox domain.

## Run
```
./start.sh          # starts backend on :7702 + opens the app
```
App Settings are pre-pointed at `http://localhost:7702`, key `demo` (also `heynox`/`rply`).

## Pieces
- `server.cjs` — local marketplace backend speaking the exact API the app polls.
- `data/influencers.json` — 116 scored prospects (copied from influencer-finder).
- `data/nox-domains.txt` — 22 heynox domains.
- `data/state.json` — claimed/credits state (auto-written).

The installed app at `/Applications/Hopper Leads.app` has a lightly patched bundle
(RPLY wording + default `api_base` → :7702). Port 7702 because :7700 is FACE-FX.
