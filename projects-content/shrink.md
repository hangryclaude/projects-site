# shrink

Compress text or context before it goes to an LLM, to cut token cost. Pipe a file or stdin through it and get a smaller payload plus a savings report on stderr — so pipes stay clean.

## How it works

A zsh filter with two modes. The default heuristic pass is fast and $0: it strips trailing whitespace, collapses space runs, and squeezes blank lines (with `--code` it keeps indentation and drops full-line comments instead). The `--ai` mode routes the text through the free `ai` stack for 2–5× semantic compression that preserves facts, names, numbers, and code rather than summarizing detail away. Token estimate is chars/4. Designed to sit at the end of a pipe like `repomix --stdout | shrink --ai`.

## Stack

zsh, sed, free `ai` CLI

## Status

Working plain CLI. Part of the token-frugality toolset.
