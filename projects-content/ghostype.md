# Ghostype

Cursor and Copilot made Tab-autocomplete feel mandatory — then you switch to Messages and you're typing every word by hand like an animal. Ghostype fixes that: system-wide predictive typing for macOS. Start typing in any text field — Mail, Slack, Notes, a chat box — and a dim "ghost" of your next few words floats at the caret. Press Tab to accept.

## How it works

An Accessibility event tap watches the focused text field and streams context to a prediction engine. Two layers answer: a tiny on-device n-gram model that learns your actual phrases ("lmk when you're free" completes instantly, zero latency, your exact wording), and an LLM call for the longer completions. Every ~20 messages it re-reads your recent writing and distills a style profile — tone, slang, emoji habits, sign-offs — that gets injected into every prediction, so it writes like you, not like a chatbot. Tab-accepted suggestions are logged as strong signals and folded back in.

Everything learned lives in `~/.ghostype/`. Nothing uploads. Inference routes through a shared AI controller that hits free models first, with local Ollama in the mix.

## Stack

Swift 6, AppKit, Accessibility API (CGEventTap), Ollama, Node.js AI controller for routing

## Status

Working — downloadable .dmg on GitHub releases, macOS 13+.
