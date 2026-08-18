# releases

Built zip of **master**, checked into the tree so a clone still has it.

This folder is **not** a GitHub Release. GitHub's Releases sidebar only shows
releases created from version tags (`v0.1.0`, …). Those are published by
`.github/workflows/github-release.yml` when a `v*` tag is pushed, and they
attach `master.zip` as the download.

| File | Use |
|------|-----|
| `master.zip` | Unzip-and-use. Root = human PDFs. `context/` = files for the AI. |

Rebuild:

```bash
node scripts/workbook/run.mjs
```

Publish a GitHub Release:

```bash
node scripts/release/run.mjs --apply --push
```

Author: mhmdreza_rafiei
