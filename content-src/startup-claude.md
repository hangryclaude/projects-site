# startup-claude

A login launcher that plays a fullscreen boot animation, then drops you straight
into work: **6 iTerm windows in a 3×2 grid, each already running `claude`** in its
own project directory.

## What it does

1. On login, `launch.sh` waits for the desktop, picks a random fullscreen boot
   animation, and opens it in a Chrome app window (falls back to Safari, then the
   default browser).
2. After the animation plays, it runs `spawn-claude.applescript`, which tiles 6
   iTerm windows across a 3×2 grid and starts `claude` in each, one per project.
3. Everything is logged to `last-run.log` so login-item runs can be debugged.

## Run

```bash
./launch.sh                            # play a random animation + spawn the grid
ANIM_FILE=anim-arc.html ./launch.sh    # force a specific animation
```

To run it automatically at login, add `launch.sh` as a macOS **Login Item**
(System Settings → General → Login Items).

## Customize

- **Animations** — `anim-arc.html`, `anim-hyperspace.html`, `anim-matrix.html`,
  `anim-vapor.html`. Drop in more `anim-*.html` files and they join the rotation.
- **Windows / dirs** — edit the `slots` list at the top of
  `spawn-claude.applescript` to change each window's title and starting directory.
  Grid geometry is tuned for a 1728×1117 logical desktop; adjust `W`/`H` for yours.

## Stack

Bash · AppleScript · iTerm2 · Chrome (fullscreen `--app` window) · HTML/CSS/JS animations.
