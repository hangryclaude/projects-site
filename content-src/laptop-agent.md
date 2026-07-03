# laptop-agent

A local agent Claude can hand GUI tasks to. It **drives the laptop itself** via
the computer-use MCP. When it hits something it can't do — a login, 2FA code, a
CAPTCHA, a payment, a physical/hardware action — it **texts Angus** with exactly
what's needed and pauses until he runs `la resume`.

```
  you / Claude  ──add task──▶  laptop-agent daemon  ──spawns──▶  headless `claude -p`
                                     │                               │ drives the Mac
                                     │                               │ (computer-use MCP)
                                     │◀──── la complete / la escalate ┘
                                     │
                                 texts Angus  ◀── 🤖 [CC] iMessage
```

## Run it

```bash
cd ~/Tools/laptop-agent
node server.js          # → http://localhost:7686
```

Auto-start on login:

```bash
cp com.angus.laptop-agent.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.angus.laptop-agent.plist
```

## Use it

Dashboard: <http://localhost:7686> — add tasks, watch status, resume blocked ones.

CLI (`~/Tools/laptop-agent/la`):

| command | what |
|---|---|
| `la add "task"` | queue a task |
| `la list` | show all tasks |
| `la log <id>` | tail a task's worker log |
| `la resume <id>` | "I did the manual step — continue" |
| `la retry <id>` | re-queue a done/failed task |

`la escalate` and `la complete` are called **by the worker**, not you.

## How Claude prompts it

From any Claude session, just:

```bash
~/Tools/laptop-agent/la add "Open System Settings and turn on Night Shift"
```

The daemon picks it up, spawns a headless Claude with computer-use access, and
it does it. If it gets stuck it texts you.

## Lifecycle

`queued → running → done` — or `→ blocked` (texted you, waiting on `la resume`)
→ back to `queued` → `running → done`. Failures land in `failed`; `la retry`.

## Notes

- One task runs at a time (GUI is a shared resource).
- The worker runs `claude -p --dangerously-skip-permissions` so it can act
  without prompts. It still must call `request_access` for computer-use, which
  pops a one-time macOS approval per app.
- Logs: `logs/task-<id>.log`. DB: `tasks.db` (SQLite).
- Port 7686 (7676 is taken by revenue-dashboard).
