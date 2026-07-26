---
name: scaffold
description: Scaffold a new feature end-to-end in one pass — module, types, tests stub, docs stub, and registration — so the first commit isn't boilerplate drift. Automation-first; infers the project's conventions from neighbors. Use whenever the user wants to scaffold a feature, stub a module, or runs /scaffold, or before implementing a well-specified feature.
author: mhmdreza_rafiei
---

# /scaffold

Lay down the **skeleton** of a feature in one pass so the implementer starts
at the logic, not the boilerplate. Scaffold reads the project's existing
conventions and mimics them — naming, layout, test runner, doc style.

## When to use

After `/spec` and `/architect`, before the real implementation; when the
user says "scaffold <feature>" or "stub <module>"; on `/scaffold`.

## Commands

- `/scaffold <feature>` — scaffold a named feature.
- `/scaffold <feature> --type <api|cli|ui|lib>` — hint the shape.
- `/scaffold --dry-run` — print the file list without writing.

## Step 1 — Read the project's conventions

- Find a neighbor module of the same kind and copy its: file layout, naming
  (snake_case / camelCase), test runner + location, doc style, export style.
- Detect the language/framework from the manifest.
- If no clear neighbor, ask once which convention to follow.

## Step 2 — Plan the file set

A feature skeleton usually includes (omit what doesn't apply):

- **Module** — the entry file (empty or with the type signature + `TODO`).
- **Types** — a types file if the language separates them.
- **Tests stub** — one passing trivial test + one `TODO` test, so the runner
  is wired.
- **Docs stub** — a one-line module doc + a `TODO` for the real doc.
- **Registration** — wire the new module into the index/router/CLI as the
  project expects.

## Step 3 — Write + verify

- Write the files using the detected conventions.
- Run the test stub to confirm the runner sees it (one passing trivial test).
- Run the linter/typecheck if present.

## Output

- The skeleton files, committed per `git-workflow` as
  `feat(<feature>): scaffold skeleton`.
- A passing trivial test proving the runner is wired.

## Constraints

- Mimic existing conventions; do not introduce a new pattern.
- Stubs only — no real logic. The implementer fills the `TODO`s.
- One passing trivial test, not a real test suite.
- Follow `rule/files-folders-structure` for paths.

## Related artifacts

- `/workflow/spec` *(load first)* — gives the feature its scope.
- `/context/architect` — gives the feature its plan.
- `rule/global/files-folders-structure` — governs the new paths.
- `rule/global/git-workflow` — governs the scaffold commit.
- `agents/<language>/<lang>-pro` — fills the skeleton with real logic.

## After you finish

Plain-language summary: files created (paths), conventions mimicked, the
trivial test that proves the runner is wired, and what the implementer fills
next.
