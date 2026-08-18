# Practices

Research-backed ways strong AI users get better results. Citations live in `../sources/notes.md`. This file is operational: do the practice, don't admire it.

The evidence from 2025–2026 is mixed on *speed* and harsh on *unreviewed volume*. Treat AI as a multiplier on a good loop (spec, small tasks, tests, review), not as a substitute for that loop.

## 1. Specify before generating

GitHub Spec Kit, practitioner guides (Osmani), and 2026 spec-driven writeups agree on the same failure mode: a chat prompt is not a contract. A spec is.

Minimum spec for any non-trivial change:

- **Outcome** — who it is for and what "done" looks like
- **Scope in / out** — especially what the agent must not "improve"
- **Constraints** — stack, compatibility, security, naming, "do not add a dependency"
- **Acceptance** — copy-pasteable commands or checks
- **Context pointers** — files, docs, examples (saves exploration thrash)

Do not move to implementation until acceptance checks are concrete. If you cannot write a check, the requirement is still vague.

Recommended phase order (Spec Kit and similar toolchains): constitution / standing rules → specify (what/why) → plan (how) → tasks (atomic, ordered) → implement → converge (diff the repo against the spec).

Keep **what/why** out of the plan file and **how** out of the spec file. When implementation is wrong, update the spec or the plan and re-derive tasks. Do not "fix in code" while leaving a stale spec.

## 2. Engineer context; don't paste a novel

Anthropic's 2025–2026 guidance: the prompt is a small slice of what the model sees. Standing files (`AGENTS.md` / `CLAUDE.md`), skills, memory, and tool results dominate. Frontier models follow on the order of ~150–200 standing instructions before compliance drops — keep the always-on file short.

Practices that hold up:

- **AGENTS.md (or equivalent)** for repo-wide build, test, and convention. Nested files in monorepo packages. See [agents.md](https://agents.md/).
- **Progressive disclosure.** Skills and reference files load when needed. Do not dump every runbook into the always-on file.
- **Skills are folders**, not slogans. Description = *when to trigger*, not a summary of contents (Anthropic: lessons from building Claude Code).
- **One skill, one job.** Skills that straddle many categories confuse routing.
- **Don't teach the model to code.** Encode *your* repo's gotchas, checks, and forbidden moves.
- **Context packs per task:** spec + 3–10 relevant files + the command to verify. Not "here's the whole company wiki."

For long work: structured handoff beats a 200-turn chat. Anthropic's long-running harness uses initializer + coding agent + explicit handoff artifacts; compaction alone can still produce premature wrap-up ("context anxiety") on some models.

## 3. Keep the unit of work reviewable

Faros telemetry (2025–2026) and tool comparisons (Built In, 2026) converge: AI raises PR count and PR size; review time explodes; a growing share of PRs merge with no review; incidents per PR rise. METR's July 2025 RCT found experienced OSS developers were **19% slower** with early-2025 AI on their own mature repos — while still *believing* they were faster.

Operating rules:

- One agent task = one reviewable diff (ideally one concern, non-overlapping files if parallel).
- Cap scope in the spec ("do not refactor adjacent modules").
- Prefer many small PRs over one agent dump.
- Never merge AI output you have not sampled. If you lack time to review, the task was too big.
- Human-in-the-loop at phase boundaries (spec approved, plan approved, PR approved), not after 3,000 lines.

## 4. Close the loop with evals, not vibes

Anthropic: encode the checks you already run as **verification loops** (tests, lints, custom scripts) so the agent iterates without waiting for you. Skills can chain: produce → verify → fix.

Three layers (use what you have):

1. **Deterministic** — unit/integration tests, typecheck, lint, the files-folders checker, `agentry`/CI gates.
2. **Repo probes** — after planning, check that cited paths and deps exist (Spec Kit Agents / context-grounding pattern).
3. **Human sample** — architecture, product truth, security, anything tests cannot see.

If non-trivial logic ships, leave **one runnable check** that fails when the logic breaks. Do not add a framework for a 20-line function.

## 5. Separate planner, implementer, reviewer

High-performing teams stop using one chat for "think, code, and grade yourself." Patterns that show up in Spec Kit, Claude Code subagents, and Copilot/Codex PR agents:

- **Planner** reads the repo, writes spec/plan/tasks, does not edit product code.
- **Implementer** executes tasks against the spec, runs the verification loop.
- **Reviewer** (human or a second agent with a read-only / diff mandate) checks scope creep, security, and missed acceptance.

GitHub Copilot cloud agents and similar tools can open draft PRs in ephemeral VMs **behind existing branch protection**. That is the point: the agent does not bypass CODEOWNERS.

PR-review agents are a second reader, not a merge button. Faros 2026: median PR review time up sharply *and* more PRs merging unreviewed. Automating rubber-stamps makes the incident curve worse.

## 6. Automate the boring path; keep humans on product truth

Where AI reliably pays:

- Boilerplate, tests from a spec, migrations with a map, repetitive refactors with a grep-backed inventory
- Context scaffolding (`AGENTS.md`, `context/`)
- Drafting then *scoring* against a rubric (writing, APIs, a11y)
- Installing known skill/rule packs rather than re-prompting house style every session

Where AI silently fails:

- Inventing requirements, metrics, or vendor choices
- "Improving" files you did not name
- Security-sensitive code without tests
- Public claims (stars, revenue, user counts)

Ask vs act: if the missing fact would lock architecture, vendor, or public narrative, **stop and ask**. If the repo already answers it, **do not re-ask**.

## 7. Measure the system, not the autocomplete

DORA-style metrics still matter: lead time, deployment frequency, change fail rate, MTTR. Faros: individual throughput can rise while delivery metrics stay flat because review and incidents absorb the gain.

For an individual or small team, track:

- Time from spec-approved to green checks
- Review minutes per PR and PR size
- Escaped defects / rework on AI-touched files
- How often the agent asked vs guessed

If you feel faster but rework and incidents climb, you are in the METR/Faros trap. Shrink tasks and strengthen verification before buying another model.

## 8. Default stack for any developer or company

These are defaults, not a vendor lock-in:

| Layer | Default | Why |
|-------|---------|-----|
| Standing context | `AGENTS.md` + short always-on rules | Universal across Cursor, Claude Code, Codex, Copilot |
| Task context | Spec with acceptance checks | Stops prompt-and-pray |
| Reusable procedures | Skills / rules installed per project | Progressive disclosure |
| Verification | Existing test runner + one new check per non-trivial change | Closes the loop |
| Review | Human on every merge; optional second-agent review | Incidents track unreviewed AI diffs |
| Git | Conventional Commits; no force-push to default branch | Recoverable history |

Swap tools; keep the layers.

## 9. Incident response and debug workflows

When production fails or a bug is reported:

- **Repro first.** Do not act on a second-hand report. Run the failing test or command yourself.
- **Root cause, not symptom.** Error message is often a symptom. Trace the state path back to where the bad data entered.
- **Fix shared cause once.** One guard in a shared function beats N patches in callers.
- **Write the test first.** Encode the bug as a failing test; confirm the fix makes it pass.
- **Prevent recurrence.** Add a check (test, lint, assertion) that would have caught this before production.

See `workflow/debug.md` for the full checklist.

## 10. Review and audit workflows

When reviewing a PR or architecture:

- **Read the spec first.** What was the acceptance criteria? Is the diff addressing it?
- **Check scope.** Is everything in the diff actually required by the spec? Or is there scope creep?
- **Verify tests.** Does the new code have a test? Does the test actually exercise the new behavior? (Not just "runs without error.")
- **Security boundaries.** User input validated? Secrets safe? Auth checks in place?
- **Focus on safety, not style.** Report critical issues (security, broken acceptance, missing tests), not code preferences.
- **Human decides.** You are a second reader; the human approves the merge.

See `workflow/review.md` for the full checklist.
