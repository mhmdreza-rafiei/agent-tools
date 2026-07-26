# validate-profiles

Structurally validate every `profiles/*.yaml` against the agentry profile
contract: required `name`, `author: mhmdreza_rafiei`, `scope` of `project`
or `global`, and `targets` / `artifacts` sections present with non-empty
`id` refs.

This is a dependency-free lint. The agentry CLI itself does full zod schema
validation when a profile is applied via `agentry add profile`.

## Usage

```bash
node scripts/validate-profiles/run.mjs
```

Author: mhmdreza_rafiei
