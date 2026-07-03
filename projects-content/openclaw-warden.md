# OpenClaw Warden

A parole officer for uncensored local AI models. Running jailbroken 27B–32B models on a 24GB Mac has two failure modes: you lose an afternoon to them, and their default 128k–262k context sizes eat all your RAM and OOM the machine. OpenClaw Warden enforces limits on both.

## How it works

`open.sh` opens a time-boxed session (default 30 minutes): it writes an expiry timestamp, checks available RAM via `vm_stat`, and refuses to start if memory is too low. `watch.sh` is the enforcer — run it on a cron and it kills any OpenClaw or related Ollama processes once the window expires, and auto-unloads heavy models if memory drops critically low mid-session. `close.sh` ends everything immediately and frees the RAM.

The clever bit is `prepare-safe-jail-models.sh`: it creates 4k-context aliases of the big uncensored models (Qwen 27B uncensored, abliterated Qwen, Qwen 32B), capping KV-cache memory so a model that would OOM at its default context runs safely. Supports `--dry-run` throughout, logs to `watch.log`.

## Stack

Bash, Python 3 (vm_stat parsing), Ollama, cron/launchd

## Status

Working — daily-driver scripts, no external services, no paid API.
