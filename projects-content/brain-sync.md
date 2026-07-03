# brain-sync

Regenerates an Obsidian vault at `~/Brain` from live system state, so there's one wikilinked map of the whole stack — every `~/bin` tool, Claude skill, subagent, GitHub repo, local project, and memory note becomes a node.

## How it works

A Node script that scans the machine (reads `~/bin`, `~/.claude/skills` and `agents`, `gh repo list`, `~/dev` + `~/Tools`, the memory folder) and writes one Markdown note per thing, cross-linking anything that shares a name across tool/skill/repo/project. Only files carrying `generated: true` get wiped and rebuilt — hand-written notes in `System/` and `Inbox/` are never touched. It also emits an "Unsaved Work" dashboard flagging repos with uncommitted or unpushed changes. `--push` commits and pushes to `hangryclaude/brain`; a launchd job runs it every 4 hours.

## Stack

Node.js (stdlib), gh CLI, git, Obsidian, launchd

## Status

Live. Auto-syncs every 4 hours; `--push` mirrors to GitHub.
