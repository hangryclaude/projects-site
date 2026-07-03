# Lead Agent — AngusSites

Autonomous cold-email engine for **AngusSites** (single brand, apex `angussites.co`). Goal: **100,000 emails/day across one Workspace + 10 Mailgun subdomains** (mail1.angussites.co … mail10.angussites.co), 10-day ramp, full reply → calendar → Zoom → invoice automation, agent-tree dashboard.

Runs on the Mac mini at `~/Lead-Agent/`. Dashboard at `http://localhost:7700`. Public site at `~/Lead-Agent/website/` (served via `/home`).

**Setup plan:** see `docs/SETUP_ANGUSSITES.md` for the consolidated single-domain setup.

## Agent tree (matches the whiteboard)

```
Overview Agent
├── Lead Agent           — finds leads, drafts emails, schedules sends
│   ├── Lead Finder      — Google Maps + Anthropic, no-website small biz
│   ├── Email Crafter    — Haiku, <120 words, token-minimized
│   ├── Validator        — Mailgun + ZeroBounce, no-bounce gate
│   ├── Postman          — sends through ramp-aware Mailgun pool
│   ├── Reply Handler    — IMAP watcher → classifier → calendar/zoom/invoice
│   └── Phone Agent      — 100 cold calls/day (later)
├── SEO Agent            — inbound landing page, 3-5 keywords
│   └── All-Steps        — SEO checklist runner
│       └── Google Account agent
├── Sample Website       — generates per-lead preview site
│   └── Mailgun (per-domain delivery infra)
│       └── Cost Agent   — $/email + token tracking
└── Website              — the public site users land on
```

## Day 1 — Foundation
- [x] Repo skeleton
- [x] .env + accounts.json template
- [ ] Agent registry + dashboard (in progress)
- [ ] setup-domain.js (Cloudflare DNS push + Mailgun verify + test send)
- [ ] First domain end-to-end live

## 10-day plan
1. Foundation (this doc) + 1 domain proven
2. Lead DB + 9 remaining domains
3. Email Crafter + ramp scheduler
4. Accounts 1-3 live at 50/day
5. All 10 live; reply detection
6. Reply → calendar → Zoom → invoice
7. Agent Amount dashboard polish
8. Scale to 20K/day
9. Scale to 50K/day
10. Hit 100K/day, audit

## Local commands
```bash
npm run dash         # start dashboard
npm run setup 1      # setup-domain.js for slot 1
npm run setup-all    # all unconfigured slots
```
