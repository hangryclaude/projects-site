# Lead Agent

An autonomous cold-email operation for AngusSites, sketched on a whiteboard as a tree of agents and then built to match. Target: 100,000 emails/day across one Google Workspace plus 10 Mailgun subdomains (mail1 through mail10.angussites.co), ramped over 10 days.

## How it works

The whole thing is an agent hierarchy under one Overview Agent. Lead Finder scrapes Google Maps for small businesses without websites; Email Crafter writes sub-120-word emails on Haiku, token-minimized; a Validator gates everything through Mailgun and ZeroBounce so nothing bounces; Postman sends through a ramp-aware Mailgun pool. The back half is the interesting part: an IMAP Reply Handler watches inboxes, classifies replies, and routes hot ones straight into calendar → Zoom → invoice, so a reply becomes a booked call without a human touching it. A Cost Agent tracks $/email and token spend the whole way.

Runs on the Mac mini with a dashboard at localhost:7700 showing the live agent tree.

## Stack

Node.js, Mailgun, Google Workspace, Cloudflare DNS, ZeroBounce, Anthropic Haiku, IMAP

## Status

Parked mid-build — foundation and domain setup done, the 10-day ramp plan never got its 10 days. Its ideas got rebuilt properly in inbox-engine and leadkit.
