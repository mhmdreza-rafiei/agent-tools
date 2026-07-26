---
name: cleanup
description: Run a focused tech-debt cleanup pass — dead code, duplicate helpers, stale deps, unused exports, drift from conventions — and produce a safe, ordered removal plan. Automation-first; asks only before destructive removals. Use whenever the user wants a cleanup pass, to reduce tech debt, or runs /cleanup. Distinct from /review, which checks new code.
author: mhmdreza_rafiei
---

# /cleanup

A focused **tech-debt cleanup** pass. `/review` checks new code for quality;
`/cleanup` hunts the old debt that's already in the tree — dead code, dup
helpers, stale deps, drift from the project's own conventions — and removes
it safely.

## When to use

When the user says "clean up", "reduce tech debt", "dead code sweep"; on
`/cleanup`; before a release; after a big refactor.

## Commands

- `/cleanup` — scan the whole repo (or the touched area).
- `/cleanup <area>` — focus one area (e.g. `/cleanup src/auth`).
- `/cleanup --dry-run` — list findings, remove nothing.

## Step 1 — Scan for debt

Hunt, with grep/AST where useful:

- **Dead code** — unexported, uncalled functions/modules; unreachable branches.
- **Duplicate helpers** — same logic in 2+ places; pick the canonical one.
- **Stale deps** — declared but not imported; versions behind.
- **Unused exports** — exported but no external consumer.
- **Convention drift** — paths/naming that violate `files-folders-structure`; code style that violates the project's own pattern.

## Step 2 — For each finding, classify

- **Safe** — remove, no behavior change (dead code, unused export).
- **Risky** — remove after verifying no dynamic use (string-path imports, eval, reflection).
- **Don't** — keep, note why (compat shim, public API).

## Step 3 — Ordered removal plan

Produce an ordered list: safe removals first (one commit), risky removals
after verification (one commit each), and a "keep" list with reasons.

## Output

```markdown
## Cleanup plan

### Safe (one commit)
- remove <path> — <why safe>

### Risky (one commit each)
- remove <path> — verify: <what to check first>

### Keep
- <path> — <why kept, e.g. compat shim>
```

## Constraints

- Never remove on assumption — grep for dynamic/string-path uses first.
- One commit per risky removal so a revert is one command.
- Follow `rule/global/migration`: update references before removing old.
- Follow `rule/global/git-workflow`: ask before any destructive removal.

## Related artifacts

- `/context/review` *(load first)* — checks the cleanup's diff for quality.
- `rule/global/migration` *(load first)* — governs safe removals + ref updates.
- `rule/global/files-folders-structure` — defines the convention to de-drift to.
- `agents/dx/legacy-modernizer` — for larger modernization beyond cleanup.

## After you finish

Plain-language summary: what was found, what's safe to remove, what's risky
(needs verification), what's kept and why, and the suggested commit order.
