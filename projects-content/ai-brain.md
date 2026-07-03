# AI Brain

Everyone tells you to "get better at prompting" and nobody shows you what the model actually does with your words. AI Brain is a chat app with a living 3D neural brain behind it — two wrinkled hemispheres of glowing neurons that idle calmly, fire hard while the model reasons, and grow permanently brighter each time it teaches you something.

## How it works

A zero-dependency Node server (`brain-server.cjs`, port 7910) routes questions through my free-first AI router. Every answer comes back with an expandable "how it thought" trace, a one-line prompting lesson, and a "go deeper" button that pulls a sharper, more first-principles explanation each press. Lessons are appended to `brain-memory.jsonl` and fed back as context on future questions, so it builds on what it's already taught you — click the counter to browse the whole knowledge base. There's also a replay mode: drop a real Claude Code session `.jsonl` and watch the brain fire through the actual reasoning steps, tool calls included. The brain itself is three.js — neurons, synapses, traveling pulses, drag to rotate. Open `index.html` with no server and it falls back to a demo answer so it's never blank.

## Stack

JavaScript, Node.js (zero-dep server), three.js, free-first LLM router (`~/Tools/lib/ai.cjs`)

## Status

Working — runs locally, not deployed anywhere public.
