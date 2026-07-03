# Profile Namer

Turn messy contacts — phone numbers, handles, half-remembered names — into clean profiles with a real first and last name, inferred from how each person actually talks to you. Costs $0: runs on the free AI chain, never touches a paid API.

## How it works

Point it at conversations (a folder of `.txt`/`.json` files, or `--imessage` to read macOS iMessage history straight from `chat.db`). For each person it feeds their messages to the free AI and asks it to infer a full name from how they're addressed and how they sign off, then scores its own confidence and records the basis ("sign-off 'Sarah Chen'"). Output: `profiles.json`, an initials SVG avatar per person, and an `index.html` to eyeball everyone. Inference runs in parallel batches of 5 (Ollama Cloud rate-limits bursts).

## Stack

Node.js, free AI via `~/Tools/lib/ai.cjs`, SQLite (iMessage chat.db).

## Status

Working.
