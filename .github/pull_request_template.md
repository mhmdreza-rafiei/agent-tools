## Summary

<!-- What changed and why. Conventional Commits title on the PR. -->

## Verify

- [ ] `node scripts/lint-artifacts/run.mjs`
- [ ] `node scripts/check-compat/run.mjs`
- [ ] `node scripts/validate-profiles/run.mjs` (if profiles changed)
- [ ] `node docs/sandbox/demo/check.js` (if sandbox or scripts that it uses changed)

## Do not

- Secrets, tokens, `.env`
- `Co-authored-by` for AI agents
- Force-push to `main`
