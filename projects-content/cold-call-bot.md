# Cold Call Bot

A Claude agent that finds 5-star local businesses with no website, then writes their phone numbers into a Google Doc as a checkbox checklist — a fresh call list per run, titled and dated.

## How it works

Run it with a query like "restaurants in Santa Barbara CA" and a count. The agent searches, filters hard — 5.0★ (or 4.9+ with volume), 25+ reviews, no website on Yelp/Google, has a phone, single-location family-owned — and saves each lead through a validated tool call. Output lands in Google Docs via OAuth (Docs + Drive APIs). The system prompt and thresholds live in `src/agent.ts`.

## Stack

TypeScript, Claude API, Google Docs/Drive APIs.

## Status

Working.
