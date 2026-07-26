---
name: run-team
description: Set up agents for the project the way you ask — tell it to set up subagents and it writes Claude Code .claude/agents files (or the host equivalent), tell it to create an agent team and it writes a Claude Code Agent Team spawn template, or do both — all derived from the project's systems and saved state. Also resumes or clears a team. Automation-first. Use whenever the user wants to set up subagents, create an agent team or teams based on the project, spin up agents, resume or continue a team, clear it, or runs /run-team.
author: mhmdreza_rafiei
---

# /run-team

Set up runnable agents for this project, **in whichever form you ask for**, derived from the project's systems and saved state. Two forms are supported; you pick by how you phrase the request:

- **Subagents** — persistent specialist configs the host reads directly (Claude Code `.claude/agents/`, Cursor rules, etc.). Good for recurring roles and auto-delegation.
- **Agent Team** — Claude Code's parallel multi-instance team (a lead that decomposes work + teammates that own pieces and message each other), set up via a reusable spawn template.

State lives in `context/memory/team.md` so a team is never re-described by hand.

## Read the intent (which form to build)

Pick the form from what the user said — do not always build both:

- "set up **subagents** / agents for this project", "make a code-reviewer agent" → **Subagents** (Mode A).
- "create an **agent team** based on our project", "spin up a team", "run a parallel team" → **Agent Team** (Mode B).
- "set up **both**", or genuinely ambiguous and the project clearly wants both → do both, and say so.
- Bare `/run-team` with no form named → ask one short question (subagents, agent team, or both?) only if you can't tell; otherwise default to what the phrasing implies.

Agent Teams is a Claude Code feature. On non-Claude hosts, only Mode A applies — say so if the user asked for a team.

## Automation-first

Once the form is clear, assemble and proceed. Announce the roster + what was written in one short block. Inherit decisions from the context (architecture → ownership, plan/progress → tasks). Hard-stop only for destructive actions: clearing a team, overwriting an `active` team, or overwriting existing config files.

## Prerequisite

Read `AGENTS.md` and `context/architecture.md` so the team inherits the project's systems, rules, and standards. If `context/` is missing or its systems are thin, run `/groundwork` first.

## Commands

- `/run-team start` — assemble the roster and set up the form you asked for (subagents, agent team, or both), then begin.
- `/run-team resume` — restore the roster + open tasks from `team.md` and continue.
- `/run-team clear` — close out, optionally remove generated configs, reset state.

## Step 1 — Detect platform + intent

Platform: `.claude/`/`CLAUDE.md` → Claude Code; `.cursor/` → Cursor; `.windsurfrules` → Windsurf; `.clinerules` → Cline; else ask. Intent: the form to build (above).

## Step 2 — Assemble the roster

Source priority: (a) a defined preset → use verbatim; (b) the previous roster in `team.md`; (c) else derive from the **Systems** in `context/architecture.md`, collapsed to as few agents as the work needs. Each member: name, specialty/role, owned files/areas (and may touch nothing else), skills/tools, a one-line instruction, success criteria. For multiple teams, group under a team name and track separately; namespace names.

## Step 3 — Build the requested form

### Mode A — Subagents (when the user asked for subagents/agents)

One config per agent in the platform's format.

**Claude Code** → `.claude/agents/<name>.md`:

```markdown
---
name: <area>-agent
description: Use proactively for work in <owned area>. <action-oriented trigger>.
tools: <only what it needs; omit to inherit all>
model: <optional>
---

You are the <specialty> for <project>. You own <owned files/areas> and work only there.
Before acting, read AGENTS.md and your area's context files; follow the never-violate rules;
use design tokens for UI. Your job: <responsibilities>. Hand off anything outside your area.
Use /architect before building, /review after, /imprint after UI. Keep memory current.
```

**Cursor** → `.cursor/rules/<name>.mdc` (`description`, `globs` for the owned area, `alwaysApply: false`) with the same body. **Other hosts** → native format, or keep the roster in `team.md` if the host has no agent concept.

### Mode B — Agent Team (when the user asked for a team; Claude Code only)

Claude Code's Agent Teams is experimental and **manages its own config under `~/.claude/teams/` and `~/.claude/tasks/` — never hand-write or edit those.** What `/run-team` owns is the **spawn template**: the reusable prompt you hand to Claude Code to spawn the team. Write it to `context/memory/team-spawn.md`:

```markdown
# Team spawn — <team name>

Goal: <the overall objective>

Roles (lead decomposes/assigns; teammates own discrete pieces, message via the mailbox):
- <name> (<specialty>) — owns <files/areas>, may not touch outside it. Success: <criteria>.
- ...

Shared context: every teammate reads AGENTS.md + its area's context files and follows
architecture.md's rules. Keep agents on distinct directories to avoid write races.

Tasks:
- [ ] <task> — owner
```

Record the enablement note so it can run: Agent Teams needs Claude Code v2.1.32+ and the flag `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (`~/.claude/settings.json` under `env`, or an env var). Then hand the spawn template to Claude Code; it uses its team tools (TeamCreate / TaskCreate / SendMessage) to spawn the lead + teammates. Do not create those files yourself.

Record in `team.md`: each subagent's config path and/or the spawn-template path, plus platform and the form built.

## team.md — the team's memory

`/run-team` is the sole writer.

```markdown
# Team Memory

## Status
<active | idle | cleared> — last updated <timestamp> · platform: <...> · form: <subagents | team | both>

## Team
- <name> — <specialty> — owns: <area> — config: <path, if subagent> — source: <preset | ad-hoc>

## Spawn template
context/memory/team-spawn.md  (only if an Agent Team was built; enable CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)

## Task list / Last session / Handoff
...
```

## start

1. Read `team.md`; if a team is `active`, confirm before starting over.
2. Detect platform + intent (Step 1), assemble the roster (Step 2).
3. Announce the roster + what will be written (config paths and/or spawn template); proceed unless a confirm triggered.
4. Build only the requested form (Mode A, Mode B, or both). Confirm before overwriting an existing config.
5. Seed tasks: explicit goal, else open items from `context/plan.md` + `context/memory/progress.md`, assigned to owners.
6. Write `team.md` (status `active`), and begin.

## resume

Read `team.md`; if nothing to resume, run `start`. Rebuild the roster + open tasks, verify the recorded configs/spawn template still exist (re-write any missing), re-load context, read the Handoff, continue, update `team.md`.

## clear

1. Summarize the outcome into `team.md`; fold durable progress into `context/memory/progress.md` (via `/remember save`).
2. Offer to remove the generated subagent configs and/or spawn template at their recorded paths (destructive → confirm). Do **not** touch `~/.claude/teams/` or `~/.claude/tasks/` — Claude Code owns those.
3. Reset `team.md` to a clean baseline. Clearing the team is not clearing the project's memory.

## Agent config (presets)

Customize with a preset defining each agent (name · specialty · owned areas · skills/tools · instruction · success criteria). If a preset exists it's the source of truth for `start`; if not, `start` derives the roster and writes it back as the editable baseline. Record which preset produced the team in `team.md`.

## Rules

- One writer: only `/run-team` writes `team.md`, the subagent configs, and the spawn template.
- Build only the form the user asked for; don't generate configs they didn't request.
- Never hand-edit Claude Code's `~/.claude/teams/` or `~/.claude/tasks/`.
- Agents own non-overlapping areas — enforce it so they don't collide.
- Never silently overwrite an `active` team or an existing config.
