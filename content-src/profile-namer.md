# profile-namer

Turn messy contacts — phone numbers, handles, half-remembered names — into **clean
profiles with a real First + Last name**, inferred from how each person actually
talks to you. Runs entirely on the **free AI chain** (`~/Tools/lib/ai.cjs`), so it's
**$0** and never touches a paid API.

For every person it writes:

- **`profiles.json`** — one clean profile each: `first`, `last`, `full`, `confidence`, `basis`
- **`avatars/*.svg`** — a simple initials avatar per person
- **`index.html`** — open it to eyeball everyone at a glance

## Use

```bash
node namer.cjs sample            # demo on the bundled sample data
node namer.cjs <folder-or-file>  # point it at your own conversations
node namer.cjs --imessage        # read macOS iMessage history (~/Library/Messages/chat.db)
```

Then open `index.html` to review.

## Input formats

Point it at conversations in any of these shapes:

1. A folder of `.txt` files, one per person (filename = their handle/number)
2. A folder of `.json` files: `[{from, text}, ...]` (`from` = handle/number/name)
3. One `.json` file: `{ "handle-or-number": ["msg", "msg", ...], ... }`
4. macOS iMessage: `node namer.cjs --imessage`

## How it works

For each person it feeds their messages to the free AI and asks it to infer a full
name from how they're addressed and how they sign off — then scores its own
confidence and records the basis ("sign-off 'Sarah Chen'"). Names are sorted A→Z by
last name; people it couldn't name are listed at the end, busiest first.

Inference runs in parallel batches (concurrency 5 — Ollama Cloud rate-limits bursts).

## Stack

Node.js · free AI via `~/Tools/lib/ai.cjs` · no keys, no paid APIs.
