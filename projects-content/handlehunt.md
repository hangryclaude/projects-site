# Handlehunt

Is that username free? One command answers across ten platforms — GitHub, Telegram, Reddit, TikTok, Cash App, GitLab, Twitch, Steam, Linktree, Gumroad — with no logins and no ToS games.

## How it works

Pure recon: each platform gets a checker that hits public profile URLs or APIs and reads the HTTP signal — available, taken, or honestly unknown — each tagged with a confidence level (some platforms give clean 404s, some need heuristics). Checks run 8-wide in parallel. Feed it names directly, a `--file` list, or `--gen names`/`--gen words` to sweep built-in candidate lists of first names and premium dictionary words. GitHub checks auto-borrow the `gh` CLI token to dodge the 60/hr unauthenticated limit. Built while studying the username-resale market; the scanner outlived the business idea.

## Stack

Node.js, single file in `~/bin`, zero dependencies beyond fetch.

## Status

Working.
