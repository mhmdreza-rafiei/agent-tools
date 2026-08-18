# github

Apply `.github/rulesets` and turn on private vulnerability reporting /
Discussions. Dry-run by default. Needs `gh auth login` for `--apply`.

The JSON files in `.github/rulesets/` do nothing until they are POSTed to
GitHub's Rulesets API (or created in the UI). GitHub does not read that
folder automatically.

```bash
node scripts/github/run.mjs
node scripts/github/run.mjs --apply
```

Author: mhmdreza_rafiei
