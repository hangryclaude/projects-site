# Biz Finder

An agent that finds proven business models and pairs each with a brandable name nobody owns — so you can launch without a trademark fight. Runs entirely free: local model + public registries, no keys.

## How it works

Local Ollama (`llama3.2:3b`) brainstorms business models real owners make money with today and invents a short brandable name for each. Every name gets checked against live domain registries over RDAP — an unclaimed exact-match domain is a strong proxy that nobody owns the mark. Each result ships with a one-click USPTO knockout-search link for the five-second official confirm. Output is a ranked `latest-report.md` (model, why it makes money, startup cost, open domains) plus an append-only `results.jsonl` of everything ever checked. Optional cron: 8am daily, top hits texted via cc-text.

## Stack

JavaScript, Ollama (local, free), RDAP, USPTO search links.

## Status

Working. "Clear" means the domain is open — a proxy, not legal advice.
