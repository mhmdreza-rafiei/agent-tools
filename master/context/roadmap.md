# Roadmap

Do these in order. Each rung assumes all above it are true. Humans use `roadmap.pdf`. This is a maturity curve, not a sprint checklist.

## Rung 0 — Human loop (baseline)

Already true when you start using this pack.

- **Git on every real project.** No git = no code writes.
- **One standing file:** `AGENTS.md` (or `CLAUDE.md`) with build, test, run, and conventions.
- **Unclear product facts → ask.** Never invent users, metrics, stack, or roadmap.
- **Checklist before non-trivial AI work.** Spec = contract, not a nice-to-have.
- **Human review of every merge.** No AI can merge. (Escalation and diffs are fine; signing off is not.)

Stop here if this team only uses AI for chat, explanations, or research.

## Rung 1 — Spec-driven

Move here when code output quality or team size starts to matter.

- **Non-trivial work (>1 file) gets a written spec:** outcome, acceptance criteria (copy-pasteable commands), constraints, scope in/out.
- **Implement against spec; review against spec.** If the diff does not address the spec, it is not done.
- **Diffs small enough to review in one sitting.** If a human cannot read it in 15 minutes, split into smaller specs.
- **Agent runs verification commands** (from the spec) before claiming done. Paste output or confirm exit code.

## Rung 2 — Context pack

Move here when the repo is touched more than twice, or when onboarding a second person.

- **`AGENTS.md` stays short:** build, test, lint, run commands + naming/style gotchas only.
- **`context/` for architecture, decisions, progress, and handoff.** Update after work that changes structure, data model, or standing practices.
- **Distinguish transient notes** (session logs, exploration) from standing context. Use a `memory/` folder or cleanup after the session.
- **Mark stale claims** with `> NEEDS VERIFICATION` instead of silently overwriting.

## Rung 3 — Skills and rules as code

Move here when you extract a reusable procedure twice in the same team.

- **Extract a skill or rule** (from catalog `G:/Projects/agent-tools/skills/` or `rules/`) when a motion or check repeats across projects.
- **Trigger text = "when to use this,"** not a code summary. Keep the description one sentence.
- **Install per project** (e.g. via agentry profile). Do not create a global random soup of skills.
- **One skill = one job.** If a skill straddles five different categories, split it.

See catalog for structure: `skills/<category>/<name>/SKILL.md`, `rules/<name>.mdc`.

## Rung 4 — Verification loops (close the loop)

Move here when a bug escapes to production or when you have tests and lints in place.

- **Agent must run the project's test/lint commands** before claiming done. This is not optional.
- **One new runnable check per non-trivial behavior** (test, lint, custom script). For a 20-line function, an assert or one small test counts. For a feature, a test that exercises the new path.
- **Encode your gotchas in checks, not in prompts.** "Run `./scripts/check-security.sh before committing" is in code; reminders in the spec are forgotten.

## Rung 5 — Second-reader agents

Move here when you have branch protection and a growing PRs/rework ratio.

- **Second agent (e.g. `code-reviewer.mdc`) behind branch protection** or before merge.
- **Mandate: scope creep, security, missed tests, and broken acceptance.** Not formatter nits, not code style, not "I would have written it differently."
- **Humans still merge.** The agent is a second pair of eyes; the human is the decider.
- **Track improvements:** did this catch bugs the implementer missed? Is rework dropping?

## Rung 6 — Parallel agents (only with specs)

Move here when your codebase is large and specs are reliable.

- **Split tasks that touch non-overlapping files.** One agent per spec, per file set.
- **Isolated git branches / worktrees.** Do not merge all branches at once.
- **Handoff file** (`context/handoff.md` or spec list) when a session gets long.
- **Do not run ten agents on a vague prompt.** The more agents, the clearer the spec must be.

## Rung 7+ (not yet)

Research frontier, not production advice.

- Auto-merge agents
- Skipping permissions ("dangerously-skip-verification")
- Generating a new architecture for every inherited repo
- Measuring productivity by agent message count (misleading per Faros 2026 telemetry)
