# gh / API calls

Replace `OWNER/REPO`. Skip the whole file when `gh auth status` fails; print these instead.

```bash
# Private vulnerability reporting (Security tab)
gh api -X PUT repos/OWNER/REPO/private-vulnerability-reporting --silent

# Discussions (community)
gh repo edit OWNER/REPO --enable-discussions

# Create a ruleset from a committed JSON file (idempotent-ish: fail if name exists)
gh api repos/OWNER/REPO/rulesets --input .github/rulesets/protect-version-tags.json
gh api repos/OWNER/REPO/rulesets --input .github/rulesets/protect-main.json

# List rulesets (to skip duplicates)
gh api repos/OWNER/REPO/rulesets
```

Do not pass `--force` to git. Creating `dev`:

```bash
git branch dev main
git push -u origin dev
```

Only if the user asked for a two-branch flow or the project already has `dev`.
