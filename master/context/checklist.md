# Checklist

Humans fill `checklist.pdf`. You treat a filled copy as the contract. Skip only for pure research — still require Goal and Must-not.

Copy this block into the prompt or into the project's `context/plan.md`. Blank lines are blockers.

```text
## Goal
- One sentence outcome:
- User / beneficiary:

## Constraints
- Must:
- Must not:
- Stack (only if already chosen):
- Secrets / private surfaces the agent must not touch:

## Context already in the repo (paths)
- Standing: AGENTS.md / README / rules:
- Spec or issue:
- Code to read first:
- Examples of "good" in this repo:

## Repo map (or "greenfield")
- Production code lives in:
- Tests live in:
- Generated / vendor dirs to skip:

## Success checks (commands, not vibes)
- [ ] <exact command>
- [ ] <exact command>

## Git
- Repo exists? yes / no (if no: stop and confirm git init)
- Allowed this session: commit / push / both / neither / unknown (ask)
- Default branch:
```

## Ready-first, in order

1. Goal — if it is not one sentence, do not generate.
2. Must not — highest-ROI section. Agents expand scope.
3. Context files — standing rules plus 3–10 files that matter.
4. Repo map — do not invent a layout they do not have.
5. Success checks — if there is no pasteable command, acceptance is still vague.
6. Git permission — unknown means ask, then do not commit.
