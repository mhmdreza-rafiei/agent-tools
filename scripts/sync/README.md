# sync

Thin wrapper around `agentry add` for syncing this catalog into a target project
with a known-good flag set. Reads the catalog from the current directory and writes
into the target path.

No external deps; Node built-ins only. Wraps `agentry` via child_process.

## Usage

```bash
# Sync the whole catalog into ../my-app
node scripts/sync/run.mjs ../my-app

# Sync only a profile
node scripts/sync/run.mjs ../my-app --profile fullstack
```

Author: mhmdreza_rafiei
