# math-academy-agent

Here is the README:

```markdown
# math-academy-agent

Auto-solves Math Academy exercises using Claude Sonnet, answering at a human-like pace.

## What it does

A two-part tool: a local HTTP server that receives math questions from the browser and solves them using the Claude Sonnet API, and a Tampermonkey/Greasemonkey userscript that runs on `mathacademy.com`. The userscript reads each question's LaTeX from the page, posts it to the local server, waits for the answer, and types it in — with randomised delays to mimic realistic pacing. Handles both multiple-choice and free-response formats. Questions that require a diagram the model cannot see are flagged and left for manual entry.

## Run

**1. Set your API key:**
```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
```

**2. Start the solver server:**
```bash
./start.sh
```

**3. Install the userscript** (`agent.user.js`) via Tampermonkey or Greasemonkey, then open any Math Academy task and hit **Start** in the panel.

The server listens on `http://127.0.0.1:7676`. The userscript connects to it automatically.

## Stack

Node.js · Claude Sonnet (`claude-sonnet-4-6`) via Anthropic API · Tampermonkey userscript
```
