# habit-warden

*A self-accountability tool that tracks habits, enforces focus blocks, and plays David Goggins audio when you slack off.*

## What it does

habit-warden is a local macOS app with a Flask web dashboard and a menu bar companion. It lets you define daily habits and log completions against them, run timed focus sessions (including strict Pomodoro mode that levies a "shame fee" for unauthorized breaks), and block distracting apps and websites by rewriting `/etc/hosts`. When it detects a distraction it fires a motivational audio clip from a local Goggins library, falling back to macOS `say` TTS if no clips are present. Stats tracked include daily and weekly focus minutes, session counts, streak length, apps killed, and tabs closed.

## Run

```bash
# Web dashboard (http://127.0.0.1:4731)
./start.sh

# macOS menu bar companion (requires dashboard to be running)
./start_menubar.sh
```

One-time setup:
```bash
bash scripts/install_sudoers.sh   # allow hosts-file writes without a password prompt
python3 scripts/download_goggins.py  # optional: download audio clips
```

## Stack

Python · Flask · SQLite · rumps (menu bar) · psutil · vanilla JS · WebAudio API · macOS `afplay`/`say`
