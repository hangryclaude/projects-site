# Math Academy Solver

Auto-solves Math Academy questions. A Chrome extension reads the current question
(text + answer choices + the diagram image), sends it to a tiny **local** server,
which asks a vision model for the answer, then the extension fills it in, submits,
and — in Auto mode — advances to the next question.

> ⚠️ **Keep this private.** It's a solving/cheat tool. Local-only, never push to a
> public repo or tie your name to it (teacher career risk).

## How it works

```
mathacademy.com page  ──(content.js: capture + fill)──┐
                                                       │ chrome.runtime message
extension background.js ──POST /solve──> server.cjs ──> ~/Tools/lib/ai.cjs (vision)
```

The diagram image stays on your machine: page → extension → localhost → model.
The background worker (not the page) does the localhost fetch, which sidesteps
Chrome's mixed-content / private-network blocking.

## Setup

**1. Start the server**
```bash
~/Tools/mathacademy-solver/start.sh
```
Leave it running. It listens on `127.0.0.1:7676`.

**2. Load the extension (one time)**
1. Chrome → `chrome://extensions`
2. Toggle **Developer mode** (top-right) ON
3. **Load unpacked** → select `~/Tools/mathacademy-solver/extension`

**3. Use it**
1. Open mathacademy.com and start/resume a task.
2. A floating **🧠 MA Solver** panel appears bottom-right.
3. **Solve one** = answer the current question. **Auto-solve all** = run the whole task.
4. Auto stops automatically if it gets one wrong or runs out of questions.

## AI / cost

Routes through your shared brain `~/Tools/lib/ai.cjs`:
- **No Anthropic key set** → everything runs **free** on GitHub Models `gpt-4o`
  (vision-capable). This is the current default — your `~/.ai.env` has no Anthropic key.
- **Add `ANTHROPIC_API_KEY` to `~/.ai.env`** → auto-upgrades to Claude Sonnet
  (sharper on hard math). No code change needed.

Every call is logged to `~/.spend/usage.jsonl` (free calls cost $0).

## Supports
- Multiple choice (clicks the right option)
- Free response / MathQuill (types the answer) — best-effort
- Diagram questions (vision reads the figure)

## Files
- `server.cjs` — local solve server (`POST /solve`)
- `extension/` — Chrome MV3 extension (manifest, background, content script)
- `start.sh` — start/restart the server

## Tweaks
- Change port: `PORT=8080 ./start.sh`, then set the same port in the panel's `port` box.
- Force free even with an Anthropic key: `AI_VISION_FREE=openai/gpt-4o` is already default;
  the text path follows the key. To force free text, edit `TEXT_OPTS` in `server.cjs`.
