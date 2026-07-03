# brainstorm
A lightweight tool for structuring and organizing creative brainstorming sessions

This tool captures a high-level idea and leverages AI to generate a comprehensive project plan. It saves these plans as executable structures that can be reviewed, managed, and eventually instantiated directly into a development workflow.

## Features
- **AI-Driven Planning**: Converts a single prompt into a detailed goal, architecture, and feature set.
- **Plan Management**: List, view, and store multiple brainstorming sessions.
- **Direct Instantiation**: Copies project plans for immediate execution (via `go` command).
- **Persistent Storage**: Saves all generated plans locally in the `plans` directory.

## Run
```bash
node brainstorm.js <command>
```
*(Commands: `"<idea>"`, `ls`, `show <id>`, `go <id>`)*

## Stack
Node.js
