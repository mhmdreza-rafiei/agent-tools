---
name: spec
description: Write a spec/PRD from a rough idea before any architecture or code. Elicits scope, users, acceptance criteria, out-of-scope, and open questions; writes to context/plan.md or a spec file. Automation-first; asks only when genuinely blocked. Use whenever the user wants to write a spec, PRD, requirements doc, or runs /spec, or before /architect for any non-trivial feature.
author: mhmdreza_rafiei
---

# /spec

Write the **spec** that precedes architecture and code. A feature without a
spec is where "build the wrong thing" starts. Spec does not design or
implement — it captures what and why, never how.

## When to use

Before `/architect` for any non-trivial feature; when the user says "write a
spec / PRD / requirements"; on `/spec`.

## Commands

- `/spec` — interview-then-write (default).
- `/spec <area>` — focus one area (e.g. `/spec auth`).
- `/spec update` — re-interview, then merge into the existing spec.

## Step 1 — Interview (max 3 questions per turn)

Ask only what changes the spec. Cover, as relevant:

- **Problem** — what's wrong today, for whom.
- **Users** — who benefits; primary vs secondary.
- **Scope** — what's in; what's explicitly out.
- **Acceptance criteria** — measurable checks.
- **Constraints** — must / must-not (security, perf, compat).

Cap at 3 questions per turn. If the user already gave enough, skip to writing.

## Step 2 — Write the spec

Output path (in order of preference):
1. `context/plan.md` — if a `context/` directory already exists.
2. `docs/<feature>.md` — if a `docs/` directory exists but no `context/`.
3. `spec.md` alongside the code — if neither directory exists.

Do **not** create `context/` just to satisfy this rule; use the next available option.

Use this shape — omit empty sections:

```markdown
# <feature> — spec

## Problem
<1–3 lines>

## Users
- Primary: <who>
- Secondary: <who>

## Scope
In:
- <item>
Out:
- <item>

## Acceptance criteria
- <measurable check>

## Constraints
- <must / must-not>

## Open questions
- Blocking: <must answer before build>
- Non-blocking: <resolve during build>
```

## Step 3 — Verify

- Every acceptance criterion is measurable. If not, rewrite or drop.
- Out-of-scope is explicit (prevents scope creep).
- No how / no architecture / no code — that's `/architect`.

## Constraints

- Do not design or implement — that's `/architect`.
- Do not invent users, criteria, or constraints the user didn't state; propose as suggestions instead.
- Trust code over stale docs; mark unverified claims `> NEEDS VERIFICATION`.

## Related artifacts

- `skills/context/architect` *(load first)* — runs after spec to plan the build.
- `skills/context/groundwork` — scaffolds the `context/` system this writes into.
- `rules/global/ask-dont-guess` — ask when blocked, never guess.

## After you finish

Plain-language summary: what the spec covers, what's out of scope, the
acceptance criteria, and any blocking open questions.
