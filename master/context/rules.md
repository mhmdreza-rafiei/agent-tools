# Rules

Standing rules for any developer or team using this pack. These lock behavior; they are not suggestions. Humans keep `rules.pdf` in view.

These pair with **global rules** from the catalog (`rules/global/*.mdc`); load per project. See workflow files for when to install project-specific rules.

## Ask, don't guess

**Ask BEFORE** when the missing fact would lock architecture, vendor, or public claims:
- Requirements or acceptance criteria (is the spec written? Do you understand it?)
- Product/market facts (users, metrics, URLs, integrations, public APIs)
- Tech stack (language, app vs library, cloud vendor, auth provider, license)
- Secrets or private config (keys, passwords, credentials)
- Git or repo state (is git initialized? What is the remote? What is the permission?)
- Mass changes (rename, move, delete across many files; ask even if you see the pattern)
- Anything destructive (rebase, reset, squash, force-push)

**Act when** the repo or filled checklist already answers it and you are sure.

Heuristic: if you would ask the human to verify your guess before saving, **ask now** instead. Unclear → ask. Clear → build.

## No invented facts

- Do not invent product truth, metrics, APIs, stack, or roadmap.
- If docs and code conflict, trust verified code. Mark the doc stale (`> NEEDS VERIFICATION`) or ask which source is truth.
- Public claims (users, stars, revenue, integrations) must be linked to code or official sources.

## Verification (closing the loop)

- Run the success-check commands from the checklist. Paste output or confirm exit code.
- Non-trivial logic (anything beyond 20 lines or a new branch) leaves one runnable check that fails when the logic breaks (test, lint, or custom script).
- Do not claim tests passed if you did not run them in the working directory.
- After path or symbol moves: grep the whole repo for the old name before deleting the old file.
- Diffs: read every line before claiming done. Spec says no extra files? Check `git status`. Spec says no new deps? Check the manifest.

## Scope (smallest correct diff)

- Do not improve or refactor files the user did not name.
- Do not add dependencies, CI, Docker, or folders "for later" unless the spec explicitly requires them.
- Smallest diff that is correct. Understand the flow end-to-end *first*; then shrink.
- Bug fix: find and fix the shared function once — one guard there is smaller than N callers patched.

## Git (non-negotiable)

- No git repo → no substantive project work until user confirms `git init` / clone.
- Commit/push only with explicit permission. Ask if unknown.
- Conventional Commits: `<type>(<scope>): <description>` (e.g. `feat(api): add auth endpoint`).
- Never force-push to `main`/`master` without explicit request and a `.git` backup.
- Backup `.git` folder before any rebase, reset, amend, or history rewrite.
- Do not skip hooks (`--no-verify`) unless user explicitly requested.
- Do not commit `.env`, credentials, private keys, or API keys.
- No `Co-authored-by` trailers for AI agents (you are not an author in this sense).

## Files and structure (tied to catalog rules)

- Follow the project's naming rules if they exist; otherwise: folders lowercase, file stems snake_case, no parent-folder repeat in stem.
- Group related files; do not create a folder for one tiny module.
- Tooling-mandated names (`Dockerfile`, `go.mod`, `Makefile`) stay as the ecosystem requires.
- See catalog rule `files-folders-structure` for detail. Run the checker: `python %USERPROFILE%\.cursor\scripts\check_files_folders.py .`

## Context and documentation

- Read `AGENTS.md` / `README` / relevant `context/` **before** editing the codebase.
- After work that changes architecture, data model, folder structure, or standing practices, update those files. Do not thin them; deepen and correct.
- Do not dump session logs, chat history, or exploration notes into standing context (mark them in a `memory/` folder if keeping transient state).
- Context files are part of the deliverable. Include them in diffs and review.

## Human approval (always)

- Spec and plan for non-trivial work (>1 file or >20 lines) get human review before implement.
- Every PR/merge gets human review. Review agents (catalog `code-reviewer.mdc`, etc.) are a second set of eyes, not a merge button.
- Parallel agents only on non-overlapping files with a written spec and a handoff artifact.

## Research / chat sessions (read-only by default)

- No file or git writes unless the human switched into a project workflow (`workflow/new.md`, `workflow/inherited.md`, `workflow/debug.md`, or `workflow/review.md`).
- Cite real sources (docs, code, tests, named papers). Do not cite fake studies or unnamed "research."
- If the human says "build it," switch to the appropriate workflow and require a filled `checklist.md`.
