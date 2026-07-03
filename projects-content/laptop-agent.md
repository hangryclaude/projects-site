# laptop-agent

A local agent Claude can hand GUI tasks to. `la add "turn on Night Shift"` and a headless Claude drives the Mac itself — clicks, types, navigates System Settings. When it hits something only a human can do (a login, 2FA code, CAPTCHA, payment), it texts me exactly what's needed and pauses until I run `la resume`.

## How it works

A Node daemon (port 7686) holds a SQLite task queue with a dashboard and a CLI. For each task it spawns `claude -p --dangerously-skip-permissions` with computer-use MCP access, so the worker can act without prompts — macOS still pops a one-time approval per app. The worker reports back through `la complete` or `la escalate`; escalation fires an iMessage and flips the task to `blocked`. Lifecycle is `queued → running → done`, with `blocked` waiting on my resume and `failed` retryable via `la retry`. One task runs at a time because the GUI is a shared resource. Runs on login via a launchd plist; logs per task, everything in `tasks.db`.

The point: any Claude session anywhere on the machine can delegate a physical-Mac task with one shell line, and the human-in-the-loop part is a text message, not babysitting.

## Stack

Node.js, SQLite, Claude Code (headless), computer-use MCP, launchd, iMessage

## Status

Working — daemon, dashboard, and CLI all functional; used for real errands.
