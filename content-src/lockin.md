# Lockin

Personal project command center. Persistent across laptop sleeps. Holds every project, every conversation, every terminal.

## Run

```bash
./start.sh
```

Open http://localhost:7878

- Web app on **7878**
- PTY websocket server on **7879**
- All state in `./data/lockin.db`

## What it does

- Lists every project from your memory index
- Each project has a forever-saved Claude conversation (Opus 4.7 + prompt caching)
- Each project has live embedded terminals (real zsh, cwd'd to the project)
- Sub-agent runner: spawn background tasks, watch them run
- Closes your laptop, opens it next morning, picks up exactly where you left off
