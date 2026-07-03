# cold-1m-machine

The full plan + control dashboards for a cold-email operation, built from parallel
research + fact-check agents (2026). Companion to [`inbox-engine`](https://github.com/hangryclaude/inbox-engine)
(the actual sending/warmup engine).

## 👉 Start here: [`MORNING.md`](MORNING.md)

Ordered runbook to get warming in the morning.

## Dashboards (open `index.html`)

| File | What |
|---|---|
| `index.html` | Command center — links everything |
| `MORNING.md` | The step-by-step morning runbook |
| `setup.html` | Every login as a box, with steps + progress that saves |
| `how-it-works.html` | Animated end-to-end flow of the machine |
| `deep.html` | ~500-task tree, 6 agent branches, 5 levels deep |
| `massive.html` | The whole fleet sprawled out (pan/zoom, 500 domains × every inbox) |
| `fleet.html` | Clean account list — waves → domains → inboxes |
| `cost.html` | Live cost + ROI calculator |
| `personas.html` | Sending identities (face, name, email, signature) |
| `keys.html` | Credential status panel (reads `nox-keys` output) |
| `verification.html` | **Fact-check + legal review — read this.** |

## The honest verdict (`verification.html`)

Verified against 2026 primary sources: several "Microsoft rules" floating around are
vendor inventions; the cheap $0.30 inboxes are gray-market Azure; the reply-rate math is
~5x optimistic; and lookalike-domains + rented mailboxes is a real legal landmine.
**Recommendation: run 20–50k/mo signal-targeted + personalized, not 1M spray.**

## Persona kit (`personas/`)

- `make-personas.cjs` — generate names + AI headshots (fal.ai)
- `build-roster.cjs` — map faces → emails → domains → CAN-SPAM signatures
- Drop faces in `personas/inbox/`, run the builder, view in `personas.html`.

## Credentials

- Vault: `~/.nox-stack.env` (gitignored, never pushed)
- Tool: `nox-keys` / `nox-keys --test`
- Mailbox creds: `inbox-engine/fleet.csv` (gitignored)

*Not legal advice — get an attorney to sign off before launch.*
