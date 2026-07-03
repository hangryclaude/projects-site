# openclaw-warden

Time-boxed access control and memory safety for uncensored/jailbroken local AI sessions on a 24GB Mac.

## What it does

Enforces a timed window for running OpenClaw (an uncensored local AI frontend): `open.sh` writes an expiry timestamp, checks available RAM, and refuses to start if memory is too low. `watch.sh` is the enforcer — it kills any OpenClaw or related Ollama processes once the window expires, and auto-unloads heavy jailbroken models if memory drops critically low. `close.sh` ends the session immediately and unloads RAM-heavy models. `prepare-safe-jail-models.sh` creates 4k-context aliases of large uncensored models (Qwen 27B uncensored, abliterated Qwen, Qwen 32B) to cap KV-cache RAM usage — preventing OOM crashes from the default 128k–262k context sizes.

## Run

```bash
# Open a 30-minute jailbroken session (default), with low-RAM safe model variants
./open.sh 30 --jail

# Open for 45 minutes, skip RAM check
./open.sh 45 --force

# Preview what would happen without executing
./open.sh 60 --dry-run

# End the session early and unload heavy models
./close.sh

# Enforce the time window (run on a cron or manually)
./watch.sh

# One-time setup: create low-context (4k) safe model aliases
./prepare-safe-jail-models.sh
# or dry-run it
./prepare-safe-jail-models.sh --dry
```

Logs go to `~/Tools/openclaw-warden/watch.log`.

## Stack

Bash + Python3 (via `vm_stat` for unified memory reads) + Ollama — no paid API, no external services.
