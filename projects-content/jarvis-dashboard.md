# Jarvis Dashboard

Seventeen tabs, a scrolling ticker tape, a pulsing brain-eye in the corner, and a $100k scoreboard. A full mission-control for one operator: chat, planning, content generation, lead kanban, cron jobs, git activity, system telemetry, and a webcam tab that runs Claude Vision on what it sees.

## How it works

Next.js on port 5070 with a matrix-rain boot sequence and a SQLite-persisted brain. The command bar routes slash-prefixed modes (`/idea`, `/research`, `/debate`, `/operate`) to different API routes: an operator brain with tools (run_agent, stop_agent, exec, web_search), a multi-turn chat on Sonnet, and an idea decomposer where an Opus planner fans out to 3–7 parallel Sonnet workers. PIPELINES auto-discovers projects in `~/Tools` and `~/Web-Projects` and can launch or kill them. Events stream to a terminal-styled SSE feed; a mic button auto-submits voice, a speak toggle narrates events aloud. PLAN and JOURNAL write straight into Obsidian.

## Stack

TypeScript, Next.js 15, React 19, Tailwind 4, better-sqlite3, Anthropic SDK, Motion

## Status

Working, 12 commits in, boots on demand — nothing runs in the background eating battery.
