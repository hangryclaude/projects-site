# Habit Warden

A habit tracker with teeth. Most habit apps let you quietly fail; this one notices you opened Twitter during a focus block and plays David Goggins audio at full volume until you stop.

## How it works

A Flask web dashboard (localhost:4731) plus a rumps menu bar companion. You define daily habits and log completions, run timed focus sessions — including a strict Pomodoro mode that levies a "shame fee" for unauthorized breaks — and block distracting apps and websites. The blocking is real: it rewrites `/etc/hosts` (a one-time sudoers install makes that passwordless) and uses psutil to detect and kill distracting apps. When it catches you slacking, it fires a clip from a local Goggins audio library via `afplay`, falling back to macOS `say` TTS if no clips are downloaded.

Stats accumulate in SQLite: daily and weekly focus minutes, session counts, streak length, apps killed, tabs closed. The menu bar shows your current state at a glance so there's nowhere to hide.

## Stack

Python, Flask, SQLite, rumps, psutil, vanilla JS, WebAudio API, macOS afplay/say

## Status

Working — runs locally via `./start.sh` for the dashboard and `./start_menubar.sh` for the menu bar.
