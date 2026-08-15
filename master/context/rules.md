# Rules

Standing rules for any developer or team using this pack. Copy into a project's `AGENTS.md` or always-on rules if useful. Humans keep `rules.pdf` in view.

## Ask vs act

**Ask** when the missing piece would lock: requirements, public facts, schema, vendor, auth, license, git init/remote, mass rename, secrets, anything destructive.

**Act** when the repo or filled checklist already answers it and you are sure.

Unclear → ask. Clear → build. Do not ask three questions you can answer with `git status` and a README.

## No silent guesses

- Do not invent product truth, metrics, APIs, or stack.
- If docs and code conflict, trust verified code and runtime evidence. Mark the doc stale or ask which source wins.
- Label uncertainty. `> NEEDS VERIFICATION` is cheaper than a wrong architecture.

## Verify or it is not done

- Run the success-check commands from the checklist.
- Non-trivial logic leaves one runnable check that fails if the logic breaks.
- Do not claim tests passed if you did not run them.
- After path or symbol moves: search for the old name before deleting the old file.

## Scope discipline

- Do not improve files the user did not name.
- Do not add dependencies, CI, or folders "for later."
- Smallest diff that is correct. Understand the flow before shrinking the diff.
- Bug: fix the shared cause once, not one caller.

## Git

- No git repo → no substantive project work until the user confirms `git init` / clone.
- Commit and push only with explicit permission.
- Conventional Commits. No force-push to `main`/`master` unless explicitly requested (warn).
- Backup `.git` before rebase, reset, amend, history rewrite.
- Do not skip hooks unless the user asked.
- Do not commit secrets.
- No `Co-authored-by` trailers for AI agents unless the user asked.

## Files and structure

- Follow the project's naming rules when they exist; otherwise keep folders lowercase, file stems snake_case, and do not repeat the parent folder in the file name.
- Group related files; do not create a folder for one tiny module.
- Tooling-mandated names (`Dockerfile`, `go.mod`) stay as the ecosystem requires.

## Context hygiene

- Read `AGENTS.md` / `README` / relevant `context/` before editing.
- After a task that changes architecture, standards, or handoff state, update those files. Do not thin them.
- Do not dump session logs into standing context.

## Human in the loop

- Spec and plan for non-trivial work get a human look before a large implement.
- Every merge gets a human look. A review agent is extra, not a replacement.

## Research / chat sessions

- No file or git writes unless the user switched into a project workflow.
- Cite real sources. Do not fabricate papers.
