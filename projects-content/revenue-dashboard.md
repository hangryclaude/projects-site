# Revenue Dashboard

One page that answers the only question that matters: is anything actually making money? Aggregates every revenue stream into a single live view.

## How it works

A dependency-free Node server (built-in `node:http` and the new `node:sqlite`) on port 7676. Manual streams live in a `revenue.json` file; the lead-agent numbers come straight from Lead-Agent's SQLite database, opened read-only — sends, replies, bookings, paid vs. open invoices, and cost log, joined into one summary with per-stream totals.

## Stack

Node.js (stdlib only), node:sqlite, vanilla JS frontend

## Status

Working local tool. Reads real data; the numbers are honest even when they're small.
