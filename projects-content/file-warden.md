# file-warden

A janitor for the three folders that always turn into swamps: Home, Desktop, and Downloads. Loose files that have sat idle for 24 hours get swept into `~/Filed/<bucket>/<YYYY-MM>/`, sorted by type and by the month they were last touched.

## How it works

A Node script, run every 30 minutes by launchd (`com.angus.file-warden`). It only touches loose files — never directories, never dotfiles — buckets them by extension (images, videos, docs, code, installers…), and files them under the month from their mtime. The careful bit: it never overwrites (auto-suffixes name clashes) and never deletes, skips anything currently held open via `lsof`, and honors a `~/.file-warden-keep` allowlist of paths/globs. `--dry-run` previews, `--status` reads the log.

## Stack

Node.js (stdlib), launchd, lsof

## Status

Live. Runs on a 30-minute launchd timer.
