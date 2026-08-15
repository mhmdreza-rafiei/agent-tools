# Sources

Notes for `practices.md`. Retrieved August 2026. Do not treat blog roundups as RCTs. Where a number appears in the practices file, it comes from a source below.

## Empirical / telemetry

- METR. "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity." 10 July 2025. https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ — RCT, 16 experienced OSS developers, 246 real issues, primarily Cursor Pro + Claude 3.5/3.7 Sonnet. AI-allowed condition **19% slower**. Developers forecasted 24% speedup and still believed they were ~20% faster after the slowdown. Snapshot of early-2025 tools on mature, familiar repos — not a claim about all future models.
- Faros AI. "The AI Engineering Report 2025 — The AI Productivity Paradox." July 2025. PDF: https://243608892.fs1.hubspotusercontent-na2.net/hubfs/243608892/AI_Engineering_Impact_Report_July_2025_Faros_AI.pdf — Telemetry on developer-facing assistants (Copilot, Cursor, Claude Code, Windsurf, etc.). AI users: ~**21% more tasks**, ~**98% more PRs merged**, ~**91% longer PR review**. DORA-like delivery metrics mostly flat. Correlation, not an RCT.
- Faros AI. "DORA Report 2025 Key Takeaways: AI Impact on Dev Metrics" (includes Faros 2026 follow-on figures). https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025 — Later Faros snapshot: median PR review time **+441%** vs prior dataset, **31%** more PRs merged with no review, PR size still up, **bugs/developer +54%**, **incidents per PR +242.7%**. Use as a warning about unreviewed volume, not as a universal constant.
- Faros AI. "What METR's Study Missed About AI Productivity in the Wild." https://www.faros.ai/blog/lab-vs-reality-ai-productivity-study-findings — Argues org throughput can rise via parallelization even if single-task time does not; also reports larger PRs and more bugs. Interpret as industry telemetry plus commentary.

## Spec-first and context packs

- GitHub. `github/spec-kit`. https://github.com/github/spec-kit — Spec-driven toolkit. Commands: constitution, specify, plan, tasks, implement, converge (plus clarify/checklist/analyze gates). Specify = what/why; plan = how.
- GitHub Spec Kit docs. "Agentic SDD." https://github.github.com/spec-kit/reference/agentic-sdd.html — Ordered command flow and quality gates.
- Microsoft Developer Blog. "Diving Into Spec-Driven Development With GitHub Spec Kit." https://developer.microsoft.com/blog/spec-driven-development-spec-kit/ — Specify → plan → tasks; templates in `.specify`.
- Addy Osmani. "How to write a good spec for AI agents." https://addyosmani.com/blog/good-spec/ — Specs as executable artifacts; constraints section; subagents/skills for spec slices; GitHub Spec Kit four-phase gate.
- AGENTS.md standard. https://agents.md/ — Repo-root (and nested) standing instructions: build, test, conventions. Independent of any one vendor.

## Skills, harnesses, verification

- Anthropic. "Lessons from building Claude Code: How we use skills." https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills — Skills as folders; description = trigger; one job per skill; progressive disclosure; don't restate default coding knowledge.
- Anthropic. "Building verification loops in Claude Code with skills." https://claude.com/blog/building-verification-loops-in-claude-code-with-skills — Encode tests/lints as loops; chain produce → verify; PR-tied checks.
- Anthropic. "The new rules of context engineering for Claude 5 generation models." https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models — Prompt is a slice of context; skills + CLAUDE.md + memory; progressive disclosure; `claude doctor` for oversized standing files.
- Anthropic. "Harness design for long-running application development." https://www.anthropic.com/engineering/harness-design-long-running-apps — Context resets + handoff artifacts vs compaction; initializer then feature-at-a-time coding agent.
- Anthropic. "How we built Claude Code auto mode." https://www.anthropic.com/engineering/claude-code-auto-mode — Human-in-the-loop alternative: classifiers instead of blind `--dangerously-skip-permissions`; escalate after repeated denials.

## Multi-agent / PR agents (practice, not RCTs)

- Built In. "Claude Code vs. Codex vs. Cursor vs. GitHub Copilot." https://builtin.com/articles/claude-code-codex-cursor-github-copilot-comparison — Cites Faros 2026 incident/unreviewed-PR figures; recommends tight scope and review every few iterations. Tool comparison plus industry telemetry, not a new experiment.
- daily.dev. "Best AI coding agents comparison." https://daily.dev/blog/best-ai-coding-agents-comparison/ — Role split: Cursor inner loop, Claude Code long refactors, Codex/Copilot cloud PR agents inheriting branch protection.
- DX Heroes. "Claude Code vs Cursor vs Copilot: a field report." https://dxheroes.io/insights/claude-code-vs-cursor-vs-copilot — One team's inner-loop vs agent-loop split. Anecdote; used only for "teams often run more than one wrapper."

## Secondary explainers (ideas cross-checked against sources above)

- amux. "Spec-Driven Development with AI Coding Agents: The Complete Guide (2026)." https://amux.io/guides/spec-driven-development/ — Spec anatomy: constraints, copy-pasteable acceptance, parallel tasks on non-overlapping files.
- Levelop. "Spec-Driven Development in 2026." https://levelop.dev/blog/spec-driven-development-complete-guide-2026 — Spec vs constitution vs derived plan; OpenSpec as lightweight option.
- Augment Code. "What Is Spec-Driven Development?" https://www.augmentcode.com/guides/what-is-spec-driven-development — Six spec elements; planner/implementer/verifier.
- TrueFoundry. "Spec-Driven Development for AI Agents: Governing Specs." https://www.truefoundry.com/blog/spec-driven-development-ai-agents — Spec Kit timeline (Specify → Plan → Tasks → Implement); standing-instruction budget (~150–200). Cross-check numbers against Spec Kit / Anthropic rather than this post alone.
- Xingyao Wang et al. "Spec Kit Agents: Context-Grounded Agentic Workflows." arXiv:2604.05278. https://arxiv.org/pdf/2604.05278 — Pre/post phase grounding: probe the repo before generating; validate paths/deps; run tests after implement.

## What we did not cite as evidence

- Unsourced "I tested every agent for 7 days" listicles, unless a specific, checkable claim was needed — and even then we preferred METR/Faros/Anthropic/GitHub.
- Fake or unnamed "studies." If a practice is folk wisdom (e.g. "paste the error"), it is labeled as practice, not research.
