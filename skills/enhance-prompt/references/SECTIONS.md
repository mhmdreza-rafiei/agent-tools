# enhance-prompt — section reference

Every enhanced prompt is built from a fixed set of sections. Use only the
sections that have content; drop empty ones. This file documents each
section, when to emit it, and a minimal example. For full prompt examples,
see [TEMPLATE.md](TEMPLATE.md).

## Goal

What success looks like. One or two lines, outcome not activity.

```markdown
## Goal
User can reset their password via an emailed link that expires in 15 minutes.
```

## Acceptance criteria

1–3 measurable checks the implementer can self-verify against. Elicit from
the user; propose defaults if unstated and the task is non-trivial. If you
cannot make it measurable, leave it out — a vague criterion is worse than none.

```markdown
## Acceptance criteria
- `POST /auth/password-reset` returns 202 and sends an email
- The link in the email expires after 15 minutes
- Reusing an expired link returns 410
```

## Contract

APIs, request/response bodies, remove/keep/replace lists. Compact packing
(tables or one-liners). Copy forward from the user — never rebuild from memory.

```markdown
## Contract
- `POST /auth/password-reset` — `{ email }` → 202
- `POST /auth/password-reset/confirm` — `{ token, new_password }` → 200 | 410
- Keep: `POST /auth/login`, `POST /auth/logout`
- Remove: `POST /auth/change-password`
```

## Constraints

Musts (positive). One home per fact — do not repeat what is in Contract or
Do not.

```markdown
## Constraints
- Reuse the existing JWT helper for token issue/verify
- Rate-limit reset requests per email (5 / hour)
```

## Do not

Must-nots (negative). Elicit when missing (pass 3b); never invent as fact.
If the user declined to state any, emit an empty marker.

```markdown
## Do not
- No new dependencies
- Do not change the login response shape
```

## Destructive actions

Flag any destructive op the task touches so the implementer pauses to confirm
before executing. Omit if none.

```markdown
## Destructive actions
- Drops the `password_change_tokens` table — confirm with the user before running the migration
```

## Steps

Only if order matters. Omit in `compact` unless essential. Do not restate
Contract or Constraints.

```markdown
## Steps
1. Add migration: `password_reset_tokens` table
2. Implement `POST /auth/password-reset` + mailer
3. Implement `POST /auth/password-reset/confirm`
4. Remove `POST /auth/change-password` + update tests
```

## Delegation plan

Only when the task spans multiple domains (pass 10). Replaces one monolith
with an ordered agent → sub-goal list. Shared Contract / Acceptance criteria
/ Do not stay at the top; every sub-agent inherits them.

```markdown
## Delegation plan
1. `agents/backend/backend-architect` — implement the two endpoints + migration
2. `agents/qa/security-auditor` — review the reset flow for token leakage (depends on 1)
3. `agents/docs/api-documenter` — update OpenAPI spec (depends on 1)
```

## Related artifacts

Skills, rules, agents, and scripts the implementer should load. Group by
kind; mark top 1–2 skills `*(load first)*`. Skip kinds with no match.

```markdown
## Related artifacts
- `/context/architect` *(load first)* — plan the reset flow before coding
- `rule/global/git-workflow` — commit the migration as a separate commit
- `agents/qa/security-auditor` — review token handling
- `scripts/lint-artifacts` — validate any new artifacts added
```

## Before you start

Load-first enforcement. Emit only if a Related artifact is marked
`*(load first)*`.

```markdown
## Before you start
Load `/context/architect` and `rule/global/git-workflow` before step 1.
```

## Output

Deliverable format. One line.

```markdown
## Output
Backend endpoints + migration + updated tests, committed per git-workflow.
```

## Open questions

Split into **Blocking** (must be answered before work starts) and
**Non-blocking** (can be resolved mid-work). Both: "resolve from workspace —
don't guess".

```markdown
## Open questions
- Blocking: should the reset token be single-use or reusable until expiry? (resolve from product — don't guess)
- Non-blocking: which mail provider is wired in this workspace? (resolve from workspace)
```

## After you finish

Handoff summary instruction. Always include unless the user asked to omit
post-work summaries.

```markdown
## After you finish
Write a summary anyone can follow: endpoints added/removed (with shapes),
how to verify (tests + manual repro), anything still open.
```

## Usage modes (delivery, not prompt shape)

How the skill delivers the enhanced prompt -- independent of section layout:

| Mode | User says | Agent does |
|------|-----------|------------|
| `auto` | `/enhance-prompt` (default) | Enhance, then execute if task is actionable in open workspace; else emit prompt |
| `manual` | `enhance-prompt manual use` | Emit copy-ready prompt only; do not execute |
| `self` | `enhance-prompt self use` | Enhance internally, execute, reply with results only (no prompt dump unless asked) |

In `self` mode, the enhanced prompt is the agent's internal plan -- not shown in chat.
