---
name: enhance-prompt-setup
description: Install enhance-prompt and related prompt skills, rules, and agents into a project (normal or auto/always-on). Use on /enhance-prompt-setup, enhance-prompt setup, or when wiring prompt tooling like agent-tools.
author: mhmdreza_rafiei
---

# /enhance-prompt-setup

Wire **enhance-prompt** and related catalog artifacts into a target project so agents can enhance prompts on demand or on every message (auto).

## When to use

- User says `enhance-prompt setup`, `/enhance-prompt-setup`, or "set up prompt enhancement on this project"
- Bootstrapping a repo like `agent-tools` with prompt skills + rules
- Enabling **auto** mode: enhance every user message internally before acting (no `/enhance-prompt` each time)

## Commands

| Command | Mode | Effect |
|---------|------|--------|
| `/enhance-prompt-setup` | normal | Install prompt stack; user invokes enhance manually |
| `/enhance-prompt-setup auto` | auto | Same + `enhance-prompt-auto` rule (alwaysApply) |
| `/enhance-prompt-setup global` | normal, global | Install to `~` via agentry `-g` |
| `/enhance-prompt-setup auto global` | auto, global | Auto rule + skills globally |

Script equivalent:

```bash
node scripts/setup-enhance-prompt/run.mjs .              # project, normal
node scripts/setup-enhance-prompt/run.mjs . --auto       # project, auto
node scripts/setup-enhance-prompt/run.mjs ~ -g --auto -y # global, auto
```

## What gets installed

### Normal (`enhance-prompt` profile)

| Kind | Artifact | Role |
|------|----------|------|
| skill | `enhance-prompt` | Rewrite prompts; modes auto / manual / self |
| skill | `workflow/enhance-prompt-setup` | This setup skill |
| rule | `ask-dont-guess` | Ask when unclear |
| rule | `ai-attribution` | No AI co-author trailers |
| rule | `prompt-quality` | On-demand prompt quality bar |
| agent | `ai/prompt-architect` | Architect prompt templates (optional) |

User calls `/enhance-prompt` or `enhance-prompt self use` when they want enhancement.

### Auto (`enhance-prompt-auto` profile)

Everything in **normal**, plus:

| Kind | Artifact | Role |
|------|----------|------|
| rule | `global/enhance-prompt-auto` | alwaysApply: enhance internally before every task |

Agent enhances every task message in **auto/self** mode without the user saying so.

## Procedure

1. **Confirm target** -- project path (default `.`) or global (`-g` / `~`).
2. **Confirm mode** -- `normal` or `auto` (from user command or `--auto` flag).
3. **Install via agentry** (preferred):

```bash
agentry add profile enhance-prompt mhmdreza-rafiei/agent-tools        # normal
agentry add profile enhance-prompt-auto mhmdreza-rafiei/agent-tools -y  # auto
agentry add profile enhance-prompt-auto G:/Projects/agent-tools -g -a cursor -y
```

For a **local catalog** (working on agent-tools itself):

```bash
agentry add profile enhance-prompt-auto . -p -a cursor -y
```

4. **Patch AGENTS.md** in the target project (create if missing):

```markdown
## Skills

| Skill | When |
|-------|------|
| enhance-prompt | `/enhance-prompt` or when rewriting a prompt |
| workflow/enhance-prompt-setup | `/enhance-prompt-setup` |

### Always-on (auto setup only)

When `enhance-prompt-auto` rule is installed: every task message is enhanced internally before acting (self/auto). Remove the rule to disable.
```

5. **Verify**: `agentry list skills` shows `enhance-prompt`; for auto, `agentry list rules` shows `enhance-prompt-auto`.
6. **Report**: what was installed, mode, target scope (project vs global), how to disable auto.

## Related artifacts

- `/enhance-prompt` *(load first)* -- procedure for enhancing prompts
- `scripts/setup-enhance-prompt` -- mechanical install script
- `profiles/enhance-prompt.yaml` / `profiles/enhance-prompt-auto.yaml` -- agentry bundles

## Do not

- Install `enhance-prompt-auto` without user opting into auto mode
- Force-push or rewrite git history during setup
- Invent agentry artifact ids not in the catalog
