# dedupe

Find duplicate or near-duplicate agents and skills by description similarity. Catches
"two agents, one job" so the catalog stays one-artifact-per-job.

No external deps; Node built-ins only. Uses a simple token-overlap score (Jaccard);
flags pairs above the threshold (default 0.6).

## Usage

```bash
node scripts/dedupe/run.mjs              # default threshold 0.6
node scripts/dedupe/run.mjs --threshold 0.5
```

Author: mhmdreza_rafiei
