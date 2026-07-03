# stack-doctor

A one-shot health check for the whole AI/token stack. Run it and get green/red lines on everything that has to be working — toolchain, free `ai` providers, daemons, hooks — so a silent breakage doesn't cost paid tokens for days before you notice.

## How it works

A read-only zsh script that probes each subsystem in turn: node/ollama/rustc/gh versions, `~/bin` symlinks resolving, `ai --state` (live free providers, sub readiness, lockdown), local Ollama and the `:7600` AI gateway, the spend-guard and second-take token guards, the clone-agent brain, custom subagents and slash commands, Playwright/Chromium, format hooks, and today's spend. Everything is a green ✓, yellow !, or red ✗ — a glanceable dashboard, nothing mutated.

## Stack

zsh, curl, launchctl, node, ollama, gh

## Status

Working plain CLI. Safe/read-only; run anytime.
