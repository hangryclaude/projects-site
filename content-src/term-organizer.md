# term-organizer
Inventory, classify, and tile macOS Terminal.app windows without touching the mouse.

## What it does

Walks every open Terminal window, reads its title and running process, and sorts real work from dead idle shells. Four commands let you get a clean inventory, lay active windows in a grid on your ultrawide, sweep idle shells onto the laptop screen, or close them in bulk. Works entirely via AppleScript — no network, no API keys.

Designed for a dual-monitor setup (3440×1440 ultrawide + built-in retina). Monitor coordinates are hardcoded near the top of `organize.py`; edit `MONITORS` if your display layout differs.

## Run

```bash
python3 organize.py               # list windows grouped by category (default)
python3 organize.py list
python3 organize.py tile          # grid active windows on ultrawide, dead shells on laptop
python3 organize.py collect       # move idle shells to laptop, leave everything else
python3 organize.py close-idle    # close idle empty shells (prompts first)
python3 organize.py close-idle --yes   # skip the prompt
```

**Flags**
```
--monitor ultrawide|laptop   Target display for active windows (default: ultrawide)
--gap N                      Pixel gap between tiles (default: 8)
--yes                        Skip confirmation on close-idle
```

## Stack

Python 3 · AppleScript (via `osascript`) · macOS Terminal.app only · no dependencies, no paid API.
