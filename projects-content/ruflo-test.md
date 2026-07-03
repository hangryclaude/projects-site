# ruflo-test

Sandbox for kicking the tires on Ruflo, a claude-flow-style multi-agent framework, wired into Claude Code over MCP. The repo is what the framework leaves behind: agent definitions for Byzantine coordinators, Raft managers, gossip coordinators, SPARC pipeline roles, hierarchical/mesh swarm topologies, plus swarm state and a memory database.

## How it works

`.mcp.json` boots the `ruflo` MCP server in v3 mode with a hierarchical-mesh topology capped at 15 agents. A CLAUDE.md teaches the SendMessage-first coordination pattern: spawn a named researcher → architect → coder → tester → reviewer chain in one message, then fire the pipeline.

## Stack

Claude Code, Ruflo (MCP), SQLite swarm memory

## Status

Test ground, not a product. Served its purpose.
