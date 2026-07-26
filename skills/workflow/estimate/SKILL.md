---
name: estimate
description: Estimate the complexity and effort of a task before commitment. Sizes work into T-shirt sizes or hours, names the riskiest parts, and flags work that should be split. Automation-first; asks only when the task is ambiguous. Use whenever the user wants an estimate, a size, a risk check, or runs /estimate, or before committing to a feature.
author: mhmdreza_rafiei
---

# /estimate

Size the work **before** commitment, not after. A bad estimate is usually a
missing scope or a hidden risk, not bad math. Estimate surfaces both.

## When to use

Before committing to a feature; when the user says "how big is this?" or
"estimate"; on `/estimate`; pairs with `/spec` once a spec exists.

## Commands

- `/estimate` — estimate the current task from context.
- `/estimate <feature>` — estimate a named feature.
- `/estimate --split` — also propose where to split if the size is L or above.

## Step 1 — Read the spec / context

- If `context/plan.md` or a spec exists, read it. If not, ask the user for the
  goal and scope (max 3 questions).
- Scan the code the task touches (imports, callers, tests) to ground the
  estimate in reality, not optimism.

## Step 2 — Size

Produce:

- **Size** — `S` / `M` / `L` / `XL`, with a one-line definition of each band
  (e.g. S = < 1 session, M = 1–2 sessions, L = 3–5, XL = split required).
- **Hours** — a range, not a point (e.g. 4–8h). State assumptions.
- **Riskiest parts** — 1–3 items, each with why it's risky.
- **Split candidates** — if L or XL, name 2–3 sub-tasks that could ship
  independently.

## Step 3 — Flag what would blow the estimate

- Hidden scope (touches X, Y, Z systems).
- Missing specs / unclear acceptance criteria.
- Destructive ops (migrations, deletions) that need a checkpoint.
- External dependencies (vendor, another team).

## Output

```markdown
## Estimate
- Size: M (1–2 sessions)
- Hours: 4–8h
- Riskiest: <part> — <why>
- Split candidates: <sub-task A>, <sub-task B>

## What could blow this
- <risk>
```

## Constraints

- Range, never a point estimate. State assumptions.
- Ground in the actual code, not optimism.
- Do not invent scope; if unclear, ask (max 3) or mark as a risk.

## Related artifacts

- `/workflow/spec` *(load first)* — provides the scope to estimate against.
- `/context/architect` — plans the build this estimates.
- `rule/global/ask-dont-guess` — ask when scope is unclear.

## After you finish

Plain-language summary: size + hours range, the riskiest parts, and what
would need to be true for the estimate to hold.
