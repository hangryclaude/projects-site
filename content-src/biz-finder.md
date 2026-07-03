# biz-finder

An agent that finds **proven, profitable business models** and pairs each with a
**brandable name nobody owns** — so you can launch without a trademark fight.

## How it clears a name
1. Local Ollama (`llama3.2:3b`, free) brainstorms business models that real owners
   make money with today + invents a short brandable name for each.
2. Each name is checked against live domain registries (RDAP, free):
   an **unclaimed exact-match domain** is a strong proxy that no one owns the mark.
3. You get a one-click **USPTO knockout-search link** per name for a 5-second
   official trademark confirm before you commit.

No paid APIs, no keys. Runs entirely on your machine + free public registries.

## Use
```bash
./run.sh                         # rotates a proven niche, ~8 clear names
./run.sh "pet care" 12           # target a niche, want 12
./run.sh "fitness" 10 --tld io   # gate on .io first
BIZ_TEXT=1 ./run.sh "coffee"     # also text you a summary via cc-text
```

Outputs:
- `latest-report.md` — ranked clear names (model, why it makes money, startup cost, open domains, USPTO link)
- `results.jsonl` — every candidate ever checked (append-only log)

## Daily auto-run (optional)
```bash
# 8am every day, text the top hits
echo "0 8 * * * cd ~/Tools/biz-finder && BIZ_TEXT=1 ./run.sh >> ~/Tools/biz-finder/cron.log 2>&1" | crontab -
```

## Notes
- "Clear" = an exact-match domain is open. It is a *proxy*, not legal advice —
  always run the USPTO link before filing or spending real money on a name.
- Change the model with `BIZ_MODEL=qwen2.5:32b ./run.sh` for sharper ideas (slower).
