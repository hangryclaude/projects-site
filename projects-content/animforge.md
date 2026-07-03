# animforge

Tell a free model to improve an HTML animation, screenshot the result in headless Chrome, and argue with it until the page renders clean. A bash loop that turns "generate and hope" into "generate and verify."

## How it works

`animforge file.html "instruction"` pipes the current file plus instruction to the free `ai` CLI, strips the fences, and sanity-checks it's a complete HTML document. It serves the candidate locally, runs the shared crazy-web-effects screenshot verifier, and if there are console or page errors, feeds them back to the model as the next round's instruction — up to N rounds. On a clean render it backs up the original and swaps in the new version. LLM cost: $0.

## Stack

Bash, free `ai` CLI, Node (verify.mjs), headless Chrome, python3 http.server

## Status

Working `~/bin` tool. Free models choke on big generations, so it shines on evolving existing files.
