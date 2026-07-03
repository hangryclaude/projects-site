# AI Stack Map

A living console of the whole AI setup: Claude and Codex as twin cores, the free-first provider fleet on an inner ring, powers (research, GitHub, Google, sub-agents, memory) on an outer ring, energy pulsing along live wires over a starfield. Click a task type in the TASK ROUTER and it traces which brain actually handles it.

## How it works

`build.cjs` doesn't draw from a config file — it introspects the real `ai` router by calling `liveState()` from `~/Tools/lib/ai.cjs`, so the map shows which providers are actually live right now. It bakes that state into a single self-contained animated `index.html`. Regenerate and open with `ai map`.

## Stack

Node.js, vanilla HTML/CSS/JS (generated), `~/Tools/lib/ai.cjs`

## Status

Working, local. Regenerates on demand.
