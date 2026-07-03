# Lockin

Close the laptop mid-thought, open it the next morning, and every project, conversation, and terminal is exactly where you left it. Lockin is a personal command center built because ephemeral chat windows and dead terminals were losing state every night.

## How it works

A web app on port 7878 backed by a single SQLite file. It lists every project from the memory index; each one gets a forever-saved Claude conversation (Opus with prompt caching, so the long history doesn't cost full price every turn) and live embedded terminals — real zsh sessions cwd'd to the project, streamed over a PTY websocket server on 7879. A sub-agent runner spawns background tasks you can watch run. All state persists across laptop sleeps because nothing lives in browser memory that matters.

## Stack

TypeScript, SQLite, PTY websockets, Anthropic API (Opus + prompt caching)

## Status

Working, local.
