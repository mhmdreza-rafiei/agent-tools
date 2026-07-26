# agent-tools

A catalog of agent artifacts — agents, skills, rules, scripts, and profiles —
packaged to be installable by [agentry](https://github.com/mhmdreza-rafiei/agentry)
into any coding agent (Cursor, Claude Code, Codex, OpenCode, and 70+ more).

This file is context for agents (and humans) working **on** this repo. For using
the catalog, see [README.md](README.md).

## Layout

```text
agent-tools/
├── agents/      ← one .mdc file per agent, flat or one category deep
├── skills/      ← one folder per skill, with SKILL.md (+ optional references/)
├── rules/       ← one .mdc file per rule, flat or one category deep (global/, code/)
├── profiles/    ← one .yaml file per install bundle
├── scripts/     ← one folder per use-case, with README.md + runnable files
└── docs/        ← repo docs (proposals, etc.)
```

## Agentry compatibility (non-negotiable)

[agentry discovery](https://github.com/mhmdreza-rafiei/agentry/blob/main/src/artifacts/discovery.ts)
only recognizes these shapes — anything else is invisible to the installer:

| Kind | Path | Notes |
|------|------|-------|
| skill | `skills/<name>/SKILL.md` or `skills/<category>/<name>/SKILL.md` | folder per skill; `SKILL.md` is the marker |
| agent | `agents/<name>.mdc` or `agents/<category>/<name>.mdc` | **`.mdc` extension required** (not `.md`) |
| rule | `rules/<name>.mdc` or `rules/<category>/<name>.mdc` | **`.mdc` extension required** |
| profile | `profiles/<name>.yaml` or `profiles/<category>/<name>.yaml` | bundle of artifact refs |
| script | `scripts/<name>/` or `scripts/<category>/<name>/` | folder with files (README.md, run.*, etc.) |

Categories are **one level deep max**. Singletons stay flat at the kind root
(don't make a folder for one agent). Folders are lowercase, one word where
possible (per the files-folders rule).

## Frontmatter conventions

Every artifact carries an `author: mhmdreza_rafiei` field.

### Agents (`agents/<category>/<name>.mdc`)

```markdown
---
name: <name>
description: <one-line description>
tools: Read, Write, Edit, Grep, Glob, Bash
author: mhmdreza_rafiei
---
```

### Rules (`rules/<name>.mdc`)

```markdown
---
description: <one-line description>
alwaysApply: true
author: mhmdreza_rafiei
---
```

### Skills (`skills/<category>/<name>/SKILL.md`)

```markdown
---
name: <name>
description: <one-line description>
author: mhmdreza_rafiei
---
```

### Scripts (`scripts/<name>/README.md`)

Add an `Author` line at the bottom of the README:

```markdown
Author: mhmdreza_rafiei
```

### Profiles (`profiles/<name>.yaml`)

The agentry profile schema (zod-validated) strips unknown keys on parse, but
the `author` field is kept in the source file for attribution. Put it as a
real top-level field after `description`:

```yaml
name: <name>
description: <one-line description>
author: mhmdreza_rafiei
scope: project
targets:
  agents: ['cursor', 'claude-code']
artifacts:
  skills:
    - id: <category/name>
  rules:
    - id: <name>
  agents:
    - id: <category/name>
```

## Adding a new agent

1. Pick a category (existing one, or a new lowercase one-word folder). If the
   agent is the only one in its category, keep it flat at `agents/` root.
2. Create `agents/<category>/<name>.mdc` (or `agents/<name>.mdc` if flat).
3. Fill frontmatter (`name`, `description`, `tools`, `author`).
4. Body: role, expertise, capabilities, constraints.
5. Verify: `node G:/Projects/agentry/dist/cli.mjs list G:/Projects/agent-tools agents`
   shows the new agent.
6. Commit: `feat(agents): add <name>`.

## Adding a new skill

1. Pick a category (e.g. `context/`, `prompt/`). Singletons stay flat.
2. Create `skills/<category>/<name>/SKILL.md` (+ `references/` if needed).
3. Fill frontmatter (`name`, `description`, `author`).
4. Body: when to use, instructions, commands.
5. Verify with `agentry list <repo> skills`.
6. Commit: `feat(skills): add <name>`.

## Adding a new rule / profile / script

Same pattern — see Frontmatter conventions above. Profiles bundle existing
artifacts by `id`; scripts are folders with a `README.md` + runnable file.

## Categorization scheme (current)

- **agents/** — `frontend/`, `backend/`, `languages/`, `devops/`, `data/`,
  `ai/`, `qa/`, `docs/`, `dx/` + flat singletons `security-auditor`,
  `product-manager`, `agent-organizer`.
- **skills/** — `context/` (10 context-system skills), `workflow/` (spec,
  estimate, triage, release, scaffold), `audit/` (a11y) + flat `enhance-prompt`.
- **rules/** — `global/` (5 always-on workflow rules), `code/` (code-style,
  testing, error-handling, performance, accessibility) + flat domain rules
  (`security`, `api-design`, `observability`, `prompt-quality`).

## License

MIT — see [LICENSE](LICENSE). No credits/attribution section anywhere in the
catalog. Author for all artifacts: `mhmdreza_rafiei`.

## When working on this repo

- Follow the user rules (ask-dont-guess, files-folders-structure, git-workflow,
  migration, project-context) — they live in the Cursor rules config, not in
  this repo. The `rules/global/` folder is the catalog's installable copy.
- Conventional Commits only; ask before pushing.
- For renames/moves: use `git mv`, update references, verify, then remove old.
- Run `node scripts/lint-artifacts/run.mjs` and `node scripts/check-compat/run.mjs`
  before committing to catch frontmatter, extension, or compatibility drift.
