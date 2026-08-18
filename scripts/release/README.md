# release

Bump the catalog version, generate a changelog from conventional commits since the
last tag, and create an annotated git tag. Dry-run by default; pass `--apply` to
write the tag. Pass `--push` with `--apply` to push it.

GitHub's **Releases** sidebar only lists Releases created from tags. The
`releases/` folder in the tree is just the built `master.zip` — GitHub does not
treat that folder as a Release. Pushing `v*` runs `.github/workflows/github-release.yml`,
which publishes the zip as a GitHub Release asset.

## Usage

```bash
# Dry-run: print the would-be version, changelog, and tag
node scripts/release/run.mjs

# Create the local tag
node scripts/release/run.mjs --apply

# Create the tag and push it (GitHub Actions publishes the Release)
node scripts/release/run.mjs --apply --push
```

Author: mhmdreza_rafiei
