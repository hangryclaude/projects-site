# DeepWorkScore

A productivity tracker that scores each day 0–100 and uses AI to explain why. The wedge: RescueTime-style trackers only count app time, and Claude-token leaderboards only count volume. DeepWorkScore blends real work activity with the *quality* of your AI prompting — so prompting well beats looking busy while doom-scrolling.

## How it works

Four pieces. `collector.py` is a background daemon (launchd plist included) that logs the frontmost macOS app every 5 seconds via NSWorkspace — no permissions needed — auto-classifies each app with a free AI call, and detects idle. `claude_scorer.py` parses your `~/.claude/projects/**/*.jsonl` transcripts and scores prompt quality 0–100, rewarding specific, iterative prompting over raw volume. `score.py` blends it all: `50·work + 25·prompt_quality + 15·focus − 30·distraction`, each normalized, weights stored in a settings table. A local dashboard on :7788 shows the score dial, day timeline, top apps, and trends, and `card.py` renders a shareable PNG score card per day for posting.

All AI calls route through a free-first LLM chain — $0 to run. Roadmap: hosted backend with a public X leaderboard; anti-cheat leans on prompt quality being hard to fake.

## Stack

Python, SQLite, Flask-style local dashboard, NSWorkspace via PyObjC, launchd, free LLM chain

## Status

Working locally — collector, scorer, dashboard, and cards all functional; hosted version unbuilt.
