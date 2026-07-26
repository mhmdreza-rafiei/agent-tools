---
name: a11y
description: Run an accessibility audit — keyboard nav, ARIA, contrast, focus, labels, landmarks — and report gaps against WCAG 2.2 AA. Reports, does not auto-fix. Automation-first; asks only for the target surface. Use whenever the user wants an accessibility audit, a WCAG check, or runs /a11y, or after building any UI component.
author: mhmdreza_rafiei
---

# /a11y

An **accessibility audit** that reports gaps against WCAG 2.2 AA. `/a11y`
reports; it does not auto-fix — fixes touch design and semantics and belong
in a follow-up with the implementer. Pairs with the `accessibility-auditor`
agent for deeper work.

## When to use

After building any UI component; when the user says "check accessibility",
"a11y audit", "WCAG check"; on `/a11y`; before a release that ships UI.

## Commands

- `/a11y` — audit the current page/component in context.
- `/a11y <route|component>` — audit a specific surface.
- `/a11y update` — re-audit after fixes, mark what's now resolved.

## Step 1 — Detect the surface

- Read the component(s) / route(s) in scope. If unclear, ask once which surface.
- Detect the audit tools available (axe, lighthouse, keyboard) and use them;
  do not require a tool that isn't installed.

## Step 2 — Audit against these checks

- **Keyboard** — every action reachable and operable via keyboard; visible
  focus; logical tab order; no keyboard traps.
- **ARIA** — roles only where semantics are missing; `aria-label` /
  `aria-labelledby` on icon-only / ambiguous controls; live regions for
  dynamic updates.
- **Labels & names** — every input has a visible label; every interactive
  element has an accessible name.
- **Contrast** — text ≥ 4.5:1 (normal), ≥ 3:1 (large); UI components /
  graphical objects ≥ 3:1.
- **Landmarks** — `header`, `nav`, `main`, `footer`, `search` present and
  unique; one `main`.
- **Forms** — error messages associated with fields; no `placeholder`-as-
  label; required fields indicated programmatically.
- **Motion & media** — `prefers-reduced-motion` respected; captions /
  transcripts for media.

## Step 3 — Report

For each gap: WCAG criterion, the failing element, and a one-line fix
suggestion. Group by severity (blocking vs non-blocking).

## Output

```markdown
## a11y audit — <surface>

### Blocking (WCAG 2.2 AA)
- <criterion> — <element> — fix: <one line>

### Non-blocking
- <criterion> — <element> — fix: <one line>

### Passed
- Keyboard nav, landmarks, contrast (normal text)
```

## Constraints

- Report, do not auto-fix — fixes belong with the implementer.
- Cite the WCAG 2.2 AA criterion for each gap.
- Trust runtime behavior (rendered DOM) over source-only assumptions.
- Do not require a tool that isn't installed; fall back to manual checks.

## Related artifacts

- `agents/qa/accessibility-auditor` *(load first)* — owns the deeper fix work this reports to.
- `/context/imprint` — record a11y patterns to the UI registry for consistency.
- `rule/code/accessibility` — the project's a11y requirements (if installed).

## After you finish

Plain-language summary: how many blocking vs non-blocking gaps, the worst
offenders, and what the implementer should fix first.
