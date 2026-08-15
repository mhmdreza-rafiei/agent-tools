# Roadmap

Do these in order. Each rung assumes the one above it is already true. Humans use `roadmap.pdf`.

## Rung 0 — Human loop (today)

- Git on every real project
- One standing file: `AGENTS.md` with how to install, run, and test
- Unclear product facts → ask; never invent
- Checklist before non-trivial AI work
- Human review of every merge

Stop here if they only chat with AI.

## Rung 1 — Spec-first

- Non-trivial work gets a spec (outcome, in/out, constraints, copy-pasteable checks)
- Implement against the spec; review against the spec
- Diffs small enough to read in one sitting

## Rung 2 — Context pack

- `AGENTS.md` stays short (conventions + commands)
- `context/` holds architecture, progress, decisions when the repo is touched twice
- Update context after work that changes structure or truth; mark stale claims

## Rung 3 — Skills and rules as procedures

- Extract a skill or rule when a motion repeats twice
- Trigger text = when to use, not a recap of how to code
- Install per project so repos do not inherit a random global soup

## Rung 4 — Verification loops

- Agent must run the project's test/lint commands before claiming done
- One new runnable check per non-trivial behavior

## Rung 5 — Review agents

- Second agent behind branch protection
- Mandate: scope, security, missed tests — not formatter nits
- Humans still merge

## Rung 6 — Parallel agents (only with specs)

- Split tasks that do not share files
- Isolated worktrees / branches
- Handoff file when a session gets long
- Do not run ten agents on a vague prompt

## Not yet

- Auto-merge
- Skipping permissions globally
- Generating a new architecture for every inherited repo
- Measuring success by number of agent messages
