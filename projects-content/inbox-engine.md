# Inbox Engine

Cold email dies when one domain sends too much. Inbox Engine's answer: don't have one domain, have a hundred. It sources leads, verifies them, warms a fleet of mailboxes for two weeks, then sends CAN-SPAM-compliant cold email across ~100 domains — up to ~5,000 inbox-placed emails a day without torching any single sender's reputation.

## How it works

Every mailbox starts in warmup: it emails the other mailboxes in the fleet peer-to-peer for ~14 days, building real two-way conversation history and rescuing its own mail from spam folders. At day 14 it graduates and ramps on a curve — 20/day to a hard cap of 50 — sending on a human cadence (~90s between sends, ±45% jitter, Mon–Fri business hours). Reputation circuit-breakers pause any mailbox that bounces over 5% or gets over 0.1% complaints.

The clever part is the discipline: cold mail carries no link except the unsubscribe footer. The actual product link goes out only after a lead replies, and a reply detector hands warm leads over by iMessage. Scheduler, warmup, rotator, and safety daemons all share one SQLite database for atomic state.

## Stack

Node.js, SQLite, Playwright (Google Maps lead sourcing), Anthropic API (optional line personalization), HMAC-tokened unsubscribe endpoint

## Status

Working — built for the heynox/RPLY download campaign, campaign copy swappable.
