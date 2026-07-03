# local-llm

OpenAI's open-weight gpt-oss:20b running on a MacBook — private, free after download, wifi optional. A local ChatGPT that other projects can also use as a drop-in OpenAI API replacement.

## How it works

Ollama serves gpt-oss:20b (MoE + MXFP4 quantization makes 20B comfortable in 24 GB of M4 Pro unified memory, 30–80+ tokens/s). Two frontends: `chat.sh` in the terminal, and a self-contained `chat.html` — a streaming ChatGPT-style UI with model switching and system prompts, no Docker, no build. Point `OPENAI_BASE_URL` at `localhost:11434/v1` and any OpenAI SDK code works unchanged; `examples/` has the snippets for wiring it into other repos.

## Stack

Ollama, gpt-oss:20b (plus qwen2.5/gemma3/phi4 alternates), vanilla HTML/JS

## Status

Working setup, used as the local tier of the free AI stack.
