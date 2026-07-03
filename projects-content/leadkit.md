# LeadKit

An open-source, self-hosted cold-outreach engine: find leads, validate emails, write personalized outreach, send, and auto-handle replies. Bring your own API keys — or none, and it degrades gracefully to free/local mode. The itch: every hosted outreach tool wants $100/mo for a pipeline you can run on your own machine.

## How it works

~240 small Node agents cover the funnel: FIND → ENRICH → VALIDATE → SEND → REPLY → BOOK → INVOICE. Discovery pulls from 30+ sources — Google Maps, Yelp, Etsy, Shopify, GitHub, BBB, chambers of commerce, government permit and SOS data, OpenStreetMap. Enrichment fills in emails, phone, tech stack, and an ICP fit score.

The best part is the anti-bounce gate: four validator implementations run cheapest-first. Three are $0 (syntax, disposable-domain and role-account blocks, DNS MX, an SMTP RCPT TO probe that never sends DATA) and only then does it fall to ZeroBounce at ~$0.008 per check — so you almost never pay. Sending is ramp-aware through Resend or Mailgun with warmup and reputation monitoring; an IMAP watcher classifies replies and routes hot ones to calendar → Zoom → invoice. Local dashboard at localhost:7700 shows the agent tree.

## Stack

Node.js, Resend, Mailgun, ZeroBounce, IMAP, free-tier LLM routing

## Status

Working, self-hosted, open source.
