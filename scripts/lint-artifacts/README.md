# lint-artifacts

Validate that every agent, rule, and skill in the catalog has the required
`author: mhmdreza_rafiei` frontmatter field and the correct file extension
(`.mdc` for agents/rules, `SKILL.md` for skills).

Exits non-zero on any violation. Run before committing new or renamed artifacts.

## Usage

```bash
node scripts/lint-artifacts/run.mjs
```

Author: mhmdreza_rafiei
