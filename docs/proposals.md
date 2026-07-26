# Proposals — new artifacts to grow the catalog

This file lists concrete proposals for new agents, skills, rules, and scripts
to add to the `agent-tools` catalog. Each entry targets a real gap in agent
workflows — a job an agent team currently cannot do well, or a guardrail that
would prevent common failure modes.

Every proposed artifact would carry `author: mhmdreza_rafiei` and follow the
layout in [AGENTS.md](../AGENTS.md).

## New agents (8)

| Proposed | Category | Why — the gap it fills |
|----------|----------|------------------------|
| `api-reviewer` | `qa/` | No agent currently reviews API design (versioning, naming, pagination, error shape). `code-reviewer` checks code; this checks contracts. |
| `observability-engineer` | `devops/` | `performance-engineer` finds bottlenecks but no agent sets up the logging/metrics/tracing that finds them in prod (OpenTelemetry, Prometheus, Grafana). |
| `cost-optimizer` | `devops/` | `cloud-architect` designs infra; no agent hunts waste (idle resources, oversized instances, forgotten storage) — pure FinOps. |
| `accessibility-auditor` | `qa/` | `frontend-developer` builds UI; no agent enforces WCAG/ARIA/keyboard nav. Catches a11y debt before shipping. |
| `schema-architect` | `data/` | `database-optimizer` tunes queries; no agent designs the schema in the first place (normalization, indexing strategy, migration plan). |
| `cli-engineer` | `languages/` | No agent owns CLI design (cobra/click/yargs/clap), UX of flags, help text, shell completion, distribution. |
| `realtime-engineer` | `backend/` | No agent covers WebSockets/SSE/pub-sub/event-driven systems — `backend-architect` is request/response shaped. |
| `codebase-onboarder` | `dx/` | `dx-optimizer` improves tooling; no agent walks a new contributor through the architecture so they ship their first PR faster. |

## New skills (8)

| Proposed | Category | Why — the gap it fills |
|----------|----------|------------------------|
| `/spec` | `workflow/` | `/architect` plans; nothing writes the spec/PRD that precedes planning. Catches "build the wrong thing" earlier. |
| `/estimate` | `workflow/` | No skill sizes work before commitment. Pairs with `/spec` to flag risky/large work. |
| `/triage` | `workflow/` | No skill sorts an issue/bug list by severity + root-cause guess. Saves the human the first pass. |
| `/release` | `workflow/` | No skill cuts a release (changelog gen, version bump, tag, notes). Currently ad-hoc per project. |
| `/postmortem` | `context/` | `/recover` fixes the bug; nothing writes the postmortem from the incident timeline + contributing factors. |
| `/a11y` | `audit/` | No skill runs an accessibility audit (axe, keyboard, contrast) and reports gaps. Pairs with the proposed `accessibility-auditor` agent. |
| `/cleanup` | `context/` | No skill does a focused tech-debt pass (dead code, dup helpers, stale deps). Distinct from `/review` which checks new code. |
| `/scaffold` | `workflow/` | No skill scaffolds a new feature with tests + types + docs stub in one pass. Removes boilerplate drift. |

## New rules (8)

| Proposed | Always apply | Why — the gap it fills |
|----------|--------------|------------------------|
| `code-style` | no | `files-folders-structure` covers paths; nothing covers in-code style (formatting, naming within code). Load on demand. |
| `testing` | no | No rule sets the testing bar (what must be tested, coverage floors, what counts as a unit vs integration). |
| `accessibility` | no | No rule sets a11y requirements (WCAG level, ARIA, keyboard). Pairs with `/a11y` skill + `accessibility-auditor` agent. |
| `security` | no | No rule sets security requirements (input validation at trust boundaries, secret handling, auth). Currently ad-hoc. |
| `performance` | no | No rule sets performance budgets (TBT, LCP, p95 latency). `performance-engineer` agent without a rule has no target. |
| `error-handling` | no | No rule forbids silent catches / requires typed errors / logging. Catches the "swallow and return null" pattern. |
| `api-design` | no | No rule sets API design standards (versioning, pagination, error shape, idempotency). |
| `observability` | no | No rule requires structured logs / spans / metrics on new endpoints. Without it, `observability-engineer` has nothing to wire. |

## New scripts (8)

| Proposed | Why — the gap it fills |
|----------|------------------------|
| `scripts/release/` | Automate version bump + changelog + tag. Currently manual and easy to skip. |
| `scripts/sync/` | Thin wrapper around `agentry add` for syncing this catalog into a target project with a known-good flag set. |
| `scripts/audit-catalog/` | Find missing author, orphan files, and duplicate names across kinds. Beyond what `lint-artifacts` checks. |
| `scripts/gen-index/` | Regenerate the catalog tables in `README.md` from `scripts/stats` output. Keeps README in sync with the tree. |
| `scripts/dedupe/` | Find duplicate or near-duplicate agents/skills by description similarity. Catches "two agents, one job". |
| `scripts/check-compat/` | Strict agentry-compatibility check (extensions, paths, frontmatter shape) — a CI gate before merge. |
| `scripts/onboard/` | Walk a new contributor through the repo layout + conventions + first PR. Pairs with `codebase-onboarder` agent. |
| `scripts/backup/` | Bundle the catalog into a tarball or git bundle for offline restore. Cheap insurance before big refactors. |

## Suggested order of adoption

1. **Rules first** (cheap, high leverage): `security`, `testing`, `error-handling`.
2. **One skill that compounds**: `/spec` (prevents the most expensive failure — building the wrong thing).
3. **One agent that fills the biggest hole**: `accessibility-auditor` (no current coverage, clear deliverable).
4. **One script that pays for itself**: `scripts/gen-index/` (keeps README honest as the catalog grows).
