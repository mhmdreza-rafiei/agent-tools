<div align="center">

# Agent-tools

**A catalog of agent artifacts — agents, skills, rules, scripts, and profiles —
installable into any coding agent via [agentry](https://github.com/mhmdreza-rafiei/agentry).**

Works with Cursor, Claude Code, Codex, OpenCode, and 70+ more.

[![license](https://img.shields.io/badge/license-MIT-38bdf8?style=flat)](LICENSE)
[![stars](https://img.shields.io/github/stars/mhmdreza-rafiei/agent-tools?style=social)](https://github.com/mhmdreza-rafiei/agent-tools)
[![agentry](https://img.shields.io/badge/agentry-compatible-38bdf8?style=flat)](https://github.com/mhmdreza-rafiei/agentry)
[![agents](https://img.shields.io/badge/agents-46-38bdf8?style=flat)](agents)
[![skills](https://img.shields.io/badge/skills-18-38bdf8?style=flat)](skills)
[![rules](https://img.shields.io/badge/rules-18-38bdf8?style=flat)](rules)
[![profiles](https://img.shields.io/badge/profiles-11-38bdf8?style=flat)](profiles)

</div>

## Install

```bash
npm install -g @mhmdreza-rafiei/agentry
```

## Quick start

```bash
# Install the entire catalog
agentry add profile mhmdreza-rafiei/agent-tools fullstack --all

# Install by kind
agentry add skills  mhmdreza-rafiei/agent-tools --all
agentry add agents  mhmdreza-rafiei/agent-tools --all
agentry add rules   mhmdreza-rafiei/agent-tools --all
agentry add scripts mhmdreza-rafiei/agent-tools --all
agentry add profile mhmdreza-rafiei/agent-tools fullstack
```

## What's in the catalog

**107 artifacts** — 46 agents, 18 skills, 18 rules, 11 profiles, 14 scripts.
Every artifact carries `author: mhmdreza_rafiei` in its frontmatter.

### Agents (46)

| Category | Agent | Use for |
|----------|-------|---------|
| `frontend/` | `frontend-developer` | React UI, component architecture, accessibility |
| `frontend/` | `ui-designer` | Visual design, design systems, interface aesthetics |
| `frontend/` | `ux-designer` | Usability, user research, interaction design |
| `frontend/` | `react-pro` | Advanced React: hooks, context, performance |
| `frontend/` | `nextjs-pro` | Next.js SSR/SSG, API routes, SEO |
| `backend/` | `backend-architect` | REST APIs, microservices, database schemas |
| `backend/` | `full-stack-developer` | End-to-end web apps, frontend + backend |
| `backend/` | `graphql-architect` | GraphQL schemas, resolvers, federation |
| `backend/` | `realtime-engineer` | WebSockets, SSE, pub/sub, event-driven systems |
| `languages/` | `python-pro` | Django, FastAPI, async Python, data processing |
| `languages/` | `golang-pro` | Concurrent Go, microservices, CLI tools |
| `languages/` | `typescript-pro` | Type-safe TS, advanced types, scalable architecture |
| `languages/` | `mobile-developer` | React Native / Flutter, native integrations |
| `languages/` | `electron-pro` | Cross-platform desktop apps, IPC, native integration |
| `languages/` | `cli-engineer` | CLI design: flags, help text, completion, distribution |
| `devops/` | `cloud-architect` | AWS/Azure/GCP, cost optimization, cloud-native |
| `devops/` | `deployment-engineer` | CI/CD, Docker, Kubernetes, infra automation |
| `devops/` | `performance-engineer` | Bottleneck analysis, caching, perf monitoring |
| `devops/` | `observability-engineer` | OpenTelemetry, Prometheus, Grafana, SLOs |
| `devops/` | `cost-optimizer` | FinOps: idle resources, right-sizing, reservation strategy |
| `devops/` | `devops-incident-responder` | Log analysis, deployment troubleshooting |
| `devops/` | `incident-responder` | Critical outages, crisis management, postmortems |
| `data/` | `data-engineer` | ETL, data warehouses, streaming, Spark/Airflow/Kafka |
| `data/` | `data-scientist` | SQL, BigQuery, statistical analysis, BI |
| `data/` | `database-optimizer` | Query optimization, indexing, schema design |
| `data/` | `postgres-pro` | PostgreSQL advanced queries, tuning, pglite |
| `data/` | `schema-architect` | Schema design, normalization, indexing strategy, migrations |
| `ai/` | `ai-engineer` | RAG, prompt pipelines, AI API integration |
| `ai/` | `ml-engineer` | ML pipelines, model serving, production ML |
| `ai/` | `prompt-engineer` | LLM optimization, prompt engineering |
| `ai/` | `prompt-architect` | Prompt and agent-instruction architecture, sections, passes |
| `qa/` | `code-reviewer` | Code review: best practices, security, maintainability |
| `qa/` | `architect-review` | Architectural consistency, pattern compliance |
| `qa/` | `api-reviewer` | API contract review: versioning, pagination, error shape |
| `qa/` | `accessibility-auditor` | WCAG, ARIA, keyboard nav, contrast audits |
| `qa/` | `debugger` | Error analysis, root cause, test failure investigation |
| `qa/` | `qa-expert` | Testing strategies, quality processes |
| `qa/` | `test-automator` | Unit/integration/E2E test suites, automation infra |
| `docs/` | `api-documenter` | OpenAPI/Swagger, SDK guides, API reference |
| `docs/` | `documentation-expert` | User manuals, system docs, knowledge bases |
| `dx/` | `dx-optimizer` | Tooling, build systems, dev workflows |
| `dx/` | `legacy-modernizer` | Legacy refactors, framework migrations |
| `dx/` | `codebase-onboarder` | Walk new contributors through the architecture |
| (flat) | `security-auditor` | Vulnerability assessments, OWASP, pen testing |
| (flat) | `product-manager` | Roadmaps, market analysis, business alignment |
| (flat) | `agent-organizer` | Multi-agent team assembly, delegation strategy |

### Skills (17)

| Category | Skill | Use for |
|----------|-------|---------|
| `context/` | `groundwork` | Scaffold + maintain the `context/` system + AGENTS.md |
| `context/` | `architect` | Senior-engineer thinking pass -> `context/plan.md` |
| `context/` | `review` | Three-layer check (plan/system/production) |
| `context/` | `validate` | Quality-bar check against comparable projects |
| `context/` | `remember` | Save/restore session state to `context/memory/progress.md` |
| `context/` | `recover` | Diagnose failure type -> targeted fix / reset / rethink |
| `context/` | `imprint` | Record UI patterns to `context/memory/ui-registry.md` |
| `context/` | `run-team` | Start / resume / clear an agent team |
| `context/` | `postmortem` | Write a postmortem from an incident timeline + factors |
| `context/` | `cleanup` | Focused tech-debt pass: dead code, dup helpers, stale deps |
| `workflow/` | `spec` | Write the spec/PRD that precedes planning |
| `workflow/` | `estimate` | Size work before commitment; flag risky/large work |
| `workflow/` | `triage` | Sort an issue/bug list by severity + root-cause guess |
| `workflow/` | `release` | Cut a release: changelog gen, version bump, tag, notes |
| `workflow/` | `scaffold` | Scaffold a new feature with tests + types + docs stub |
| `audit/` | `a11y` | Accessibility audit: axe, keyboard, contrast, motion |
| (flat) | `enhance-prompt` | Rewrite vague chat into precise, portable agent prompts |

### Rules (17)

| Rule | Always apply | Use for |
|------|--------------|---------|
| `global/ask-dont-guess` | yes | Ask when unclear; never guess requirements |
| `global/files-folders-structure` | yes | Folder/file naming and grouping conventions |
| `global/git-workflow` | yes | Conventional Commits, backups, commit/push permission |
| `global/migration` | yes | Safe refactors: moves, renames, splits, ref updates |
| `global/project-context` | yes | Read and update project context after every task |
| `global/caveman` | yes | Terse responses with full technical substance |
| `global/ponytail` | yes | Lazy senior dev mode: simplest solution that works |
| `global/ai-attribution` | yes | AI git co-authorship: explain, prevent, remove safely |
| `code/code-style` | no | In-code style: formatting, naming, structure |
| `code/testing` | no | Testing bar: what must be tested, coverage floors |
| `code/error-handling` | no | Forbid silent catches; require typed errors + logging |
| `code/performance` | no | Performance budgets: TBT, LCP, p95 latency |
| `code/accessibility` | no | A11y requirements: WCAG level, ARIA, keyboard |
| `security` | no | Security: input validation, secret handling, auth |
| `api-design` | no | API design standards: versioning, pagination, error shape |
| `observability` | no | Structured logs / spans / metrics on new endpoints |
| `prompt-quality` | no | Prompt quality: clarity, scope, output format, must-nots |

### Profiles (9)

| Profile | Bundles | One-line |
|---------|---------|----------|
| `starter` | 1 skill + 2 rules | Minimal honest-agent pack |
| `fullstack` | 6 agents + 2 skills + 8 rules | Full-stack web dev team + API/a11y reviewers |
| `frontend` | 6 agents + 3 skills + 5 rules | Frontend / UI / UX team + a11y auditor |
| `backend` | 9 agents + 2 skills + 7 rules | Backend + realtime + schema + API/security rules |
| `ai` | 4 agents + 3 skills + 3 rules | AI/ML + prompt architecture team |
| `devops` | 7 agents + 3 skills + 4 rules | DevOps + observability + cost + postmortem |
| `security` | 4 agents + 3 rules | Security + API review team |
| `qa` | 7 agents + 2 skills + 4 rules | Full QA team: review, API, a11y, test automation |
| `context` | 13 skills + 2 rules | The full context-system + workflow suite |

### Scripts (12)

| Script | Use for |
|--------|---------|
| `naming` | Audit file/folder paths against the files-folders-structure rule |
| `lint-artifacts` | Validate `author` frontmatter + correct extensions |
| `validate-profiles` | Structural lint of `profiles/*.yaml` |
| `stats` | Print the full catalog inventory |
| `audit-catalog` | Find missing author, orphan files, duplicate names |
| `check-compat` | Strict agentry-compatibility gate (CI) |
| `dedupe` | Find near-duplicate agents/skills by description |
| `gen-index` | Regenerate README catalog tables from the live tree |
| `release` | Bump version + generate changelog + tag |
| `sync` | Thin wrapper around `agentry add` for installing the catalog |
| `onboard` | Print a contributor onboarding guide |
| `backup` | Bundle the catalog into a git bundle or tarball |

## Artifact layouts

This repo follows the [agentry](https://github.com/mhmdreza-rafiei/agentry) source layout:

```text
agent-tools/
├── agents/                     ← one .mdc file per agent
│   ├── <category>/<name>.mdc   ← categorized (one level deep)
│   └── <name>.mdc              ← singletons stay flat
├── skills/                      ← one folder per skill, with SKILL.md
│   ├── <category>/<name>/SKILL.md
│   └── <name>/SKILL.md
├── rules/                       ← one .mdc file per rule
│   ├── <category>/<name>.mdc    ← categorized (global/, code/)
│   └── <name>.mdc               ← domain rules stay flat
├── profiles/                   ← one .yaml file per install bundle
│   └── <name>.yaml
├── scripts/                    ← one folder per use-case
│   └── <name>/{README.md, run.mjs}
├── docs/                       ← repo docs
├── master/                     ← default pack: PDFs for humans, context/ for AI
└── releases/                   ← master.zip for unzip-and-use
```

Every agent, rule, and skill frontmatter includes `author: mhmdreza_rafiei`.
Profiles carry `author: mhmdreza_rafiei` as a top-level field (the agentry
zod schema strips unknown keys on parse, but the field stays in source for
attribution).

## Compatibility

This catalog is built for [agentry](https://github.com/mhmdreza-rafiei/agentry),
which installs into Cursor, Claude Code, Codex, OpenCode, Gemini CLI, Windsurf,
and 70+ more. Universal providers share `.agents/skills/`; others get a
symlink or copy (e.g. Claude Code -> `.claude/skills`).

Discovery rules (see [agentry discovery.ts](https://github.com/mhmdreza-rafiei/agentry/blob/main/src/artifacts/discovery.ts)):

- `skills/<name>/SKILL.md` or `skills/<category>/<name>/SKILL.md`
- `agents/<name>.mdc` or `agents/<category>/<name>.mdc` (`.mdc` required)
- `rules/<name>.mdc` or `rules/<category>/<name>.mdc` (`.mdc` required)
- `profiles/<name>.yaml` or `profiles/<category>/<name>.yaml`
- `scripts/<name>/` or `scripts/<category>/<name>/`

## Local scripts

The `scripts/` folder contains dependency-free scripts for maintaining
the catalog:

```bash
python scripts/naming/check.py .             # audit file/folder naming
node scripts/lint-artifacts/run.mjs      # check author + extensions
node scripts/validate-profiles/run.mjs   # lint profiles/*.yaml
node scripts/check-compat/run.mjs        # strict agentry-compat gate
node scripts/audit-catalog/run.mjs       # find missing author / dup names
node scripts/dedupe/run.mjs              # find near-duplicate descriptions
node scripts/gen-index/run.mjs           # regen README catalog tables
node scripts/stats/run.mjs               # print catalog inventory
node scripts/release/run.mjs             # bump version + changelog + tag
node scripts/sync/run.mjs ../my-app      # install catalog into a target
node scripts/onboard/run.mjs             # print contributor onboarding
node scripts/backup/run.mjs              # bundle the catalog for restore
node scripts/workbook/run.mjs            # human PDFs + pack master.zip
```

## Master (default pack, not an artifact)

`master/` is a default operating pack for any person or team. It is **not** an agentry skill, agent, rule, or profile.

- **Root:** short PDFs you open to stay on track (`start`, `checklist`, `roadmap`, `new`, `inherited`, `research`, `debug`, `review`, `rules`).
- **`context/`:** markdown for the AI (`AGENTS.md`, workflows, rules, practices). Catalog ids to load are in `context/AGENTS.md`.

**Install without cloning this repo:** use a [GitHub Release](https://github.com/mhmdreza-rafiei/agent-tools/releases) and download `master.zip`, or take [`releases/master.zip`](releases/master.zip) from the tree. Unzip and open the PDFs. Rebuild with `node scripts/workbook/run.mjs`. The `releases/` folder is only the built zip — GitHub's Releases sidebar comes from version tags (`v*`), not from that folder.

## License

MIT — see [LICENSE](LICENSE).
