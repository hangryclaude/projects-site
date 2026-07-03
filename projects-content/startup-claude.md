# startup-claude

A login launcher that plays a fullscreen boot animation and then drops you straight into work: six iTerm windows in a 3×2 grid, each already running `claude` in its own project directory. Log in, watch the intro, start shipping.

## How it works

`launch.sh` runs as a macOS Login Item. It waits for the desktop to settle, picks a random `anim-*.html` boot animation (arc, hyperspace, matrix, vapor) and opens it in a Chrome `--app` window — falling back to Safari, then the default browser. Once the animation plays, it hands off to `spawn-claude.applescript`, which tiles six iTerm windows across a 3×2 grid and starts `claude` in each, one per project directory from an editable `slots` list. Everything gets written to `last-run.log` so login-item runs — which are otherwise invisible — can actually be debugged.

Drop in more `anim-*.html` files and they join the rotation automatically. Grid geometry is tuned for a 1728×1117 logical desktop; the `W`/`H` constants adjust it for other resolutions.

## Stack

Bash, AppleScript, iTerm2, Chrome (fullscreen app window), HTML/CSS/JS canvas animations

## Status

Working. Runs on login as a macOS Login Item, or by hand via `./launch.sh`.
