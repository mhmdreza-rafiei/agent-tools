# Workflow: inherited project

Use when the project already exists. Speed comes from not regenerating a parallel architecture. Humans follow `inherited.pdf`.

## Goal

Change the system that is actually there. Leave context docs more true, not more fictional.

## Every time

### 0. Classify the session

- Read-only — no writes until asked.
- Surgical — stay inside the named surface.
- Onboarding — context and checks, not a rewrite.

### 1. Inventory before opinion

1. Root docs: README, AGENTS.md, package/pyproject/go.mod, CI
2. How to run tests and the app (trust a command you actually ran)
3. Layout: production vs tests vs generated
4. Existing agent artifacts
5. Git state

Do not clean up naming or dependencies during inventory. List offenders; ask before mass rename.

### 2. Trust code over stale docs

If README and code disagree, believe the code and mark the doc stale or ask which is truth.

### 3. Ready context, don't boil the ocean

- Add or update `AGENTS.md` with verified build/test/lint commands
- Add `context/` only if missing and they want it
- Skip a new design system, folder tree, or test framework "while we're here"

### 4. Spec the change against the existing map

- Files/modules likely touched
- Public behavior that must not change
- The exact check (existing test command + any new check)

Bug fix: find the shared function and fix once.

### 5. Migration when paths or symbols move

1. Inventory references
2. Prefer `git mv`
3. Update consumers in the same change set
4. Verify (search for old path, run tests)
5. Delete the old location last

### 6. Verification and review

- Run the commands you claimed
- Keep the diff small enough to review this session
- Do not rewrite git history unless they explicitly asked and a backup of `.git` exists

## Catalog load

- Agents: `dx/codebase-onboarder` first; then `backend/full-stack-developer` or the stack specialist; `qa/code-reviewer` before merge.
- Skills: `workflow/spec`, `context/architect`, `context/groundwork`.
- Rules: globals above plus `code/testing`.
- Profile: `fullstack`.

