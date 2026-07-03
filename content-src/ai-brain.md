# AI Brain 🧠

Chat with an AI and **watch it think** — a living 3D neural brain fires behind the conversation while it reasons, every answer shows *how it thought* and the *prompting lesson*, you can drill **deeper** on anything, and it **remembers everything it teaches you**.

## Run
```bash
node ~/dev/ai-brain/brain-server.cjs      # → http://localhost:7910
```
Open that URL and start typing. (LIVE answers need the server — it calls your `~/Tools/lib/ai.cjs` router. Open `index.html` directly with no server and it falls back to a demo answer so it's never blank.)

## What you get
- **3D brain** (`brain.js`, three.js) — two wrinkled hemispheres of glowing neurons + synapses + traveling pulses. Calm when idle, fires hard while thinking, and grows permanently brighter each time it learns a lesson. Drag to rotate.
- **Chat** — ask anything. The answer arrives with an expandable **🧠 how it thought** (the reasoning steps), a **lesson** chip (the prompting takeaway), and a **↓ go deeper** button that pulls a sharper, more first-principles explanation each press.
- **It learns** — every lesson is saved to `brain-memory.jsonl` and fed back as context on future questions, so it builds on what it's already taught you. Click **🧠 N learned** to see the whole knowledge base.
- **↺ session** — optionally drop a real Claude Code `.jsonl` to replay how it actually reasoned (text + tool calls + redacted-thinking markers), brain firing through each step.

## Endpoints (`brain-server.cjs`, zero deps)
`/chat` · `/deeper` · `/learned` · `/transcripts` · `/transcript` · plus `/think` `/compare` `/lesson` from the structured-trace mode. Static `brain.js` is served alongside `index.html`.

## Knobs
- `BRAIN_PORT=7911 node brain-server.cjs` — change the port.
- Reasoning depth selector in the composer: `smart` (free ensemble) · `fast` · `deep` (Opus).
- Wipe its memory: `rm ~/dev/ai-brain/brain-memory.jsonl`.
