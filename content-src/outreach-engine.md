# 🚀 Outreach Engine

**Pick a business → point it at domains you own → it sources leads, writes the emails with local AI ($0), warms + sends on a monitored ramp, lands in the inbox, and forwards every interested reply to you.** Multi-business. Compliant. Built to scale.

Outreach Engine is the **productized, multi-business generalization** of a system that already runs this exact pipeline 24/7 for one business (the Lead Agent). This repo is the full breakdown — architecture, every module, the control-panel app, and the build roadmap — designed **reuse-first** so we extract what works rather than rebuild.

---

## The one-line model

> **Inbox placement = identity (real, authenticated senders) + wanted-ness (engagement + reputation).** Everything here serves those two. (Full deliverability theory: the companion *cold-email-deliverability-playbook*.)

## What it does, end to end

```
① Onboard domains  → ② Source leads → ③ Write (local AI, $0) → ④ Warm + send (ramp/pace)
        → ⑤ Land in inbox → ⑥ Reply → hand off to YOU (no bot back-and-forth) → ⑦ Learn → repeat
```

Every business runs this independently; the operator drives it from a control panel.

---

## 🧱 Architecture & modules (`docs/`)
1. [System Architecture & Data Flow](docs/00-architecture.md)
2. [Domain & Inbox Onboarding](docs/01-domain-onboarding.md)
3. [Sender Identities — real & compliant](docs/02-sender-identity.md)
4. [Lead Sourcing Engine](docs/03-lead-sourcing.md)
5. [AI Email Generation (local, $0)](docs/04-ai-email-gen.md)
6. [Warmup Engine](docs/05-warmup.md)
7. [Sending, Pacing & Rotation](docs/06-sending-pacing.md)
8. [Deliverability & Inbox Placement](docs/07-deliverability.md)
9. [Reply Handling & Operator Hand-off](docs/08-replies-handoff.md)
10. [Campaigns & Multi-Business](docs/09-campaigns-multitenant.md)
11. [Monitoring, Learning & Reporting](docs/10-monitoring-learning.md)
12. [The Control-Panel App](docs/11-the-app.md)
13. [Roadmap & Build Phases](docs/12-roadmap.md)

## 🎨 The App (`docs/app/`)
A Next.js control panel **mounted on the existing Express backend, behind the tunnel** (not Vercel — the DB is a local single-writer SQLite file the daemons hold). One origin, one auth cookie.

- [Stack & architecture decision](docs/app/app-00-stack.md) · [Design system](docs/app/app-01-design-system.md)
- Screens: [Onboard domains](docs/app/app-02-onboard-domains.md) · [Identities](docs/app/app-03-identities.md) · [Launch campaign](docs/app/app-04-launch-campaign.md) · [Leads](docs/app/app-05-leads.md) · [Deliverability](docs/app/app-06-deliverability.md) · [Replies](docs/app/app-07-replies.md) · [Analytics](docs/app/app-08-analytics.md) · [Settings/Multi-business](docs/app/app-09-settings.md)

## ✅ [ROADMAP.md](ROADMAP.md) — 149 concrete build tasks, grouped by module

---

## 🔒 Hard rules (compliance = deliverability)
- **Real sender identities only.** No fabricated personas, fake names, or AI face photos — that's a CAN-SPAM violation *and* the fastest way to get blocked. Every identity needs a verified domain + real postal address + working unsubscribe.
- **B2B targeting**, honest offers, one-click unsubscribe honored, complaint rate **< 0.3%**.
- **Hand-off on yes** — the moment a lead is interested, it goes to the human; the bot never negotiates.

## 🔁 Reuse-first
The Lead Agent already has: the supervisor + ~16 daemons, the SQLite schema, the 4-transport sender with spam-gate, the Ollama-first AI router ($0), 15+ free lead finders, warmup, reply handling + forwarder, domain-health auto-pause, and the win-learner. Outreach Engine adds a **`business_id` dimension**, an **onboarding front-door**, a formal **campaign object**, and the **app** on top. See each module's "Reuse from Lead Agent" section.

## ▶️ Where to start
Read [docs/12-roadmap.md](docs/12-roadmap.md) → it sequences "what exists today → reusable core → multi-business → onboarding → app → scale," with the real blockers (registrar API, mailbox provider, domain/inbox budget).

---
*Private. Distilled from a production system. Real identities, real compliance, real inboxing.*
