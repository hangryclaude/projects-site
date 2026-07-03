# Jarvis

A personal assistant you reach the way you reach a person: call the number and it answers, text it and it texts back. No app, no browser tab — Claude on the other end of an actual phone line, with memory and tools.

## How it works

An Express server bridges Twilio and the Anthropic SDK. Each channel gets a model matched to its constraints: voice runs Haiku because Twilio's ~10s gather window punishes slow replies (responses forced to 1–2 spoken sentences, no markdown), while SMS gets Sonnet with a deeper tool budget — no realtime pressure, so it can reason, use vision, and run up to 10 tool calls per message. Conversations and threads persist in better-sqlite3, an Angus-specific memory file loads into context, and a tool layer plus scheduler/autopilot modules handle jobs that outlive a single exchange. There's an iMessage bridge, an SSE-backed web dashboard, and a smoke-test entry point. Every Anthropic call logs token counts to `~/.spend/usage.jsonl` so spend-guard's daily cap covers Jarvis too — the producer logs tokens, the guard owns the price table. Deploys to a Mac mini with a launchd plist and an ngrok tunnel for the Twilio webhooks.

## Stack

TypeScript, Express, Anthropic SDK, Twilio, better-sqlite3, Zod, ngrok, launchd

## Status

Working — runs on the Mac mini, reachable by call and SMS.
