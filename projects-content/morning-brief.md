# morning-brief

A reliable local daily briefing with no cloud and no MCP — so it still fires when everything else is down. Each morning it prints and texts a one-glance status of the machine.

## How it works

A zsh script run by launchd each morning (also runnable by hand). It assembles a short digest: AI spend today and this month, count of live free providers plus lockdown state, whether the daemons that should be running actually are, recent daemon error logs, uncommitted repos in `~/dev` touched this week, a security quick-check (firewall state, any LAN-exposed listening ports), and free disk. The whole thing prints, then goes out via `cc-text` as a notification and iMessage — failing quietly so a texting hiccup never breaks the run.

## Stack

zsh, launchd, node, git, lsof, cc-text

## Status

Live. Runs on a launchd morning timer.
