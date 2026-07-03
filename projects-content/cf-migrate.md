# CF Migrate

A one-shot migration to move 22 Porkbun domains onto Cloudflare DNS so they can actually be hosted. Registration stays at Porkbun (ICANN's 60-day lock blocks a registrar transfer); this just repoints the nameservers.

## How it works

`migrate.sh` reads four env vars (Porkbun key/secret plus a Cloudflare token and account ID) and, for each domain, creates the Cloudflare zone, reads back the two assigned nameservers, and sets them on the domain via Porkbun's `domain/updateNs` API. It's idempotent — re-run anytime and finished domains just re-confirm — and `DRY_RUN=1` previews the whole thing without touching anything. A RUNBOOK walks an unsupervised agent through creds, dry run, execute, verify with `dig`, and the follow-up hosting records.

## Stack

Bash, Porkbun API, Cloudflare API

## Status

Working script with a runbook. Blocked only on a human supplying the Cloudflare token.
