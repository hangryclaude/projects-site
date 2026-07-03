# nox-redirect

A tiny 302 with a memory. Attribution redirect service for the NOX campaign: verify the token in the link, log the click, then bounce the visitor to the real download.

## How it works
A Vercel serverless function checks each unique token, writes a click event for analytics, and issues a fast 302 to the destination. Vercel rewrites keep the URLs clean. That's the whole service — which is the point.

## Stack
Node.js, Vercel Functions

## Status
Working — campaign plumbing.
