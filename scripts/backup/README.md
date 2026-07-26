# backup

Bundle the catalog into a git bundle (default) or a tarball for offline restore.
Cheap insurance before a big refactor or a rename pass.

No external deps; Node built-ins only. Wraps `git bundle` / tar via child_process.

## Usage

```bash
# git bundle (default) -> agent-tools-<timestamp>.bundle
node scripts/backup/run.mjs

# tarball -> agent-tools-<timestamp>.tar.gz
node scripts/backup/run.mjs --tar
```

Author: mhmdreza_rafiei
