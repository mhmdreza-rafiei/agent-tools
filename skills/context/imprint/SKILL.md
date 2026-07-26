---
name: imprint
description: After building any UI component, extract the visual patterns that matter for consistency and save them to context/memory/ui-registry.md, so every component built afterward matches what came before. Uses context/design-system.md (tokens, rules) as the standard and context/design/ as the reference. Runs automatically after a component — minimal prompting. Use after creating or changing any UI component, when the user wants components to stay visually consistent, runs /imprint, or asks to capture a component's patterns. Use /imprint audit to scan the whole codebase, find conflicts, and establish a baseline.
author: mhmdreza_rafiei
---

UI consistency doesn't happen by accident — it happens because every component is built aware of what already exists. AI builds each component in isolation and forgets what it made three sessions ago, so spacing drifts, colors vary, radii diverge, and the app looks like several people with different taste built it.

This skill fixes that: after building a component, it reads what was built, extracts the patterns that matter, and saves them so future components match. One command, every time.

## Automation mode (default)

Runs hands-off after a component: auto-detect the most recently created/changed component file and imprint it without asking, unless the target is ambiguous. The only pause-worthy case is `/imprint audit`'s baseline write (below).

## Where this fits

Three files, three roles: `context/design-system.md` = the **law** (tokens, rules); `context/design/` = the **targets** (reference screenshots/URLs); `context/memory/ui-registry.md` = the **record** (patterns actually built — this skill owns it). Check each component against the design system; if it violates a token rule, flag it rather than imprinting the violation as the norm.

## Invoke

`/imprint` (most recent component) · `/imprint [filepath]` (specific) · `/imprint audit` (whole codebase). Run `audit` first on any project whose UI wasn't tracked from the start.

## Capture (what matters for consistency)

Read the component; prefer naming the **token** from `design-system.md` over the raw value.

**Extract:** background; border (color/width/style); radius; text colors (primary/secondary/muted); text sizes/weights; spacing (padding/gap); interactive states (hover/focus/active); shadow; accent usage.
**Skip:** width/height; flex/grid layout; positioning; animation timing (unless a pattern to enforce); responsive variants (capture the base only).

Append to `context/memory/ui-registry.md` (create if missing; update an existing entry rather than duplicating):

```markdown
### [Component]
File: [path] · Last updated: [date]

| Property | Token / Class |
| --- | --- |
| Background | … |
| Border / Radius | … |
| Text primary / secondary | … |
| Spacing | … |
| Hover / Shadow / Accent | … |

**Pattern notes:** [why this token, what future components must match, allowed variations, the design/ reference it was built from]
```

Confirm in one line, and flag anything that bypassed the design system.

## How the registry is used

It's the consistency enforcer: at the start of any UI session, agents read `ui-registry.md` before writing a component (new card → check existing cards; new button → check button patterns), and `/review` checks new work against it. It grows with the project — more entries, more consistency.

## /imprint audit

1. Scan all UI components; build a picture of the patterns in use.
2. Identify **conflicts** (same intent, divergent implementation — e.g. three button paddings, two color systems) and list every hardcoded value, preferring `design-system.md` and the correct majority for the recommended baseline.
3. Present the audit and **wait** for confirmation before writing the baseline (this is the one interactive pause).
4. On confirmation, write the baseline to `ui-registry.md` (`## Baseline — [date] (via /imprint audit)`), then list every component that deviates, with what's wrong and the fix.

## The rule

Build a component, run `/imprint`, move on. A registry that's sometimes updated is unreliable. Consistency is a habit, not a feature.
