# domain-grabber

Brainstorm brandable domain names with the free AI, then check **real** availability
via RDAP (official registry protocol — free, no API key, no rate-limit pain).

```bash
node grab.cjs "ai fitness coaching app"          # brainstorm names + check
node grab.cjs "fintech for teens" --tlds com,io,ai --count 40
node grab.cjs --check nox.com getheynox.io        # check exact domains only
node grab.cjs --check brandname --tlds com,io,ai  # bare label → tries each TLD
node grab.cjs "..." --available-only              # only show open domains
node grab.cjs "..." --json                        # machine-readable
```

Flags: `--tlds` (default `com,io,ai,co,app,dev,xyz`), `--count` (default 30),
`--available-only`, `--json`.

`available` = registry has no record (404). `taken` = registered (200).
`unknown` = TLD not in RDAP / timeout / rate-limited.

Optional alias: `echo 'alias dgrab="node ~/Tools/domain-grabber/grab.cjs"' >> ~/.zshrc`
