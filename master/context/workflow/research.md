# Workflow: research / chat

Use when there is no implementation task. Humans follow `research.pdf`.

## Goal

Return a usable answer with sources or commands. Do not start a project, rewrite files, or commit.

## Every time

### 1. Decide the output shape

- Answer — explanation, tradeoffs, recommendation with caveats
- Plan — steps they could run later (no execution)
- Map — where something lives (read-only)
- Sources — links or doc quotes, dated

If they wanted a plan and you implement, you left this workflow.

### 2. Prefer primary sources

Current docs over memory. For productivity claims: `../sources.md`. Label uncertainty.

### 3. Do not invent their product

No fake metrics, users, roadmaps, or guessed stack. If a fact about their system is required and missing, ask.

### 4. Side effects stay at zero

Allowed: web/doc lookup, read-only search, `--help` / `git status`.

Not allowed until they say so: new files, refactors, git init, installs, pushes, PRs.

If they say "build it," switch to `new.md` or `inherited.md` and require `../checklist.md`.

### 5. Close with a next action they can copy

One of: first slice if they want it in a repo; a command to run; what this is blocked on.

## Catalog load

- Skills: `enhance-prompt` if the question will become an implementation prompt.
- Rules: `global/ask-dont-guess`, `prompt-quality`.
- Do not load implementer agents until they switch to `new.md` or `inherited.md`.

