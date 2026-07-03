# Night Shift

A login ritual. Boot the Mac and it plays a fullscreen sci-fi startup animation, then throws open six terminal windows already running Claude — so the machine wakes up ready to work, not to a bare desktop.

## How it works

`launch.sh` fires as a macOS Login Item: it picks a random fullscreen boot animation (Arc Reactor HUD, Vaporwave, Matrix rain, or Hyperspace warp — each a self-contained HTML/Canvas file), opens it in Chrome, waits six seconds for the sequence to finish, then runs an AppleScript that lays out six iTerm2 windows in a 3×2 grid, each running `claude`. Every run logs to `last-run.log` for debugging the Login Item.

## Stack

Bash, AppleScript, vanilla HTML/Canvas, iTerm2, macOS Login Items

## Status

Working — the actual boot sequence on the machine.
