# rply-console

The war room for the RPLY download campaign: one repo holding the influencer pipeline, the cold-email sending engine, and the runbooks that tie them together.

## How it works
Three main pieces. `influencer-finder/` scores and ranks micro-influencer prospects from seed lists (`find.cjs`), then generates outreach (`outreach.cjs`) — its output is the 116-prospect list that hopperleads-heynox streams. `mailpool/` is a portable cold-email engine: bulk Cloudflare zone setup, account provisioning, Resend sending, suppression logs, and lane-health checks, built on a burn-and-replace domain model so one torched apex doesn't sink the rest. Around them: a campaign console dashboard (`index.html`) and battle docs — RUNBOOK, MASS_SCALE_PLAN, BUY-LIST, COMPETITOR-PLAYBOOK. Everything dry-runs before it sends.

## Stack
Node.js, Cloudflare API, Resend, vanilla HTML dashboard

## Status
Built and preflight-checked; go-live was blocked on a Resend key and domain purchases.
