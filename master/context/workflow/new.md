# Workflow: new project

Use when the repo does not exist yet, or exists only as an empty folder. Humans follow `new.pdf`.

## Goal

Leave a cloneable, agent-ready repo: git, standing context, a spec for the first slice, and a way to prove the first slice works.

## Every time

### 0. Stop if git is missing

If this will be project work and there is no git repo, do not scaffold first. Offer `git init` (and a remote if they want). Confirm, then continue.

### 1. Name the first slice, not the company

Require four lines:

- Problem and who it is for
- First shippable slice (one user-visible outcome)
- Explicitly out of scope for slice 1
- How you will know slice 1 worked (command, URL, or demo)

If any of those four is missing, ask. Do not invent a market, stack, or architecture "to get started."

### 2. Choose boring defaults, lock only what must be locked

Ask before a choice that is expensive to undo: language, app vs library, license, cloud vendor, auth provider, monorepo vs one package.

If the user already stated the stack, use it. Do not add a second framework for taste.

### 3. Create the skeleton in this order

1. `git init` (if confirmed) and a root `.gitignore`
2. Package/manifest for the chosen stack (nothing extra)
3. Standing context: `AGENTS.md` (and `CLAUDE.md` only if that agent is in play)
4. `context/` if they use a context pack. Keep stubs short. Mark unknowns `> NEEDS VERIFICATION`.
5. One runnable path: a test or script that fails until the slice exists
6. README: how to install, run, test. No badge wall.

Do not generate five sample features. Do not add Docker, CI, and a design system on day one unless the spec requires them.

### 4. Spec the first slice

Use the spec shape in `../checklist.md`. Acceptance criteria must be commands you can run.

Then: plan (how, files, data), then tasks (ordered, parallel only when files do not overlap), then implement.

### 5. Verification loop before "done"

- Run the acceptance commands
- Run the project's lint/typecheck if they exist
- Diff against the spec: extra files and extra deps are bugs unless requested

### 6. Git at the end, not in the middle

Commit only with the user's stated preference. Conventional Commits. No secrets. No AI `Co-authored-by` trailers unless they asked.
