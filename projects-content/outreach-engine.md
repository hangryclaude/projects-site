# Outreach Engine

The productized version of the cold-email pipeline that already runs 24/7 for one business (Lead Agent). Pick a business, point it at domains you own, and it sources leads, writes emails with local AI at $0, warms and sends on a monitored ramp, and forwards every interested reply to a human. This repo is the full spec: architecture, every module, the control panel, and a build roadmap — written reuse-first so the working parts get extracted, not rebuilt.

## How it works

Seven stages per business: onboard domains → source leads → write (local AI) → warm + send → land in inbox → hand off replies → learn. The organizing idea is one line: inbox placement = identity (real, authenticated senders) + wanted-ness (engagement + reputation). Everything serves those two, and the hard rules enforce it — real sender identities only, no fabricated personas.

The operator drives it from a Next.js control panel mounted on the existing Express backend behind a tunnel, not Vercel — the DB is a local single-writer SQLite file the daemons hold, so the app lives on the same origin with one auth cookie. Thirteen module docs cover domain onboarding through monitoring, plus nine screen specs and a 149-task roadmap.

## Stack

Markdown spec; targets Node, Express, SQLite, Next.js, local AI via `~/Tools/lib/ai.cjs`.

## Status

Spec + roadmap complete; the single-business version it generalizes (Lead Agent) is live.
