# naming

Audit file and folder paths against the `files-folders-structure` rule.

Detects: non-lowercase folders, >2 folder words, non-snake_case stems, duplicate
stem tokens, format/language tokens in stems, and folder-name echo (including
glued compounds like `core/` + `coreapi_call` -> `coreapi` starts with `core`).

This is the checker script the `files-folders-structure` rule tells agents to
run before claiming paths are valid. Ships with the catalog so the rule is
self-contained.

## Usage

```bash
# Audit the current directory
python scripts/naming/check.py .

# Explain why one path fails
python scripts/naming/check.py --explain core/coreapi_call.py

# Machine-readable output
python scripts/naming/check.py . --json
```

Author: mhmdreza_rafiei
