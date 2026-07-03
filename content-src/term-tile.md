# term-tile
Arrange every iTerm and Terminal window into a non-overlapping grid on your main display.

## What it does

`tile.py` queries all open iTerm2/iTerm/Terminal windows via macOS Accessibility (System Events), computes a square-ish grid layout sized to the main display, and repositions each window using AX APIs. It doubles the position-set call to work around silent resize failures in Terminal.app's AppleScript dictionary. `watch.py` runs a polling loop that calls `tile()` automatically whenever the window count changes.

## Run

```sh
# One-shot tile
python3 tile.py

# Watch mode — re-tiles on window open/close
python3 watch.py
```

Requires macOS with Accessibility permissions granted to whichever terminal runs the script (System Preferences → Privacy & Security → Accessibility).

## Stack

Python 3 stdlib only — `subprocess` + `osascript`. No dependencies, no paid APIs.
