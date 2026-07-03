# skill-learner

Watches your Claude Code sessions and turns corrections into lasting memory.

## What it does

`scan.sh` runs as a background pass over recent Claude Code transcript files (`.jsonl`) modified since the last run. It passes the transcripts to an AI agent that reads them for user corrections, friction signals, and confirmed non-obvious approaches, then writes or updates `feedback_*.md` memory files in your Claude memory directory — so future sessions don't repeat the same mistakes.

## Run

```zsh
# One-off scan (covers transcripts from the last 2h, or since the last run)
~/Tools/skill-learner/scan.sh

# Schedule it as a cron job to run automatically (e.g. every hour):
# 0 * * * * ~/Tools/skill-learner/scan.sh
```

State is persisted in `~/Tools/skill-learner/.last_run`; the log lives at `~/Tools/skill-learner/log.txt`.

## Stack

zsh · Claude Code JSONL transcripts · free AI chain (`~/Tools/lib/ai.cjs`) — $0, no paid API calls
