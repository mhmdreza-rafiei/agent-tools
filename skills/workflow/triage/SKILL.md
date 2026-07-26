---
name: triage
description: Triage a list of bugs or issues by severity and root-cause guess before a human touches them. Assigns priority, names the likely failing system, flags duplicates and dependencies, and proposes a kill order. Automation-first; asks only when an issue is ambiguous. Use whenever the user wants to triage bugs/issues, sort a backlog, or runs /triage.
author: mhmdreza_rafiei
---

# /triage

Sort a pile of bugs/issues into a **kill order** before a human spends time
on each one. Triage does not fix — it prioritizes and points at the likely
root cause so the fixer starts close to the bug.

## When to use

When the user has a list of bugs/issues (from a tracker, a log dump, a chat
thread); on `/triage`; before a sprint planning session.

## Commands

- `/triage` — triage the issues in context (file, paste, tracker export).
- `/triage <file>` — triage a specific file.
- `/triage update` — re-triage after fixes, mark what's now resolved.

## Step 1 — Read the issues

- Parse the input (one issue per line, or a tracker export). Each issue needs
  at minimum: a title and a symptom. If severity is already set, note it but
  re-derive independently.

## Step 2 — For each issue, assign

- **Priority** — `P0` (blocks users / data loss / security) / `P1` (major,
  workaround exists) / `P2` (minor) / `P3` (cosmetic).
- **Likely system** — the subsystem the symptom points at (e.g. "auth",
  "payments", "build"). A guess, not a diagnosis — label it as such.
- **Root-cause guess** — one line, the most probable cause from the symptom.
- **Duplicates** — flag issues that look like the same root cause.
- **Dependencies** — flag issues that block or are blocked by another.

## Step 3 — Kill order

Produce an ordered list: P0s first (by user impact), then P1s (by dependency
order), then P2/P3 batched. Group duplicates so the fixer fixes once.

## Output

```markdown
## Triage

### P0
1. <issue> — likely <system>; guess: <root cause>; blocks: <ids>

### P1
2. <issue> — likely <system>; guess: <root cause>
3. <issue> — dup of #1

### P2 / P3 (batch)
- <issue>, <issue>, <issue>
```

## Constraints

- Do not fix — that's `/recover` or the implementer.
- Label root-cause guesses as guesses; never assert a diagnosis from a symptom alone.
- Trust runtime evidence (logs, repro) over issue-title wording.

## Related artifacts

- `/context/recover` *(load first)* — takes a P0 and diagnoses + fixes it.
- `/context/remember` — save triage state for the next session.
- `agents/qa/debugger` — for issues needing deep root-cause work.

## After you finish

Plain-language summary: how many issues at each priority, the kill order,
duplicates grouped, and any P0 that needs action now.
