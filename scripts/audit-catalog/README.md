# audit-catalog

Find missing `author` frontmatter, orphan files (not referenced by any profile),
and duplicate names across kinds (agents, skills, rules). Goes beyond
`lint-artifacts`, which only checks author + extension.

No external deps; Node built-ins only.

## Usage

```bash
node scripts/audit-catalog/run.mjs
```

Exits non-zero on any finding.

Author: mhmdreza_rafiei
