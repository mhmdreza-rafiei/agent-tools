# Files this skill writes

Pin GitHub Actions by commit SHA (agentry):

- `actions/checkout` → `08c6903cd8c0fde910a37f88322edcfb5dd907a8` # v5.0.0
- `actions/setup-node` → `a0853c24544627f65ddf259abe73b1d18a591444` # v5.0.0

## CI (catalog)

`on.push` / `on.pull_request` branches: `main` (add `dev` only if that branch exists).

Jobs: `node scripts/lint-artifacts/run.mjs`, `check-compat`, `validate-profiles`, `audit-catalog`, living demo check if present.

`permissions.contents: read`.

## Dependabot

`package-ecosystem: github-actions` at `/`, weekly. Add `npm` only when `package-lock.json` or `pnpm-lock.yaml` exists at that directory.

## Rulesets (source JSON in `.github/rulesets/`)

- `protect-version-tags.json` — target `tag`, include `refs/tags/v*`, rules: `deletion`, `non_fast_forward`, `update`.
- `protect-main.json` — target `branch`, include `refs/heads/main`, rules: `deletion`, `non_fast_forward`.

These JSON files do not apply themselves. `scripts/github` or `references/api.md` POSTs them via the Rulesets API.

## Release workflow

On `push.tags: v*`, `contents: write`, `gh release create` attaching the project's built asset (`releases/master.zip` in this catalog).
