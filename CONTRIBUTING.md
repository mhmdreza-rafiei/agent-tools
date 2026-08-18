# Contributing

This is an [agentry](https://github.com/mhmdreza-rafiei/agentry) catalog. Read **AGENTS.md** before adding files — discovery only sees the shapes listed there.

## Checks (run from repo root)

```bash
node scripts/lint-artifacts/run.mjs
node scripts/check-compat/run.mjs
node scripts/validate-profiles/run.mjs
node scripts/audit-catalog/run.mjs
node docs/sandbox/demo/check.js
```

CI runs the same set on `main` and on pull requests.

## Commits

Conventional Commits. Do not add `Co-authored-by` trailers for AI agents. Do not commit secrets.

## Artifacts

Every agent, skill, rule, and profile needs `author: mhmdreza_rafiei` (see AGENTS.md). New skills live at `skills/<category>/<name>/SKILL.md`. Agents and rules use `.mdc`.
