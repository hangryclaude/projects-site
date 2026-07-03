# Faceless

A content factory for anonymous short-form brands — nobody on camera, nobody at the keyboard. One daemon writes, voices, renders, and schedules AI faceless videos for ~10 brands across TikTok, YouTube Shorts, and Reels.

## How it works

A knowledge base drives the writing: per-niche JSON files (motivation, finance, scary-stories, luxury, eight more) plus hook and structure libraries distilled from what the algorithm rewards. The pipeline per video: pick a topic, script it through local Ollama (free), synthesize a voiceover, pull b-roll, burn in captions and overlays, render with ffmpeg, thumbnail it. A node-cron scheduler daemon ticks through each brand's posting calendar; state lives in SQLite, and Playwright handles the posting end. Each brand is a folder with a `brand.json` and seed content.

## Stack

Node.js, better-sqlite3, node-cron, Ollama, ffmpeg, Playwright

## Status

Built end-to-end; pipeline works. Not currently running the ten-brand empire.
