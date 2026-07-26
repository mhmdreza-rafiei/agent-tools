---
name: review
description: After building a feature, verify it matches what was planned, respects the system architecture and design standards, and is ready for production. Checks the build against the context system (plan.md, architecture.md, standards.md, design-system.md, ui-registry.md) and reports issues with severity so the developer decides what to fix. Runs unattended — it reports, it doesn't auto-fix. Use after building any feature or meaningful change, when the user asks "is this right / did I miss anything", or runs /review. Working and correct are not the same.
author: mhmdreza_rafiei
---

Building is not done when the code runs. It is done when the code is correct. AI moves fast, and fast means things get built that work on the surface but drift from the architecture, violate the design system, or miss edge cases. This skill catches those before they compound.

Run after every feature, before moving on. It **reports** — it does not fix. (This makes it safe to run unattended in automated flows: it never changes code, it surfaces findings.)

## Step 1 — Establish the benchmark

From the context system: `context/plan.md` (the `/architect` plan for this work) and the task given; `context/architecture.md` (boundaries, systems, rules); `context/standards.md` (naming, structure, conventions); `context/design-system.md` + `context/design/` and `context/memory/ui-registry.md` for UI. No plan on record? Ask what the feature was meant to do — you can't verify correctness without knowing what correct looks like.

## Step 2 — Review in three layers

**Layer 1 — Plan alignment.** Does it do what `plan.md` said, no more, no less? Flag anything planned-but-missing and built-but-unplanned.

**Layer 2 — System integrity** (where AI drift hides). Architecture boundaries respected (right code in the right place)? Design system used (correct tokens, no hardcoded values, matches `ui-registry.md`)? Code standards followed (naming, structure, types, error handling)? Any new pattern where an existing one should've been reused?

**Layer 3 — Production readiness.** Error handling present (not silent failure)? Empty/loading/missing-data edge cases handled? Console/terminal errors? Obvious bugs a real user would hit?

## Step 3 — Report

```
## Review — [Feature]

### Layer 1 — Plan alignment      [PASS / ISSUES]
### Layer 2 — System integrity    [PASS / ISSUES]   (cite the context file each issue breaks)
### Layer 3 — Production readiness [PASS / ISSUES]

### Summary
[X] issues across [Y] layers. [If none: ready to ship. If issues: resolve before moving on.]
```

Label each issue with severity:

- **Critical** — boundary violations that break future work; silent-failure error gaps; planned functionality missing.
- **Important** — design drift that causes inconsistency; standard violations that compound; edge cases real users hit.
- **Minor** — naming nits, missing optimizations, cosmetic issues that don't touch the design system.

## Step 4 — Let the developer decide

Stop after the report. Don't fix unless asked; don't suggest fixes unless asked. If a finding shows the *plan itself* was wrong (not just the code), say so — that's a `/architect` re-plan or `/recover` rethink, not a patch.

## The standard

The question isn't "does it work?" It's "is it correct?" A feature can work today and break the project tomorrow. Review catches the difference.
