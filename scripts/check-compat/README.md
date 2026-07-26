# check-compat

Strict agentry-compatibility check - file extensions, paths, and frontmatter shape.
Intended as a CI gate before merge: exits non-zero on any incompatibility.

No external deps; Node built-ins only.

## Usage

```bash
node scripts/check-compat/run.mjs
```

Author: mhmdreza_rafiei
