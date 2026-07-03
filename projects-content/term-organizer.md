# Term Organizer

Inventory, sort, and tile every open Terminal.app window without touching the mouse. For when you've got twenty terminals open, half of them dead idle shells, and no idea which is which.

## How it works

It walks every Terminal window via AppleScript, reads each one's title and running process, and classifies real work from dead idle shells. Four commands: list windows grouped by category, tile the active ones in a grid on the ultrawide, sweep idle shells onto the laptop screen, or close idle empties in bulk (with a prompt). Monitor coordinates are hardcoded for a 3440×1440 + retina setup — edit `MONITORS` if yours differs. No network, no API keys.

## Stack

Python 3, AppleScript (osascript), macOS Terminal.app

## Status

Working CLI, tuned to my dual-monitor layout.
