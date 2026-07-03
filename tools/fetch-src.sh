#!/bin/bash
# Pull README + metadata for each curated repo into content-src/
set -u
repos=(inbox-engine lead-agent leadkit creator-hunt cold-1m-machine website-scaler cold-email-deliverability-playbook lib ai-brain second-take spend-guard malware-scanner laptop-agent jarvis voice-caller cheat-glasses viral-x graham samewave ghostype habit-warden dropkit spellfix deepworkscore eyesite-saver openclaw-warden term-tile mathsnap ReplyKey crazy-web-effects website-maker heynox-tunnel nox-bullet lusion-wallpaper madebyangus kalshi-copybot polymarket-copybot coin-sniper)
for r in "${repos[@]}"; do
  gh api "repos/hangryclaude/$r/readme" -H "Accept: application/vnd.github.raw" > "content-src/$r.md" 2>/dev/null || echo "" > "content-src/$r.md"
  gh repo view "hangryclaude/$r" --json name,description,homepageUrl,pushedAt,primaryLanguage,repositoryTopics > "content-src/$r.meta.json" 2>/dev/null
  echo "$r: $(wc -c < content-src/$r.md | tr -d ' ') bytes readme"
done
