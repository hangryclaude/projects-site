# 📬 Cold Email at Scale — The Deliverability Playbook

**How to send thousands of cold emails a day and actually land in the inbox — for any company.**

Most cold email fails for one reason: it goes to spam, so nobody ever sees it. This playbook is the complete, current (2025–2026) system for *not* doing that — distilled from running a production cold-outreach engine that sends across dozens of domains and inboxes with monitored deliverability.

It's vendor-neutral. Use it to set up outreach for your own company, a client, or a side project.

---

## ⚡ The 60-second version

If you do nothing else, do these, in this order:

1. **Never send cold email from your main domain.** Buy separate lookalike domains (`get-yourco.com`, `try-yourco.com`). A bad campaign can permanently poison your real domain's email.
2. **Authenticate every domain: SPF + DKIM + DMARC** (and get *alignment* right, not just "a passing record"). This is the entry ticket as of 2024 — no auth, no inbox.
3. **Warm up every inbox for 2–3 weeks** before real sending. Start ~10–20/day, ramp slowly. New domains have zero trust.
4. **Verify your list** and **suppress every bounce/complaint/unsubscribe.** Keep bounces under ~2% and spam complaints under **0.3%** (a hard cap now) — ideally under 0.1%.
5. **Spread volume across many inboxes.** A warmed Google Workspace mailbox safely sends only ~20–50 cold emails/day. To send more, you add *mailboxes*, not volume-per-mailbox.
6. **Write like a human.** Plain text, short, one ask, zero or one link, no images, no `$`/"free"/urgency words. Aim for a **reply**, not a click.
7. **Monitor relentlessly.** Google Postmaster Tools + seed tests. Auto-pause any domain whose complaints spike or bounces climb.

> **The core truth:** Inbox placement = **identity** (authentication) + **wanted-ness** (engagement + reputation). Everything in here serves those two ideas.

---

## 🧮 The scale math (the part everyone gets wrong)

You don't "send more from one inbox." You **add inboxes**.

```
emails/day = (safe per-mailbox/day) × (mailboxes)
```

A warmed Google Workspace mailbox ≈ **20–40 cold/day**. So:

| Target/day | Mailboxes needed (~30/day each) | Domains (~3 inboxes/domain) | Rough setup |
|---|---|---|---|
| 300 | ~10 | ~3–4 | small |
| 1,000 | ~33 | ~10–12 | medium |
| 10,000 | ~330 | ~100+ | infra-heavy (or use SES/ESP) |

Full worked examples (cost + timeline) → **[docs/06-volume-pacing.md](docs/06-volume-pacing.md)**.

---

## 📚 The playbook

1. [The Mental Model — Why Email Lands in Spam](docs/00-overview.md)
2. [Domains & DNS Authentication](docs/01-domains-dns.md)
3. [Sending Infrastructure & Inboxes](docs/02-infrastructure.md)
4. [Inbox Warmup](docs/03-warmup.md)
5. [List Hygiene & Verification](docs/04-list-hygiene.md)
6. [Content & Copy That Inboxes](docs/05-content-copy.md)
7. [Volume, Pacing & The Math to Scale](docs/06-volume-pacing.md)
8. [Monitoring, Testing & Feedback Loops](docs/07-monitoring.md)

👉 **[Pre-launch + ongoing CHECKLIST](CHECKLIST.md)** — run through this before you send a single email.

---

## ❌ The fastest ways to get blocked (avoid these)

- Sending cold from your primary brand domain
- Blasting volume from a brand-new, un-warmed domain
- Emailing a scraped/bought list (spam traps → Spamhaus → blocked everywhere)
- Missing or misaligned DMARC
- Spam complaint rate over 0.3%
- All links + images + "FREE!!!" copy
- No `List-Unsubscribe` header / no physical address (CAN-SPAM)

---

## ⚖️ Use responsibly

Cold email is legal in the US under **CAN-SPAM** (and has stricter rules elsewhere — GDPR/PECR in the EU/UK, CASL in Canada). Always: send only B2B/relevant offers, include a real physical address, honor unsubscribes immediately, and never use deception. This playbook is about *deliverability*, not evading anti-spam law — staying compliant is also what keeps you in the inbox.

---

*Distilled from a production outreach system. Contributions/corrections welcome.*
