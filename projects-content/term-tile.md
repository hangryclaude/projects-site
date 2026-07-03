# term-tile

Open enough terminal windows and your screen becomes an archaeology dig. term-tile arranges every iTerm and Terminal.app window into a non-overlapping grid on your main display with one command.

## How it works

`tile.py` queries all open iTerm2/iTerm/Terminal windows via macOS Accessibility (through System Events), computes a square-ish grid sized to the main display, and repositions each window with AX APIs. One battle scar: Terminal.app's AppleScript dictionary silently fails resizes sometimes, so it doubles the position-set call to work around it. `watch.py` adds a polling loop that re-tiles automatically whenever the window count changes — open a new terminal, the grid reflows.

Python 3 stdlib only — `subprocess` shelling out to `osascript`. No dependencies to install, nothing to configure. The only setup is granting Accessibility permission to whichever terminal runs the script.

## Stack

Python 3 stdlib, osascript/AppleScript, macOS Accessibility

## Status

Working — one-shot `python3 tile.py` or watch mode.
