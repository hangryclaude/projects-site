# Local Open "ChatGPT-4" (gpt-oss + friends)

Apple M4 Pro (24 GB) local LLM setup using **OpenAI's official open-weight models** + other strong open alternatives.

## What you get
- **gpt-oss:20b** (OpenAI, Aug 2025): Apache 2.0, strong reasoning model. ~o3-mini / near o4-mini level on many tasks. Fully local, private, free after download.
- Easy terminal chat (`ollama run`)
- Beautiful browser ChatGPT-like UI (no Docker required)
- Drop-in replacement for OpenAI API in your other projects (`/v1` compatible endpoint)
- 100% offline after models are pulled

## Quick Start

```bash
cd ~/local-llm

# 1. Make sure Ollama.app is running (launches the server)
open -a Ollama

# 2. Terminal (powerful)
./chat.sh                  # or: ollama run gpt-oss:20b

# 3. Beautiful browser UI (ChatGPT style, streaming)
python3 -m http.server 8080
# open http://localhost:8080/chat.html
```

The `chat.html` is a fully self-contained modern interface (no extra installs). It supports model switching, system prompts, copy, etc. and talks directly to your local Ollama.

## Hardware Notes (your machine)
- MacBook Pro, M4 Pro, 24 GB unified memory
- Excellent for the 20b model (low active params thanks to MoE + MXFP4 quantization from OpenAI)
- Expect good speed (30-80+ t/s depending on settings)
- The 120b is too big for comfortable 24 GB use — stick with :20b or smaller fast models.

## Installed Models (run these anytime)

```bash
ollama list

# Recommended
ollama run gpt-oss:20b

# Faster / lighter alternatives (pull if you want speed)
ollama pull qwen2.5:14b          # or :7b for blazing fast
ollama pull gemma3:12b
ollama pull phi4:14b
```

## Using as OpenAI API replacement (for your other projects)

Point any OpenAI SDK / LangChain / your tools at the local server:

```bash
export OPENAI_BASE_URL=http://localhost:11434/v1
export OPENAI_API_KEY=ollama   # dummy key
```

Then normal `openai` client code / `ChatOpenAI` etc. just works. No code changes needed in most cases.

See `examples/` for snippets.

## Files in this folder
- `chat.html` — Self-contained modern chat UI (Tailwind + streaming support). Open via local server.
- `chat.sh` — Convenience launcher for terminal.
- `examples/` — Code snippets for Node, Python, integration notes for your other repos (outreach-engine, etc.).
- This README.

## How it was set up (your machine)
```bash
# Official macOS app (recommended — includes full server binaries for M-series)
brew install --cask ollama
open -a Ollama          # launches the app + server (menu bar icon)

ollama pull gpt-oss:20b # 13 GB, done once
```

The official Ollama.app (in /Applications) manages the background server reliably on Apple Silicon. The CLI `ollama` is symlinked.

**First run of gpt-oss:20b is slow** (full model load + backend ~6+ minutes observed). It demonstrates rich "Thinking..." chain-of-thought and safety policies (it refused a prompt asking it to "confirm you are the gpt-oss model" on identity grounds).

Subsequent interactions are faster. The browser UI defaults to a fast small model (`qwen2.5:3b`) for snappy use. For the richest gpt-oss experience use the terminal `ollama run gpt-oss:20b`.

We also have `qwen2.5:3b` pulled for instant testing.

## Tips for best performance on M4
- Keep other RAM-heavy apps closed when using large context.
- For faster responses use lower reasoning effort in prompts if the model supports it (gpt-oss has low/medium/high via system msg).
- Use 4-bit or the native quantized version (already done).

## Updating
```bash
brew upgrade ollama
ollama pull gpt-oss:20b   # re-pull latest
```

## Sources
- Official: https://openai.com/index/introducing-gpt-oss/
- Ollama library: https://ollama.com/library/gpt-oss
- Run locally guide in OpenAI Cookbook.

Enjoy private, free, high-quality local AI!
