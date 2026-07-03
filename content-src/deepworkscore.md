# DeepWorkScore

A productivity tracker that silently watches how you work, scores each day **0–100**,
lets you **zoom back** through past days, and uses AI to explain **why** some days were
productive and others weren't.

**The wedge:** unlike RescueTime/Rize (app time only) and Viberank/CCgather (raw Claude
token counts), DeepWorkScore blends real work activity *with the **quality** of your AI
(Claude Code) prompting* — so actively prompting well beats looking busy while doom-scrolling.
Built X-native: every day produces a shareable score card to post and compete on.

Domain: **deepworkscore.com** (verify the @deepworkscore X handle before going public).
All AI runs through the free `~/Tools/lib/ai.cjs` chain — **$0**.

## Pieces
| File | What it does |
|---|---|
| `collector.py` | Background daemon. Logs the macOS frontmost app every 5s (NSWorkspace, no permissions), auto-classifies each app via free AI, detects idle. |
| `claude_scorer.py` | Parses `~/.claude/projects/**/*.jsonl`, scores your prompt **quality** 0–100 (specific/iterative beats volume). |
| `score.py` | Blends work + prompt quality + focus − distraction into the daily 0–100, writes the AI "why". |
| `app.py` | Local dashboard (http://localhost:7788): score dial, day timeline, top apps, trends. |
| `card.py` | Renders the shareable PNG score card → `data/cards/<day>.png`. |

## Run
```bash
# 1. start the collector (foreground test)
./venv/bin/python collector.py

# install as always-on daemon:
cp com.angus.deepworkscore.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.angus.deepworkscore.plist

# 2. score today + make the card (or schedule nightly.sh via cron)
./venv/bin/python score.py
./venv/bin/python card.py

# 3. dashboard
./start.sh    # → http://localhost:7788
```

## Scoring (v1)
`score = 50·work + 25·prompt_quality + 15·focus − 30·distraction` (each normalized 0–1).
Weights live in the `settings` table (defaults in `common.py`). App categories are AI-seeded
and overridable in the `categories` table.

## Roadmap (v2)
Hosted backend + accounts + public **X leaderboard** (compare scores, daily averages, friend
leagues). Anti-cheat leans on prompt-quality being hard to fake. Deploy on Vercel.
