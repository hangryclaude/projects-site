# skillify

Turns anything you just built — a CLI tool, script, repo, or directory — into a Claude Code skill, so Claude can invoke it by name forever after. The "I made a thing, now make it a permanent capability" button.

## How it works

A Node script that gathers context about the target (source head for a script; file tree plus README for a directory), then asks the free `ai` stack ($0) to draft the SKILL.md `description` (with "Use when the user…" trigger phrases) and a usage body, splitting the two on a `%%%` marker. If the free model is unreachable it writes a working template with a TODO instead of failing. Scaffolds `~/.claude/skills/<name>/SKILL.md`; the new skill shows up in the Brain on the next brain-sync.

## Stack

Node.js (stdlib), free `ai` CLI, Claude Code skills

## Status

Working plain CLI. Pairs with brain-sync to register new skills.
