# Angus Agent Maker

angusagentmaker.com — the business-facing sibling of Agent·SB. Dark single-page site (Claude coral, inline SVG burst logo) pitching custom Claude-powered agents to Santa Barbara businesses.

## How it works

Phone-number signup instead of a contact form: you drop your number, I text you, then build the agent. `api/signup.js` is a Vercel serverless function that stores numbers in Vercel Blob when a token is set, and just logs otherwise.

## Stack

HTML, CSS, vanilla JS, Vercel serverless, Vercel Blob

## Status

Built and deployable. Parked — same fate as Agent·SB.
