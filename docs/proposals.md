# Proposals — new artifacts to grow the catalog

This file lists concrete proposals for new agents, skills, rules, and scripts
to add to the `agent-tools` catalog. Each entry targets a real gap in agent
workflows — a job an agent team currently cannot do well, or a guardrail that
would prevent common failure modes.

Every proposed artifact would carry `author: mhmdreza_rafiei` and follow the
layout in [AGENTS.md](../AGENTS.md).

**Status**: all proposals below have been **built** and shipped in the catalog.
This file is kept as a record of the gaps that were filled.

## New agents (8) — built

| Built | Category | Why — the gap it fills |
|-------|----------|------------------------|
| `qa/api-reviewer` | `qa/` | No agent previously reviewed API design (versioning, naming, pagination, error shape). `code-reviewer` checks code; this checks contracts. |
| `devops/observability-engineer` | `devops/` | `performance-engineer` finds bottlenecks but no agent set up the logging/metrics/tracing that finds them in prod (OpenTelemetry, Prometheus, Grafana). |
| `devops/cost-optimizer` | `devops/` | `cloud-architect` designs infra; no agent hunted waste (idle resources, oversized instances, forgotten storage) — pure FinOps. |
| `qa/accessibility-auditor` | `qa/` | `frontend-developer` builds UI; no agent enforced WCAG/ARIA/keyboard nav. Catches a11y debt before shipping. |
| `data/schema-architect` | `data/` | `database-optimizer` tunes queries; no agent designed the schema in the first place (normalization, indexing strategy, migration plan). |
| `languages/cli-engineer` | `languages/` | No agent owned CLI design (cobra/click/yargs/clap), UX of flags, help text, shell completion, distribution. |
| `backend/realtime-engineer` | `backend/` | No agent covered WebSockets/SSE/pub-sub/event-driven systems — `backend-architect` is request/response shaped. |
| `dx/codebase-onboarder` | `dx/` | `dx-optimizer` improves tooling; no agent walked a new contributor through the architecture so they ship their first PR faster. |

Plus one extra agent beyond the original proposals:

| Built | Category | Why — the gap it fills |
|-------|----------|------------------------|
| `ai/prompt-architect` | `ai/` | `prompt-engineer` optimizes individual prompts; no agent *architected* prompt and agent-instruction sets (sections, passes, guardrails, delegation). Pairs with `enhance-prompt` and the `prompt-quality` rule. |

## New skills (8) — built

| Built | Category | Why — the gap it fills |
|-------|----------|------------------------|
| `workflow/spec` | `workflow/` | `/architect` plans; nothing wrote the spec/PRD that precedes planning. Catches "build the wrong thing" earlier. |
| `workflow/estimate` | `workflow/` | No skill sized work before commitment. Pairs with `/spec` to flag risky/large work. |
| `workflow/triage` | `workflow/` | No skill sorted an issue/bug list by severity + root-cause guess. Saves the human the first pass. |
| `workflow/release` | `workflow/` | No skill cut a release (changelog gen, version bump, tag, notes). Currently ad-hoc per project. |
| `context/postmortem` | `context/` | `/recover` fixes the bug; nothing wrote the postmortem from the incident timeline + contributing factors. |
| `audit/a11y` | `audit/` | No skill ran an accessibility audit (axe, keyboard, contrast) and reported gaps. Pairs with `accessibility-auditor`. |
| `context/cleanup` | `context/` | No skill did a focused tech-debt pass (dead code, dup helpers, stale deps). Distinct from `/review` which checks new code. |
| `workflow/scaffold` | `workflow/` | No skill scaffolded a new feature with tests + types + docs stub in one pass. Removes boilerplate drift. |

## New rules (8) — built

| Built | Always apply | Why — the gap it fills |
|-------|--------------|------------------------|
| `code/code-style` | no | `files-folders-structure` covers paths; nothing covered in-code style (formatting, naming within code). Load on demand. |
| `code/testing` | no | No rule set the testing bar (what must be tested, coverage floors, what counts as a unit vs integration). |
| `code/accessibility` | no | No rule set a11y requirements (WCAG level, ARIA, keyboard). Pairs with `/a11y` skill + `accessibility-auditor` agent. |
| `security` | no | No rule set security requirements (input validation at trust boundaries, secret handling, auth). Currently ad-hoc. |
| `code/performance` | no | No rule set performance budgets (TBT, LCP, p95 latency). `performance-engineer` agent without a rule has no target. |
| `code/error-handling` | no | No rule forbids silent catches / requires typed errors / logging. Catches the "swallow and return null" pattern. |
| `api-design` | no | No rule set API design standards (versioning, pagination, error shape, idempotency). |
| `observability` | no | No rule requires structured logs / spans / metrics on new endpoints. Without it, `observability-engineer` has nothing to wire. |

Plus one extra rule beyond the original proposals:

| Built | Always apply | Why — the gap it fills |
|-------|--------------|------------------------|
| `prompt-quality` | no | No rule set prompt quality standards (clarity, scope, output format, must-nots). Pairs with `enhance-prompt` and `prompt-architect`. |

## New scripts (8) — built

| Built | Why — the gap it fills |
|-------|------------------------|
| `scripts/release/` | Automate version bump + changelog + tag. Currently manual and easy to skip. |
| `scripts/sync/` | Thin wrapper around `agentry add` for syncing this catalog into a target project with a known-good flag set. |
| `scripts/audit-catalog/` | Find missing author, orphan files, and duplicate names across kinds. Beyond what `lint-artifacts` checks. |
| `scripts/gen-index/` | Regenerate the catalog tables in `README.md` from `scripts/stats` output. Keeps README in sync with the tree. |
| `scripts/dedupe/` | Find duplicate or near-duplicate agents/skills by description similarity. Catches "two agents, one job". |
| `scripts/check-compat/` | Strict agentry-compatibility check (extensions, paths, frontmatter shape) — a CI gate before merge. |
| `scripts/onboard/` | Walk a new contributor through the repo layout + conventions + first PR. Pairs with `codebase-onboarder` agent. |
| `scripts/backup/` | Bundle the catalog into a tarball or git bundle for offline restore. Cheap insurance before big refactors. |

## How artifacts connect

The new artifacts are wired together so an agent workflow can chain them:

- `enhance-prompt` (skill) + `prompt-quality` (rule) + `prompt-architect` (agent) — prompt authoring chain.
- `accessibility-auditor` (agent) + `audit/a11y` (skill) + `code/accessibility` (rule) — a11y chain.
- `api-reviewer` (agent) + `api-design` (rule) — API contract chain.
- `observability-engineer` (agent) + `observability` (rule) — instrumentation chain.
- `codebase-onboarder` (agent) + `scripts/onboard/` — onboarding chain.
- `workflow/spec` -> `workflow/estimate` -> `workflow/triage` -> `workflow/release` — workflow chain.
- `context/postmortem` + `context/cleanup` extend the context suite alongside `recover` and `review`.

## Suggested order of adoption

1. **Rules first** (cheap, high leverage): `security`, `testing`, `error-handling`. — done
2. **One skill that compounds**: `/spec` (prevents the most expensive failure — building the wrong thing). — done
3. **One agent that fills the biggest hole**: `accessibility-auditor` (no current coverage, clear deliverable). — done
4. **One script that pays for itself**: `scripts/gen-index/` (keeps README honest as the catalog grows). — done

All proposals shipped. Future proposals welcome as PRs.
