# Second Take 🧠

**Anytime Claude hits a problem, it takes a second back — a free AI diagnoses the
root cause and Claude applies the fix, instead of burning paid tokens flailing at
the same wall. Every fix is remembered, so the same wall is never solved twice.**

## Why
Re-debugging the same errors over and over is where paid Claude tokens leak. This
moves that thinking onto the **free** AI brain (`~/Tools/lib/ai.cjs`) and onto a
growing memory that costs $0 to read.

## How it works
1. A Claude Code **PostToolUse hook** fires after every Bash command.
2. If the command clearly failed, it:
   - checks memory for a remembered fix → injects it **instantly, $0**, or
   - asks the **fast free tier** for a root-cause + exact fix (~1s, $0),
3. injects the diagnosis straight into Claude's context, and
4. saves it so next time it's instant.

Fingerprinting normalizes line numbers / paths / pids, so "same wall, different
details" still hits a remembered fix (exact + fuzzy match).

## Files
- `solve.cjs` — engine: `solve()`, `recall()`, fingerprinting, memory. Also a CLI.
- `hook-posttool.cjs` — the Claude Code hook (wired in `~/.claude/settings.json`).
- `~/.second-take/lessons.json` — the growing fix memory.
- `~/.second-take/events.jsonl` — recall/solve event log.

## Use it by hand
```bash
st "ModuleNotFoundError: No module named 'requests'"   # ~/bin/st
st report                                              # what it's learned + $ saved
node solve.cjs "some error" --context "extra info" --tier smart
```

## Tuning
- Hook timeout: `SECOND_TAKE_TIMEOUT_MS` (default 9000).
- Live tier is `fast` (snappy, $0). Manual CLI defaults to `smart` for tougher walls.
- Only fires on real error signatures; success commands are ignored.
- On any internal error the hook exits silently — it can never break a session.
