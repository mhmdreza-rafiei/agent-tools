# Start

Every session. Humans use `start.pdf`. You follow this file after they have picked a track.

## Gates before work

1. **One-sentence outcome.** If missing or vague, ask. Do not start generating.
2. **Filled checklist** (use `checklist.md`). Blank sections are blockers:
   - `Goal` — required on all tracks
   - `Must not` — highest signal; agents expand scope without it
   - `Git` permission — ask if unknown; do not commit/push without explicit OK
3. **Stayed on one track.** Identify the workflow from the human's prompt or ask:
   - `workflow/new.md` — greenfield project
   - `workflow/inherited.md` — existing codebase
   - `workflow/research.md` — Q&A, plan, no implementation
   - `workflow/debug.md` — production incident, root cause
   - `workflow/review.md` — PR review, architecture audit

## Setup

1. Read `rules.md` (standing rules).
2. Read the workflow file you identified.
3. Load any agents, rules, or skills the workflow names (by ID, e.g. `ask-dont-guess` rule).

## After work

- Ran verification commands? Check success criteria before claiming done.
- No invented facts? Cited sources if making product claims?
- Git only if permission given. Conventional Commits. No secrets. No AI co-author trailers.
- Update context files if the work changed architecture, standards, or handoff state.

## Fast path for known teams

If the human's repo already has `AGENTS.md` or a context pack, read it first. The master pack is a default; override with project-specific rules.
