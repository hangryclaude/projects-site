# Hacking Resources Mirror (Safe Copy)

**Source**: GitHub topic "hacking" (https://github.com/topics/hacking)

**Purpose of this mirror**:
- Local, offline, static copy of selected high-value public documentation, lists, payloads, cheatsheets, roadmaps, and reference materials.
- Created so you can review the content **without** directly cloning or visiting the original repositories (reduces risk of accidentally executing anything malicious).

**IMPORTANT - READ BEFORE USING ANYTHING HERE**:
- This is for **educational, authorized security research, CTF, bug bounty (with permission), and defensive purposes only**.
- **DO NOT** execute, run, compile, or install any code, scripts, binaries, or "tools" found in these copies.
- Many original repos in the "hacking" topic contain proof-of-concept exploits, payloads, or (in some cases) actual malware samples intended for research/analysis in isolated environments.
- Review every file yourself. Treat all content as untrusted.
- If you need to test payloads or tools, do it in isolated VMs, sandboxes, or authorized lab environments only.
- The original authors' licenses and disclaimers apply (most are MIT/educational; check per-repo).
- This mirror contains **only text and data files** (primarily .md, .txt, .json, wordlists, etc.). No binaries or executables were intentionally copied. Any remaining risk is yours.

**What was copied**:
- Primarily "awesome list", resource hub, payload collection, and methodology repos.
- Only documentation/reference content (filtered to text files).
- Shallow copies, .git removed, obvious binary/media files pruned where possible.

**Date of mirror**: 2026-06-02
**How it was built**: Automated safe harvest by AI agent using GitHub API + controlled git operations + strict text filtering. No code from the repos was executed during the copy process.

**Recommended use**:
- Use `grep`, `rg`, or your editor to search the text.
- Feed selected .md files into note-taking / RAG tools manually if desired.
- For semantic search, the content can be indexed by local tools (e.g. Ruflo memory/embeddings) without running the original projects.

**Do not**:
- Run any "hackingtool", scanners, etc. directly from here.
- Assume the payloads are up-to-date or safe for your environment.
- Use for unauthorized access or illegal activity.

If a repo looks risky or you don't need it, delete the subdirectory.

Original repos remain the source of truth; this is a convenience snapshot.

## What's Included in This Mirror (as of 2026-06-02)

We harvested the highest-signal, mostly-documentation repos from the GitHub "hacking" topic. Focus was on curated lists, payload collections, educational courses, resource hubs, and reference data (templates, wordlists as text).

**Included (text-only safe copies):**

| Owner/Repo | Files | Size | Notes |
|------------|-------|------|-------|
| trimstray/the-book-of-secret-knowledge | 5 | 224K | Massive collection of lists, one-liners, cheatsheets, manuals. Core value in the giant README. |
| Hack-with-Github/Awesome-Hacking | 4 | 32K | Classic awesome list for hackers/pentesters. |
| swisskyrepo/PayloadsAllTheThings | 224 | 4.9M | THE reference for web app pentest payloads & bypasses. Per-vuln folders with README + Intruder wordlists. |
| swisskyrepo/InternalAllTheThings | 181 | 1.6M | Companion: Active Directory & internal network pentest cheatsheets. |
| The-Art-of-Hacking/h4cker | 512 | 15M | Omar Santos' comprehensive resources: ethical hacking, bug bounties, DFIR, AI sec, exploit dev, RE, etc. Many sub-sections. |
| vitalysim/Awesome-Hacking-Resources | 4 | 100K | Another strong curated hacking/pentest resources list. |
| carpedm20/awesome-hacking | 3 | 32K | Curated hacking tutorials/tools/resources list. |
| sundowndev/hacker-roadmap | 6 | 48K | Hacking roadmap / learning path with tools & references. |
| Hacker0x01/hacker101 | 133 | 17M | Source for the free Hacker101 web/mobile security class (lessons, resources, slides). |
| mytechnotalent/Reverse-Engineering | 19 | 248K | Free comprehensive RE tutorial (x86/x64/ARM/AVR, many hands-on). |
| projectdiscovery/nuclei-templates | 13,578 | 75M | Huge collection of Nuclei detection templates (YAML) for vuln scanning, tech detect, CVEs, DAST, etc. Extremely useful reference. |

**Total: ~14,655 text files, ~97 MB**

All .git removed, binaries / images / archives / compiled code aggressively filtered out via rsync include lists. Only markdown, plain text, JSON, YAML, and data files (wordlists, templates) from docs/payloads/resources paths were kept.

## How to Use Safely

1. `cd /Users/angus/Tools/hacking-resources-mirror`
2. Use `rg`, `grep -r`, `find`, or your favorite editor to search.
3. Example: find all XSS related → `rg -i xss --type md`
4. For wordlists: look under the relevant repo's wordlists/ or specific vuln folders.
5. To add to your own knowledge base / RAG: point your tool at specific subdirs (e.g. the Payloads* or h4cker).
6. If using Ruflo / this agent env: you (or the agent) can run `claude-flow hooks pretrain -p /Users/angus/Tools/hacking-resources-mirror --depth medium` or use the MCP `hooks_pretrain` tool on it. This will safely index the text into memory/embeddings without you touching potentially risky original repos.

## Adding More Later

If you want additional repos from the topic:
- Edit /tmp/safe-mirror-v2.sh (or a copy) and add `safe_copy_one owner repo`
- Or run individual `git clone --depth 1` + manual rsync with the same include/exclude rules shown in the script.
- Always review what you add.

This mirror is a starting point. "All of it" (8500+ repos) includes many active tool projects and some higher-risk items; we prioritized the reference material that gives the most knowledge per byte with lowest execution risk.

Stay safe.
