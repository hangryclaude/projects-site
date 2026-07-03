# HopperLeads: heynox edition

The Hopper Leads desktop app (originally built for homeowner leads) rebadged for the RPLY campaign. Instead of roofing prospects it streams 116 scored micro-influencers — the ranked output of rply-console's influencer-finder — each pre-routed through one of the 22 heynox landing domains.

## How it works
`server.cjs` is a local backend on :7702 speaking the exact marketplace API the desktop app already polls, so the app didn't need rewriting — just a lightly patched bundle (RPLY wording, new api_base). Highest-fit prospects surface first; new ones drip in live so the app's bunny mascot fires a native "new prospect" notification. Free-mode "reveals" each prospect's contact path and assigned domain. All local, $0, no Stripe.

## Stack
Node.js, Electron desktop app (patched), JSON data files

## Status
Working local demo of the influencer pipeline.
