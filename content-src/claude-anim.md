# claude-anim

> Terminal animation of the Claude logo — pixel-art half-blocks, truecolor ANSI, no dependencies.

## What it does

Plays a five-phase animated sequence in the terminal: the Claude logo's petals draw outward from center (Ignition), the mark drifts in a lissajous pattern with comet trails (Drift), satellites orbit and merge (Constellation), the CLAUDE wordmark wipes in (Reveal), then holds with a breathing effect and tagline before fading (Hero). Renders with `▀` half-block characters for square pixels and the brand's warm orange palette on a near-black background.

## Run

```bash
python3 claude.py
```

Ctrl-C exits cleanly and restores the terminal cursor.

## Stack

Pure Python 3 stdlib — `sys`, `time`, `math`, `shutil`, `signal`. No installs, no paid API, no AI chain.
