# startup-claude
*Boot animation + 6-window Claude workspace, triggered on login.*

## What it does

`launch.sh` fires on macOS login: it picks a random fullscreen boot animation (Arc Reactor, Vaporwave, Matrix rain, or Hyperspace warp), opens it in Chrome at full screen, waits 6 seconds for the sequence to finish, then calls an AppleScript (`spawn-claude.applescript`) to open 6 iTerm2 windows arranged in a 3×2 grid — each running `claude`. Logs each run to `last-run.log` in the project directory for debugging Login Item runs.

## Run

```bash
# Standard — picks a random animation
./launch.sh

# Force a specific animation
ANIM_FILE=anim-arc.html ./launch.sh
```

Add `launch.sh` as a macOS Login Item to run automatically on startup.

## Animations

| File | Theme |
|------|-------|
| `anim-arc.html` | Arc Reactor HUD (blue/cyan) |
| `anim-vapor.html` | Vaporwave sunset |
| `anim-matrix.html` | Matrix rain / JARVIS boot |
| `anim-hyperspace.html` | Hyperspace warp |

All animations are self-contained HTML/Canvas — no dependencies.

## Stack

Bash · AppleScript · vanilla HTML/Canvas/CSS · iTerm2 · macOS Login Items
