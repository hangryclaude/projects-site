# Second Take

Re-debugging the same errors is where paid Claude tokens leak. Watch an agent hit a wall, flail at it for six turns, burn tokens, and finally fix it — then hit the identical wall next week. Second Take makes the wall only cost money once, and ideally never.

## How it works

A Claude Code PostToolUse hook fires after every Bash command. If the command clearly failed, it first checks a local memory of past fixes — a hit gets injected into Claude's context instantly, at $0. On a miss, it asks a free model for a root cause and exact fix (~1 second, still $0), injects that, and saves it. Fingerprinting normalizes line numbers, paths, and pids, so "same wall, different details" still matches a remembered fix via exact and fuzzy lookup. It only triggers on real error signatures, and any internal failure exits silently — the hook can never break a session. Memory lives in `~/.second-take/lessons.json`; `st report` shows what it's learned and the dollars saved. Also usable by hand: `st "some error"` from any terminal.

## Stack

JavaScript, Node.js, Claude Code hooks, free-first LLM router (`~/Tools/lib/ai.cjs`)

## Status

Live — wired into my Claude Code settings, fires on every failed command.
