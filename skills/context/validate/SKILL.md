---
name: validate
description: Pressure-test a project against the right quality bar and the right approach for what it is trying to be — not just against its own rules. Establishes the target tier, researches how the best comparable projects are built, reasons from first principles, and reports where the project or its context falls short or uses a wrong or dated approach. Also checks that the context reflects the real current code, not stale docs. Use after /groundwork, after project setup or creation, after building a significant feature, or when a project has problems and you want an honest outside read. Runs as a report — it surfaces gaps and recommends upgrades, it does not auto-fix.
author: mhmdreza_rafiei
---

# /validate

`/review` asks an inward question: *did we follow our own rules?* `/validate` asks a harder, outward one: *are our rules, approach, and quality bar even right for what this is trying to be?*

A project can pass `/review` — perfectly consistent with its own context — and still be the wrong thing, built to the wrong bar. `/validate` looks outward (how the best comparable projects are built) and reasons from first principles, then reports the gap between where the project is and where it should be for its intended level.

## /review vs /validate

- `/review` — **inward / conformance.** Does the build match `plan.md`, `architecture.md`, `standards.md`? Run after every feature.
- `/validate` — **outward / calibration.** Are those standards and the approach actually good and high enough for this category of project? Run after `/groundwork`, after setup, at milestones, or when quality is in doubt.

## Automation mode (default)

Research and reason on your own, then produce the report. Ask the developer only for the one thing you cannot infer — the **target tier**, when `overview.md` does not make it obvious.

## Step 0 — Load reality

Read the context (`overview.md`, `architecture.md`, `standards.md`, `design-system.md`, `plan.md`, and any extra files the project added) **and** the actual current code/state. You are judging both the project and the context that describes it.

## Step 1 — Establish the target (what is this, at what tier?)

Everything is judged against this, so get it right.

- **Category** — what kind of thing is it, precisely? ("a premium ImGui overlay menu", "a production REST API", "a marketing site", "a parsing library").
- **Tier** — throwaway prototype / solid production / best-in-class (premium).

Pull both from `overview.md` (success criteria, target users). If the tier is unclear and it changes the bar, ask once: *"What's the bar here — quick prototype, solid production, or best-in-class?"* A premium target and a prototype target are judged completely differently — do not default the bar low.

## Step 2 — Study how the best in this category are built

Find the bar; do not invent it. If web search / fetch is available, research how high-quality projects **in this exact category** are actually built: architecture, conventions, the libraries the good ones reach for, the patterns that separate amateur from premium, and the common pitfalls. Gather **patterns and standards, not code to copy** — you are learning the bar, not lifting work.

If no research tools are available, reason from your own domain knowledge and **say so explicitly** so the developer can weight the findings.

State, in your own words: what "good" looks like here, what the target tier means *concretely* for this category (e.g. for a premium ImGui menu: a real theming/style system, clean state and input handling, no flicker, consistent spacing and scale, performance under load), and the tells of a low-tier version.

## Step 3 — Reason from first principles

Independently of what exists and what others do, work out what the *right* approach and structure would be for this, at this tier. This catches the case where an entire category does something dated and a better path exists.

## Step 4 — Compare reality to the bar

Hold the project + its context against Steps 2–3. Where does it fall short of its intended tier? Where is the approach wrong, dated, or aimed too low? Check the **context itself**, not just the code: if `standards.md` / `architecture.md` / `design-system.md` encode amateur or wrong patterns, the problem is upstream — the fix is to raise the context, not patch the code.

## Step 5 — Verify the context is not built on stale truth

A context generated from a messy or legacy project can encode the wrong thing — old docs read as current, abandoned files read as architecture. Cross-check the context against the **real current code**: does each major claim still hold? Flag anything that came from stale or contradictory sources and recommend `/groundwork update` where the context has drifted from reality.

## Step 6 — Report (the gap to the target)

Report, do not auto-fix — let the developer decide.

```
## Validation — [Project / Feature]

### Target
Category: [...]   ·   Tier: [prototype / production / premium]

### The bar (how the best in this category are built)
[Short, in your own words. Note whether this came from research or model knowledge.]

### Where this stands vs. the bar
[By area: meets / falls short, with severity. Be honest — do not grade on a curve.]

### Wrong or dated approaches found
[Approach-level problems, not just bugs.]

### Context health
[Does the context match the real code? Anything stale -> recommend /groundwork update.]

### Recommended upgrades
[Concrete steps to reach the target tier, and which skill to use:
 /groundwork update (raise or refresh the context) · /architect (re-plan an approach) · direct fixes.]
```

## The standard

A project that runs and follows its own rules can still be the wrong thing, built to the wrong bar. `/review` keeps you consistent with your plan. `/validate` makes sure the plan was worth being consistent with.
