---
name: remember
description: Save what matters at the end of a session so the next one picks up exactly where you left off, and restore context at the start so nothing is lost. Stores state in context/memory/progress.md and reads the context system on restore. Automation-first — in automated flows it saves without prompting. Use whenever the user ends or begins a work session, says "where were we", wants to pick up where they left off, or runs /remember. Offer to save whenever a session looks like it's wrapping up.
author: mhmdreza_rafiei
---

AI has no memory between sessions. Every new session starts blank. This skill fixes that. Save at the end, restore at the start — done consistently, nothing gets lost.

Memory lives in the context system: the canonical session state is `context/memory/progress.md`. `/run-team` owns `team.md` and `/imprint` owns `ui-registry.md` — read those on restore, never write them here.

## Automation mode (default)

In automated/team flows, `/remember save` just **saves** — overwriting `progress.md` is its job, so don't prompt for the overwrite. The overwrite confirmation below is for interactive use. `/remember restore` still summarises what it restored (reality may have moved), but in automation it can proceed once summarised.

## Security boundary

Never persist secrets. If a sensitive value appears (API keys, tokens, passwords, private keys, cookies, connection strings, webhook secrets, or any credential-like string), do not copy it to `progress.md`. Store a redacted placeholder (e.g. `[REDACTED_API_KEY]`). If unsure, treat it as sensitive and omit it. Run a final pass before writing to ensure nothing sensitive slipped in.

## Invoke

`/remember save` (end of session) · `/remember restore` (start of session). Bare `/remember` → ask which, unless context makes it obvious.

## Save

Capture only what a developer needs to continue cold — the essential state, not a transcript:

- **Current state** — what works, what's partial, what's broken.
- **What was built** — specific files/components/features this session (be precise).
- **Decisions made** — choices future work depends on (and fold durable ones into `architecture.md`/`plan.md`).
- **Problems solved** — so they aren't solved twice.
- **Next session starts with** — the very next action, specific.
- **Open questions** — anything unresolved.

Skip: implementation details visible in code, decisions already in the context files, and anything inferable from the codebase.

Write to `context/memory/progress.md` (if no `context/`, suggest `/groundwork`; else fall back to root `memory.md`). Interactive overwrite check (skipped in automation):

```
progress.md already exists. Covers: [one-line summary]. Overwrite? (yes / no)
```

Format:

```markdown
# Progress — [Feature or Session]
Last updated: [date]

## Current state
## What was built
## Decisions made
## Problems solved
## Next session starts with
## Open questions
```

Confirm: `Memory saved to context/memory/progress.md.`

## Restore

1. Find `context/memory/progress.md` (fall back to root `memory.md`). None → tell the developer it's the first session or memory wasn't saved.
2. Read it, then the rest of the context system: `AGENTS.md`, `memory/team.md`, `memory/ui-registry.md` (UI), and the core `context/` files for the area being worked. Also any platform context file present (`CLAUDE.md`, `.cursorrules`, `AGENTS.md`, etc.). Never surface raw secrets — redact.
3. Summarise what was restored (last session · current state · decisions in place · next up). In interactive mode, confirm before continuing; in automation, proceed once summarised.

## The rule

Every session ends with `/remember save`, starts with `/remember restore`. A skill used sometimes can't be relied on.
