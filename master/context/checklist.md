# Checklist

Humans fill `checklist.pdf`. You treat a filled copy as the contract. Use for all project workflows (new, inherited, debug, review). For pure research (Q&A, planning), still require Goal and Must-not.

Copy this block into the prompt, a comment, or the project's `context/checklist.md`. **Blank lines below are blockers — ask to fill them.**

```text
## Goal
- One sentence outcome (done when):
- User / team / role benefiting:

## Constraints (non-negotiable)
- Must (required for "done"):
- Must not (no scope creep):
- Stack (only if locked; leave blank if choosing):
- Secrets / private surfaces agent must skip (URLs, keys, users):

## Context already in the repo (paths and sources)
- Standing file (AGENTS.md / README / rules / context/):
- Spec or issue (link or paste):
- Key code to read first (paths, max 5):
- Examples of "good" in this repo (paths):

## Repo map (or "greenfield")
- Production code location:
- Tests location:
- Generated / vendor / .gitignore paths:
- Default branch:

## Success checks (paste-able commands only; vibes don't count)
- [ ] <exact command that passes when done>
- [ ] <exact command that passes when done>

## Git
- Repo exists? yes / no (if no: stop and confirm git init)
- Allowed this session: commit / push / both / neither / ask (if ask, you must ask before writing)
- Who reviews merges? (name or "not yet"):
```

## Blocking order

1. **Goal** — one sentence, testable outcome. Stop if vague.
2. **Must not** — highest leverage. Agents naturally expand scope; this is the fence.
3. **Git permission** — unknown = ask, then read the permission before any write.
4. **Context files** — point to 3–10 files the agent truly needs.
5. **Repo map** — do not invent folder structure; ask if unclear.
6. **Success checks** — if no pasteable command, acceptance is still a guess. Press them to be exact.

For inherited projects, add a `Scope` field: e.g. "surgical change only, do not refactor other modules" or "onboarding: add context, do not change code."
