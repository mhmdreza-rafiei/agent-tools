# release

Bump the catalog version, generate a changelog from conventional commits since the
last tag, and create the annotated tag. Dry-run by default; pass `--apply` to write.

No external deps; Node built-ins only. Wraps `git` via child_process.

## Usage

```bash
# Dry-run: print the would-be version, changelog, and tag
node scripts/release/run.mjs

# Apply: create the tag
node scripts/release/run.mjs --apply
```

Author: mhmdreza_rafiei
