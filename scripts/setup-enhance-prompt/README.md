# setup-enhance-prompt

Install the enhance-prompt stack into a project or globally via agentry profiles.

## Usage

```bash
# Project, normal (manual /enhance-prompt)
node scripts/setup-enhance-prompt/run.mjs .

# Project, auto (always enhance before acting)
node scripts/setup-enhance-prompt/run.mjs . --auto

# Global install (all projects)
node scripts/setup-enhance-prompt/run.mjs ~ -g --auto -a cursor -y

# From local catalog path
node scripts/setup-enhance-prompt/run.mjs ../my-app --from G:/Projects/agent-tools --auto
```

## Flags

| Flag | Effect |
|------|--------|
| `--auto` | Use `enhance-prompt-auto` profile (always-on rule) |
| `-g, --global` | Install to home directory |
| `-a, --agent <name>` | Target agent (repeatable); default cursor |
| `-y, --yes` | Skip prompts |
| `--from <path>` | Catalog source (default: mhmdreza-rafiei/agent-tools) |

Author: mhmdreza_rafiei
