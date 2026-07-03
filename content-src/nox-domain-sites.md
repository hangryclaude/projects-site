# nox-domain-sites
Automated deployment and domain management for Nox site infrastructure

This project automates the generation and deployment of unique landing pages across a portfolio of domains. It leverages AI to generate brand-specific copy for each domain and provides tooling to attach these domains to Vercel infrastructure.

## Features
- **AI-Driven Generation**: Automatically generates unique brand voices and headlines for each domain using a template system.
- **Bulk Domain Attachment**: Scripted attachment of multiple domains to a single Vercel project (`rply-landing`).
- **Idempotent Pipeline**: Tracks generated sites via `manifest.json` to allow resumable builds without duplicating API calls.
- **Portable Output**: Produces self-contained HTML landing pages requiring no build step or external dependencies.

## Run
To generate landing pages for the domains:
```bash
node generate.cjs
```

To attach domains to the Vercel project:
```bash
./attach-domains.sh nox-domains.txt
```

## Stack
Node.js, Bash, Vercel API.
