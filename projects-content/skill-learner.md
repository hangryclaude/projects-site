# skill-learner

Watches Claude Code sessions and turns corrections into lasting memory, so the same mistake doesn't get made twice.

## How it works

`scan.sh` runs as a background pass over recent Claude Code transcript files (`.jsonl`), hands them to a free AI agent that hunts for user corrections, friction signals, and confirmed non-obvious approaches, then writes `feedback_*.md` memory files into the Claude memory directory for future sessions to load. State persists in a `.last_run` marker; designed to run hourly from cron.

## Stack

zsh, Claude Code JSONL transcripts, free AI chain (ai.cjs) — $0

## Status

Working.
