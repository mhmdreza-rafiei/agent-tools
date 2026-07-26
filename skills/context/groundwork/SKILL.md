---
name: groundwork
description: Scaffold and continuously improve a project's shared context system — a context/ folder plus AGENTS.md, CLAUDE.md, and README.md — so AI agents build within a defined, accurate, modern structure instead of improvising. Self-improving; every run and every use makes the context more detailed and more true. Automation-first; infers from the project and proceeds. Use whenever the user wants to set up project context, a context folder, an AGENTS.md/CLAUDE.md/README, an architecture or standards baseline, or runs /groundwork. Also use to refresh or deepen context on an existing or messy project.
author: mhmdreza_rafiei
---

# /groundwork

Build and continuously improve the **shared context system** every other skill reads from and writes to — the single source of truth that keeps stateless agents consistent. Groundwork does not just create the context once: **every time it runs, and every time the context is used, the context should get more detailed, more accurate, and better structured.**

## Self-improving context (core principle)

The context is a living thing, not a one-time scaffold.

- On first run, capture the most accurate, specific picture you can.
- On every `/groundwork update` — and whenever an agent works with the context — **deepen and sharpen it**: add detail learned since, correct anything that drifted, tighten vague sections, fill `> TODO:` markers, and improve structure and wording.
- An update must never make the context thinner or vaguer than before. "Better" means more *true* and more *useful*, not more words. Cut filler; add verified specifics.

## Automation-first

Infer from the project and proceed. State assumptions in one short line as you go. Ask only when genuinely blocked, or before something destructive (overwriting a human-edited context). Never interrogate.

## Verify before you encode (trust code over docs)

Treat docs, READMEs, comments, and old files as claims, not truth — they are often stale or abandoned. Verify against what the code actually does: where a doc and the code disagree, trust the code and note the doc as stale. Watch for stale signals (old timestamps, references to removed files/APIs, deps named in docs but missing from the manifest). When you cannot confirm something, mark it `> NEEDS VERIFICATION` rather than asserting it. A messy or legacy project is exactly where blind scanning produces a wrong context — be slower and more skeptical there.

## When to use

Starting or formalizing a project agents will work on; refreshing or deepening context on an existing or messy project; whenever the user wants AGENTS.md / CLAUDE.md / README or an architecture baseline; or on `/groundwork`.

## Commands

- `/groundwork` — create the system.
- `/groundwork update` — re-scan, then **merge and improve** (deepen, correct, tidy).
- `/groundwork [area]` — focus one part (e.g. `/groundwork design`).

## Step 1 — Detect (source, type, platform)

- **Source** — scan the codebase if present; otherwise build from the brief/goal.
- **Project type** — web app, marketing site, API/service, library, CLI, mobile, monorepo, game/native, etc. This drives which files exist and how sections are named. Detect UI presence → governs design files.
- **Agent platform** — detect, don't assume: `CLAUDE.md`/`.claude/` → Claude Code; `.cursor*` → Cursor; `AGENTS.md` → Codex/other; `.windsurfrules` → Windsurf; `.clinerules` → Cline. If none, default to AGENTS.md and add CLAUDE.md when the user uses Claude.

## Style rules for everything you generate (clean, structured, modern)

Apply these to every file — context files and root files alike.

- **Section names:** start with a capital, the rest lowercase. `Rules`, `Relations`, `Structure`, `References`, `Build`. Multi-word sections use sentence case: `When to read`. Never all-caps (`RULES`) and never all-lowercase (`rules`).
- **Every file opens the same way** — a setext title (text underlined with dashes), then a short description, then the body:

  ```
  Title
  -----------------
  Short, clean description of what this file is.
  ```

- Clean, scannable, modern. Real specifics only — no filler, no boilerplate that could apply to any project.

## Step 2 — The context folder

Create `context/` at the project root. The default file set:

```
context\
   README.md          overview.md        architecture.md
   standards.md       plan.md            libraries.md
   design-system.md   design\            memory\ (progress.md, ui-registry.md)
```

**Scale the file set to the project.** Defaults fit most projects. For large/complex/unique projects, add the files the project actually needs — create only what applies: `domain.md`, `data.md`, `api.md`, `integrations.md`, `security.md`, `deployment.md`, `testing.md`, or per-package context in a monorepo. For tiny projects, drop defaults that add nothing. Decide the file set from what the project **is**.

Design files (`design-system.md`, `design/`) and `memory/ui-registry.md` are for UI projects only.

## Step 3 — Context files

Every context file follows this shape:

```
Title
-----------------
Description about what this file holds.

## <Its sections>
...

## Rules
Context-specific rules for this area.

## Relations
- design-registry.md [ Memory ] — what it relates to and why
- standards.md [ Context ] — ...
```

- **Detailed and true.** Ground every section in something you verified; name the real files, libraries, routes, and rules of *this* project. Drop or `> TODO:` anything you cannot confirm.
- **Adaptive sections.** The per-file default sections are a starting point — keep what fits, drop what doesn't, rename to the project's vocabulary (e.g. architecture's "Systems" → "Pages / Sections / Components" for a website, "Modules / Public API" for a library), and add what the project needs.
- **Two defaults on every file:** `Rules` (specific to that context) and `Relations` (always last — links the related context and memory files, each tagged by location, e.g. `[ Context ]`, `[ Memory ]`, with a short reason). Relations are what let an agent follow the thread between files.

Default starting sections per file: overview (About · Problem · Does · Does not · User flow · Target users · Success criteria); architecture (Stack · Folder structure · Systems* · Data flow · Rules); standards (Engineering mindset · Files and folders · Code style · Testing); plan (Core principles · What to build · Setup · Milestones · Confirmed plans); libraries (per library: for / not for / how); design-system (Tokens · Rules). Add `Rules` + `Relations` to each.

## Step 4 — AGENTS.md

The agent instruction manual. It opens with the project title + a fast, clean description, then these sections. **AGENTS.md is the single home for References, Build, and Graphify — never duplicate those anywhere else.**

```
Project Title
---------------
Fast, simple, clean description of what this project is.
```

### Context
Show the context folder as a **tree**, and after each folder/file give a one-line description and a `When to read`:

~~~
## Context

```
context\
   README.md         — entry point + how this folder works.   When to read: first, once.
   overview.md       — what the project is and is not.         When to read: scoping work.
   architecture.md   — systems, boundaries, rules.             When to read: before any code.
   standards.md      — how code is written here.               When to read: before writing.
   plan.md           — what to build, setup, roadmap.          When to read: before a feature.
   libraries.md      — deps and how to use them.               When to read: using a dependency.
   design-system.md  — tokens and design rules.                When to read: any UI work.
   design\
      README.md      — visual references to rebuild from.      When to read: rebuilding a screen.
   memory\
      progress.md    — current state + handoff.                When to read: session start/end.
      ui-registry.md — built component patterns.               When to read: before building UI.
```
~~~

### Rules you must always follow!
Numbered, `N. Rule — description`. Keep the few that always apply; the full list lives in `architecture.md`.

~~~
## Rules you must always follow!

1. Read context/ before building — start with overview.md and architecture.md.
2. Respect the boundaries in architecture.md; do not cross system lines.
3. Use design tokens — no hardcoded values. (full list → context/architecture.md)
~~~

### Skills
The skills available on this project, in workflow order. Devs and agents use these — list the ones actually installed, keep the order, and document them only here.

~~~
## Skills

1. `/groundwork` — create and continuously improve this context system. When to use: setting up a project, or refreshing/deepening context.
2. `/run-team` — start, resume, or clear an agent team from saved state. When to use: working with multiple agents on the project.
3. `/architect` — think through a change and write a plan into plan.md. When to use: before building any feature or refactor.
4. `/review` — check a build against the context (plan, architecture, standards). When to use: after building a feature.
5. `/recover` — diagnose a failure (targeted fix / hard reset / rethink). When to use: when something breaks or the build feels off.
6. `/remember` — save and restore session state in memory/progress.md. When to use: at the end and start of every session.
7. `/imprint` — record UI component patterns into memory/ui-registry.md. When to use: after building any UI component.
8. `/validate` — pressure-test the project against the right quality bar. When to use: after groundwork or a milestone.
~~~
### References
The single home for external references and connectors. Include the UI/block list only for UI projects.

~~~
## References

- **Context7 Connector** — library/docs lookup.
- **UI / block references** (design only; implement with this stack as reference):
  - [MVPBlocks](https://blocks.mvp-subha.me/)
  - [Skiper UI](https://skiper-ui.com/)
  - [Origin UI](https://www.originui-vue.com/)
  - [Uiverse](https://uiverse.io/)
~~~

### Build
The exact command(s) to build/run, derived from the project's real toolchain, in a fenced block. This is the single home for build commands — keep them out of README and elsewhere. Use the project's actual command (`npm run build`, `cargo build`, etc.). Example for a C++/CMake project:

~~~
## Build

```powershell
$vcvars = "C:\Program Files\Microsoft Visual Studio\18\Community\VC\Auxiliary\Build\vcvars64.bat"
$cmd = "cd /d `"G:\Projects\aura\new-menu\menu`" && cmake --build `"G:\Projects\aura\build\new-menu`""
cmd /c "`"$vcvars`" && $cmd"
```
~~~

### Graphify (only if the project uses Graphify)
Include this section only when the project uses Graphify:

~~~
## Graphify (Only if project uses Graphify)

Project knowledge graph lives in `graphify-out/`. Run `/graphify` to rebuild it.

- Read `graphify-out/GRAPH_REPORT.md` before broad codebase exploration.
- Rebuild after creating, deleting, renaming, or significantly changing files.
- Graphify is the primary structure map — do not re-read files already summarized there.
~~~

**Single source of truth:** the Skills list, References, Build, and Graphify live only in AGENTS.md. Do not repeat them in README, CLAUDE.md, or any context file.

## Step 5 — CLAUDE.md (Claude Code only)

Imports AGENTS.md and README, then a custom area for the user's standing instructions. Keep it thin — its only unique content is the custom rules area. If a CLAUDE.md already exists, preserve its custom area.

```
@AGENTS.md
@README.md

----------------------------

## Always follow

Custom data, rules, or instructions the AI must always follow on this project.
> Add project-specific standing instructions here.
```

## Step 6 — README.md (the product explainer)

A professional product README for GitHub / users / developers / AI agents. It contains **only** project identity and how to run — nothing pulled from AGENTS.md or CLAUDE.md (no build command block, no Context section, no rules). Add a section beyond these only if the project truly needs it.

```
Project Name
-------------------
Clean product description — what it is and what it does.

Version: x.y.z
Latest update: YYYY-MM-DD

## Stack
- ...

## Library
- ...

## Running
Brief, user-facing run steps (e.g. install + start). The exact/agent build
command lives in AGENTS.md → Build — do not duplicate it here.
```

## Idempotency and improvement

On `/groundwork update` or when files already exist, **merge and improve** — preserve human edits, add new reality additively, deepen and tidy, and never clobber framework-shipped files (a starter's AGENTS.md/CLAUDE.md is preserved and extended). After building or updating, suggest `/validate` to pressure-test the result against the right quality bar.
