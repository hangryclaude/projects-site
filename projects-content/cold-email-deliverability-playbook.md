# Cold Email Deliverability Playbook

Most cold email fails for one reason: it goes to spam and nobody ever sees it. This is the written-down system for not doing that — distilled from actually running a production cold-outreach engine across dozens of domains, and vendor-neutral so it works for any company.

## How it works

Eight chapters covering the whole discipline: the mental model of why mail lands in spam, domains and DNS authentication (SPF/DKIM/DMARC with alignment done right, not just "a passing record"), infrastructure, warmup, list hygiene, copy that inboxes, volume math, and monitoring. It opens with a 60-second version: never send cold from your main domain, warm every inbox 2–3 weeks, keep complaints under 0.3%, write plain text with one ask and at most one link.

The core insight is the scale math everyone gets wrong: a warmed Google Workspace mailbox safely sends ~20–40 cold emails a day, period. You don't send more per inbox — you add inboxes. The playbook works the tables out to 10,000/day with costs and timelines, and reduces the whole game to one line: inbox placement = identity (authentication) + wanted-ness (engagement and reputation).

## Stack

Markdown. It's a playbook — the whole point is that it's not software.

## Status

Complete and current for 2025–2026 rules.
