# Hacking Resources Mirror

A local, offline, text-only copy of the highest-signal infosec reference repos — cheatsheets, payload collections, roadmaps, Nuclei templates — harvested so you can read them without cloning or visiting the originals, some of which ship live exploit code or worse.

## How it works

An AI agent walked the GitHub "hacking" topic and did a controlled harvest of the most-documentation, least-executable repos: PayloadsAllTheThings, InternalAllTheThings, h4cker, the-book-of-secret-knowledge, Hacker101, projectdiscovery's nuclei-templates, and more. It kept only text — markdown, txt, JSON, YAML, wordlists — aggressively filtering out binaries, images, and compiled code via rsync include lists, stripped every `.git`, and executed nothing during the copy. Result: ~14,600 text files, ~97 MB, searchable with ripgrep or feedable into a local RAG index without touching the risky originals.

## Stack

GitHub API, git (shallow clones), rsync filtering, shell

## Status

Snapshot dated 2026-06-02. Reference archive — read-only by design.
