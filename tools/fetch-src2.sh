#!/bin/bash
set -u
skip="projects-site|hangryclaude|website-scaler-backup|bin|research|brain|agentworks"
while read -r r _; do
  [[ "$r" =~ ^($skip)$ || "$r" == .* ]] && continue
  [[ -s "content-src/$r.md" ]] && continue
  gh api "repos/hangryclaude/$r/readme" -H "Accept: application/vnd.github.raw" > "content-src/$r.md" 2>/dev/null || echo "" > "content-src/$r.md"
  gh repo view "hangryclaude/$r" --json name,description,homepageUrl,pushedAt,primaryLanguage > "content-src/$r.meta.json" 2>/dev/null
done < /private/tmp/claude-501/-Users-angus/694d47b2-ac6a-4266-8455-267d2d2299b3/scratchpad/all-repos.tsv
echo "done: $(ls content-src/*.md | wc -l) readmes"
