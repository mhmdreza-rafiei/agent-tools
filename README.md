# agent-tools

**A catalog of agent artifacts — agents, skills, rules, scripts, and profiles —
installable into any coding agent via [agentry](https://github.com/mhmdreza-rafiei/agentry).**

Works with Cursor, Claude Code, Codex, OpenCode, and 70+ more.

[![license](https://img.shields.io/badge/license-MIT-38bdf8?style=flat)](LICENSE)
[![stars](https://img.shields.io/github/stars/mhmdreza-rafiei/agent-tools?style=social)](https://github.com/mhmdreza-rafiei/agent-tools)
[![agentry](https://img.shields.io/badge/agentry-compatible-38bdf8?style=flat)](https://github.com/mhmdreza-rafiei/agentry)
[![agents](https://img.shields.io/badge/agents-37-38bdf8?style=flat)](agents)
[![skills](https://img.shields.io/badge/skills-9-38bdf8?style=flat)](skills)
[![rules](https://img.shields.io/badge/rules-5-38bdf8?style=flat)](rules)
[![profiles](https://img.shields.io/badge/profiles-8-38bdf8?style=flat)](profiles)

## Install

```bash
# Install the agentry CLI (one time)
npm install -g @mhmdreza-rafiei/agentry

# Then install artifacts from this catalog into any project
agentry add agents mhmdreza-rafiei/agent-tools
```

## Quick start

```bash
# Browse everything in the catalog
agentry list mhmdreza-rafiei/agent-tools

# Install one agent to Cursor + Claude Code
agentry add agents mhmdreza-rafiei/agent-tools frontend/frontend-developer -a cursor -a claude-code

# Install a whole bundle (profile) in one shot
agentry add profile mhmdreza-rafiei/agent-tools fullstack

# See what is already installed in your project
agentry list
```

## What's in the catalog

**62 artifacts** — 37 agents, 9 skills, 5 rules, 8 profiles, 3 scripts.
Every artifact carries `author: mhmdreza_rafiei` in its frontmatter.

### Agents (37)

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
| `languages/` | `python-pro` | Django, FastAPI, async Python, data processing |
| `languages/` | `golang-pro` | Concurrent Go, microservices, CLI tools |
| `languages/` | `typescript-pro` | Type-safe TS, advanced types, scalable architecture |
| `languages/` | `mobile-developer` | React Native / Flutter, native integrations |
| `languages/` | `electron-pro` | Cross-platform desktop apps, IPC, native integration |
| `devops/` | `cloud-architect` | AWS/Azure/GCP, cost optimization, cloud-native |
| `devops/` | `deployment-engineer` | CI/CD, Docker, Kubernetes, infra automation |
| `devops/` | `performance-engineer` | Bottleneck analysis, caching, perf monitoring |
| `devops/` | `devops-incident-responder` | Log analysis, deployment troubleshooting |
| `devops/` | `incident-responder` | Critical outages, crisis management, postmortems |
| `data/` | `data-engineer` | ETL, data warehouses, streaming, Spark/Airflow/Kafka |
| `data/` | `data-scientist` | SQL, BigQuery, statistical analysis, BI |
| `data/` | `database-optimizer` | Query optimization, indexing, schema design |
| `data/` | `postgres-pro` | PostgreSQL advanced queries, tuning, pglite |
| `ai/` | `ai-engineer` | RAG, prompt pipelines, AI API integration |
| `ai/` | `ml-engineer` | ML pipelines, model serving, production ML |
| `ai/` | `prompt-engineer` | LLM optimization, prompt engineering |
| `qa/` | `code-reviewer` | Code review: best practices, security, maintainability |
| `qa/` | `architect-review` | Architectural consistency, pattern compliance |
| `qa/` | `debugger` | Error analysis, root cause, test failure investigation |
| `qa/` | `qa-expert` | Testing strategies, quality processes |
| `qa/` | `test-automator` | Unit/integration/E2E test suites, automation infra |
| `docs/` | `api-documenter` | OpenAPI/Swagger, SDK guides, API reference |
| `docs/` | `documentation-expert` | User manuals, system docs, knowledge bases |
| `dx/` | `dx-optimizer` | Tooling, build systems, dev workflows |
| `dx/` | `legacy-modernizer` | Legacy refactors, framework migrations |
| (flat) | `security-auditor` | Vulnerability assessments, OWASP, pen testing |
| (flat) | `product-manager` | Roadmaps, market analysis, business alignment |
| (flat) | `agent-organizer` | Multi-agent team assembly, delegation strategy |

### Skills (9)

| Category | Skill | Use for |
|----------|-------|---------|
| `context/` | `groundwork` | Scaffold + maintain the `context/` system + AGENTS.md |
| `context/` | `architect` | Senior-engineer thinking pass → `context/plan.md` |
| `context/` | `review` | Three-layer check (plan/system/production) |
| `context/` | `validate` | Quality-bar check against comparable projects |
| `context/` | `remember` | Save/restore session state to `context/memory/progress.md` |
| `context/` | `recover` | Diagnose failure type → targeted fix / reset / rethink |
| `context/` | `imprint` | Record UI patterns to `context/memory/ui-registry.md` |
| `context/` | `run-team` | Start / resume / clear an agent team |
| (flat) | `enhance-prompt` | Rewrite vague chat into precise, portable agent prompts |

### Rules (5)

| Rule | Always apply | Use for |
|------|--------------|---------|
| `ask-dont-guess` | yes | Ask when unclear; never guess requirements |
| `files-folders-structure` | yes | Folder/file naming and grouping conventions |
| `git-workflow` | yes | Conventional Commits, backups, commit/push permission |
| `migration` | yes | Safe refactors: moves, renames, splits, ref updates |
| `project-context` | yes | Read and update project context after every task |

### Profiles (8)

| Profile | Bundles | One-line |
|---------|---------|----------|
| `starter` | 1 skill + 2 rules | Minimal honest-agent pack |
| `fullstack` | 3 agents + 1 skill + 3 rules | Full-stack web dev team |
| `frontend` | 5 agents + 1 skill + 2 rules | Frontend / UI / UX team |
| `backend` | 5 agents + 3 rules | Backend + database team |
| `ai` | 3 agents + 2 skills + 2 rules | AI/ML engineering team |
| `devops` | 5 agents + 2 rules | DevOps + incident response team |
| `security` | 3 agents + 1 rule | Security review team |
| `context` | 8 skills + 1 rule | The full context-system suite |

### Scripts (3)

| Script | Use for |
|--------|---------|
| `lint-artifacts` | Validate `author` frontmatter + correct extensions |
| `validate-profiles` | Structural lint of `profiles/*.yaml` |
| `stats` | Print the full catalog inventory |

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
├── rules/                      ← one .mdc file per rule
│   └── <name>.mdc
├── profiles/                   ← one .yaml file per install bundle
│   └── <name>.yaml
├── scripts/                    ← one folder per use-case
│   └── <name>/{README.md, run.mjs}
└── docs/                       ← repo docs
```

Every agent, rule, and skill frontmatter includes `author: mhmdreza_rafiei`.
Profiles carry `author: mhmdreza_rafiei` as a top-level field (the agentry
zod schema strips unknown keys on parse, but the field stays in source for
attribution).

## Examples

```bash
# List everything in the catalog
agentry list mhmdreza-rafiei/agent-tools
agentry list mhmdreza-rafiei/agent-tools agents
agentry list mhmdreza-rafiei/agent-tools skills

# Install single artifacts
agentry add agents mhmdreza-rafiei/agent-tools frontend/react-pro -a cursor
agentry add skills mhmdreza-rafiei/agent-tools enhance-prompt -a cursor -a claude-code
agentry add rules  mhmdreza-rafiei/agent-tools git-workflow

# Install a whole bundle
agentry add profile mhmdreza-rafiei/agent-tools fullstack
agentry add profile mhmdreza-rafiei/agent-tools context

# Update / remove
agentry update agents mhmdreza-rafiei/agent-tools
agentry remove skills enhance-prompt
```

## Compatibility

This catalog is built for [agentry](https://github.com/mhmdreza-rafiei/agentry),
which installs into Cursor, Claude Code, Codex, OpenCode, Gemini CLI, Windsurf,
and 70+ more. Universal providers share `.agents/skills/`; others get a
symlink or copy (e.g. Claude Code → `.claude/skills`).

Discovery rules (see [agentry discovery.ts](https://github.com/mhmdreza-rafiei/agentry/blob/main/src/artifacts/discovery.ts)):

- `skills/<name>/SKILL.md` or `skills/<category>/<name>/SKILL.md`
- `agents/<name>.mdc` or `agents/<category>/<name>.mdc` (`.mdc` required)
- `rules/<name>.mdc` or `rules/<category>/<name>.mdc` (`.mdc` required)
- `profiles/<name>.yaml` or `profiles/<category>/<name>.yaml`
- `scripts/<name>/` or `scripts/<category>/<name>/`

## Local scripts

The `scripts/` folder contains dependency-free Node ESM scripts for maintaining
the catalog:

```bash
node scripts/lint-artifacts/run.mjs      # check author + extensions
node scripts/validate-profiles/run.mjs  # lint profiles/*.yaml
node scripts/stats/run.mjs              # print catalog inventory
```

## Contributing

When adding a new agent, skill, rule, profile, or script, follow the layout
above and the frontmatter conventions in [AGENTS.md](AGENTS.md). Run
`node scripts/lint-artifacts/run.mjs` before committing to catch drift.

## License

MIT — see [LICENSE](LICENSE).
