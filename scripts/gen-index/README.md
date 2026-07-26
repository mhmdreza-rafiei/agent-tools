# gen-index

Regenerate the catalog tables in `README.md` from the live tree. Keeps the README
in sync with the catalog as agents, skills, rules, and profiles are added or moved.

No external deps; Node built-ins only. Rewrites the tables between the
`<!-- catalog-start -->` and `<!-- catalog-end -->` markers in `README.md`.

## Usage

```bash
node scripts/gen-index/run.mjs
```

Author: mhmdreza_rafiei
