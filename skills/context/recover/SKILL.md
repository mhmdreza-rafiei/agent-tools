---
name: recover
description: When something goes wrong during a build, diagnose what type of failure it is before deciding how to respond — targeted fix, hard reset, or full rethink. Uses the context system to tell a local bug apart from a polluted session or a wrong foundation, and routes a rethink back through /architect. Automation-first — infers the failure from the error and context rather than interrogating. Use when something breaks, the agent is going in circles, repeated fixes aren't working, the build feels off, or the user runs /recover. Not every problem is a bug and not every bug needs debugging.
author: mhmdreza_rafiei
---

Not every problem is a bug. Not every bug needs debugging.

When something goes wrong, the instinct is to keep prompting — describe, fix, get another broken version, repeat. The session lengthens, the context pollutes, the code gets worse. The real problem is not knowing **what type** of failure you're dealing with. Diagnose the failure first, then prescribe the response. Two steps, never swapped.

## Automation mode (default)

Infer the failure from the actual error, recent changes, and the context system rather than asking the developer to describe it. Read `context/memory/progress.md` (what state were we in?), `context/plan.md` (what was intended?), `context/architecture.md` (the boundaries). Only ask the developer when the cause is genuinely unknowable from what's in front of you.

## Step 1 — Gather (without interrogating)

What was expected vs. what happened, and how many fix attempts have already been made (attempt count signals a fresh bug vs. a session that's gone wrong). Pull this from the conversation/logs/groundwork first; ask only for what you truly can't infer.

## Step 2 — Identify the failure mode

**Mode 1 — A specific thing is broken.** Isolated (one component/function/route), the rest works, first or second attempt, the error is clear → normal bug with a findable root cause → **targeted fix (3A)**.

**Mode 2 — The session has gone wrong.** Multiple attempts made it worse, fixes patching fixes, context full of failed tries, original problem unclear → polluted session → **hard reset (3B)**.

**Mode 3 — The foundation is wrong.** Runs but is fundamentally wrong; built confidently on a misunderstood requirement/API/pattern → not a debugging problem → **rethink (3C)**.

State which mode and why in one line, then act.

## Step 3A — Targeted fix

Diagnose before touching code. Find the **root cause**, not the symptom (`Root cause: … This differs from the symptom because …`), then a precise fix that addresses it (no workaround). Apply it (in automation), or confirm first (interactive). If it doesn't work, **stop** — don't stack another fix; re-diagnose. Two wrong root-cause guesses → this is probably Mode 2 or 3.

## Step 3B — Hard reset

Say it honestly: this session is too far gone to patch; a clean start is the correct response to a polluted context, not a failure. Save what's worth keeping into `context/memory/progress.md` (via `/remember save`):

```
## Reset Note — [Feature]
### What we were building
### What went wrong
### What to avoid next time
### Starting point — what to keep, what to discard
```

Then: save the note → end this session → start fresh → `/remember restore` → re-approach with the note as context. Do not continue in the polluted session.

## Step 3C — Rethink

Name the wrong assumption (`Assumed: … Reality: …`); the current implementation can't be patched into correctness. Propose the correct approach (what it should be, what to discard, what to keep). Because the foundation changed, route the redo through `/architect` and update `context/plan.md` so the next session doesn't inherit the wrong premise. Confirm the diagnosis with the developer before rebuilding (this one is worth a pause even in automation — a wrong rethink is expensive).

## The principle

The worst move when something's broken is doing the same thing faster. Diagnose first; respond to the failure you actually have.
