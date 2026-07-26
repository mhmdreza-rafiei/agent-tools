---
name: enhance-prompt
description: >
  Use when the user asks to enhance, improve, rewrite, optimize, or clarify a prompt —
  or when always-on prompt enhancement is enabled for the session.
  Rewrites casual or vague chat into precise, portable agent instructions
  without injecting workspace paths, stack, or session-local context.
  Preserves user-stated contracts; ranks related skills; asks clarifying /
  mode / better-decision questions when needed; ends with an after-finish summary instruction.
author: mhmdreza_rafiei
---

# enhance-prompt

Rewrite the user’s message into a precise, portable agent prompt. **Enhance = clarify and structure — never strip user-stated details that affect accuracy.** Accuracy first; tokens second (same or better meaning, fewer tokens).

Do **not** invent requirements or paste workspace-local paths/stack. For shape and examples, open [references/TEMPLATE.md](references/TEMPLATE.md) and [references/SECTIONS.md](references/SECTIONS.md).

## Procedure

Apply passes in order. Deliver one copy-ready enhanced prompt (or questions-first when blocked — see pass 0).

### 0) Clarify, suggest, choose mode (ask before guessing)

Before (or instead of) emitting a full enhanced prompt, ask when it improves accuracy.

**Ask when:**

- Critical details are missing (fields, success criteria, scope, must-nots)
- A better / more optimal decision exists than what the user stated — propose it; don’t silently override
- Approach is ambiguous (how to do X vs Y given what they wrote)
- Depth / packing mode is unclear for a large task

**How to ask:**

- Prefer short multiple-choice or yes/no + one-line rationale
- Suggest **better options** (optimal defaults) labeled as suggestions — user can reject
- Ask **mode** when useful: `compact` | `standard` | `full` (see Depth dial)
- Ask approach forks only when they change the result (e.g. auth vs unauth OTP purpose)
- Cap: **MAX 3 questions** per turn (batch them). Don’t interrogate for niceties.
- If the user said “just enhance” / “don’t ask” / always-on with enough signal → enhance without questions
- Casual but clear enough → enhance; put residual ambiguity under **Open questions** for the implementer

**Question-first output** (when blocked on critical gaps):

1. Brief “what I understood”
2. Up to 3 questions (include mode / better-decision suggestions when relevant)
3. Optional mini draft only if helpful — still no path/stack injection

After answers (or if not blocked), continue passes 1–11.

### Depth dial

| Mode | When | Behavior |
|------|------|----------|
| `compact` | User asks, or rich contract already dense | Densest packing; full contracts kept; minimal Steps |
| `standard` | Default | Normal sections; Steps only if needed |
| `full` | Large / multi-system task, or user asks | More Steps + verify detail; still no path/stack dumps |

Same accuracy floor in all modes — only verbosity changes. If unset, use `standard` (or ask once when the task is large and mode would matter).

### 1) Full-text enhance

- Fix grammar, wording, clarity; prefer precise verbs.
- Remove filler, noise symbols, decorative separators, emojis.
- Preserve user intent and constraints; never invent requirements, brand systems, stack, or scope the user did not ask for.
- **Do not rename** user field names (`phone` stays `phone`, not `phone-number`).

### 2) Context policy (non-negotiable)

**Prompt context must be portable and session-safe.**

#### Always preserve (if present in the user input)

Contracts — compressing them away makes results worse:

- Endpoint lists, request/response bodies, field lists (e.g. `{ phone, password, code }`)
- Remove / keep / replace lists
- Security rules, do / don’t, acceptance criteria
- Explicit open questions or ambiguities the user left unresolved
- Any detail that changes implementation behavior

**Enhance** = reorganize and tighten. **Not** = delete or “summarize away” those facts.

**Rich input** → compress wording only; **copy contracts forward** (don’t rebuild from memory).  
**Casual input** → add structure without inventing environment.

#### Never inject

- Absolute or relative project/workspace folder paths
- Repo roots, home paths, machine-specific paths
- Tech stack / framework / language lists the target workspace already provides via `AGENTS.md`, `context/`, rules, or open files
- Long dumps of docs already loadable in the *target* workspace
- Paths or facts from the *current* workspace when the prompt will be used elsewhere
- Invented field names, status codes, or API shapes the user did not state
- Silent “optimal” overrides the user didn’t accept (suggest via pass 0 instead)

Rules of thumb:

- Agent can read it from the target workspace → don’t paste paths/stack/docs.
- User stated a contract → keep it densely (tables / one-liners OK).
- Unsure if session-local → omit or `[use target workspace context]`.

### 3) Structure / layout enhance

Use only sections with content; drop empty ones. One structure. **One home per fact** (Contract = shapes; Constraints = must; Do not = must-not; Steps = order only).

- **Title** — when helpful
- **Goal** — success looks like
- **Acceptance criteria** — 1–3 measurable checks the implementer can self-verify against (tests pass, lighthouse ≥ 90, endpoint returns 200 with shape X). Elicit from user; propose defaults if unstated and the task is non-trivial.
- **Contract** (optional) — APIs / bodies / remove-keep; prefer compact packing
- **Constraints** — must
- **Do not** — must-not; elicited (see pass 3b). One home for negatives — do not also list them under Constraints.
- **Destructive actions** — flag any destructive ops the task touches (drop tables, force-push, delete files, mass rename). Tells the implementer to pause and confirm before executing them.
- **Steps** — only if order matters (omit in `compact` unless essential)
- **Delegation plan** — only when the task spans multiple domains (see pass 10); replaces one monolith with an ordered agent → sub-goal list.
- **Related artifacts** — pass 5 (skills / rules / agents / scripts)
- **Before you start** — pass 5b (load-first enforcement)
- **Output** — deliverable format
- **Open questions** — split into **Blocking** (must be answered before work starts) and **Non-blocking** (can be resolved mid-work). Both: "resolve from workspace — don’t guess".
- **After you finish** — pass 6

After drafting: **Goal ↔ Acceptance criteria ↔ Contract ↔ Constraints ↔ Do not ↔ Steps must agree**.

### 3b) Elicit "Do not" when missing

If the task is non-trivial and the user stated no must-nots, propose 1–3 sensible negatives and ask once (counts toward the pass-0 cap): "Anything that must NOT happen? e.g. no breaking changes to X, no new deps, no public API removal." If the user declines, emit an empty `## Do not` with a one-line "none stated" note. Never invent must-nots as fact — only as suggestions.

### 4) Token optimization + dedup

- Same or better meaning, fewer tokens — **without dropping preserved contracts**.
- Strip banners, redundant headers, fluff verbs.
- Prefer short imperatives; pack field lists and endpoints as compact lines/tables.
- **Dedup:** remove the same constraint repeated across Goal / Constraints / Steps; delete Steps that only restate Contract.

### 5) Related artifacts (precision)

Discover skills, rules, agents, and scripts relevant to the prompt; attach **inside** the prompt. The implementer works better when the prompt wires it to the rest of the catalog — not just skills.

1. Search installed / project / agent catalogs (`npx skills list`, `AGENTS.md`, agent skills/agents/rules dirs, this repo's `agents/` `skills/` `rules/` `scripts/`). Prefer **target** environment.
2. Rank by relevance to the goal; keep the **strongest** matches only. Prefer ≤5 skills, ≤3 rules, ≤3 agents, ≤2 scripts. Skip weak / unrelated. Do not invent names.
3. Each entry: name + one "use for …" tied to the goal. Mark the top 1–2 skills as "*(load first)*".
4. Emit one **Related artifacts** section, grouped:

   ```markdown
   ## Related artifacts
   - `/skill-name` *(load first)* — use for <why tied to goal>
   - `rule/<name>` — use for <why>
   - `agents/<category>/<name>` — use for <why>
   - `scripts/<name>` — use for <why>
   ```

5. If none of a kind: omit that line. If all none: `None found — proceed with workspace defaults.`

### 5b) Load-first enforcement

If any skill (or rule) is marked *(load first)*, emit a **Before you start** section so the implementer actually loads it before step 1:

```markdown
## Before you start
Load `/skill-name` and `rule/<name>` before step 1.
```

Omit the section if nothing is marked load-first.

### 6) After you finish (handoff summary instruction)

End with **After you finish**: tell the *implementing* agent, once work is done, write a result summary that:

- Anyone can understand (plain language)
- Still detailed — what changed, added/removed, how to verify, what’s still open
- Is **not** a prompt restatement or enhancer changelog

Always include unless the user asked to omit post-work summaries.

### 7) Ambiguity policy

- Unclear but non-blocking → **Open questions → Non-blocking** for the implementer; do not invent a default.
- Unclear and blocking (work cannot start without it) → **Open questions → Blocking**, and surface in pass 0 so the user can answer before work starts.
- Never silently pick auth rules, field names, or modes the user didn’t state or accept.

### 8) Fidelity checklist + contract-diff check (before emit)

**Mechanical contract-diff (run before the manual checklist):**

1. Extract contract tokens from the user input: field names, endpoint paths, request/response body keys, and every `remove` / `keep` / `replace` item.
2. Extract the same tokens from your drafted output.
3. Diff. If any input token is missing from the output → the gate fails; add it back. This catches accidental contract loss the manual checklist would miss.

**Must pass before delivering the enhanced prompt:**

- [ ] Contract-diff: every input field / endpoint / remove-keep token present in output?
- [ ] Every user field / body / endpoint preserved?
- [ ] Every remove / keep preserved?
- [ ] Goal ↔ Acceptance criteria ↔ Contract ↔ Steps agree?
- [ ] No renamed fields; no invented stack / paths?
- [ ] No silent override of user intent (suggestions only via asks)?
- [ ] Do not section present (or noted empty) for non-trivial tasks?
- [ ] Destructive actions flagged if the task touches destructive ops?
- [ ] Deduped; depth mode respected?

If any fail → fix once, then emit.

Silently score 1–5: fidelity, portability, density. If fidelity &lt; 5 → revise once. Don’t print scores unless asked.

Optional chat-only enhancer changelog after the copy-ready block — omit if overloaded or user disabled it.

### 9) Target-agent awareness (optional)

If the user states a target agent (`--for <agent>` or "for the backend-architect"), read that agent's description (from `agents/<category>/<name>.mdc` in the catalog or the target workspace) and align the prompt:

- Emphasize the parts of the Goal/Contract that agent owns; de-emphasize the rest.
- Rank Related artifacts with that agent's likely collaborators first.
- Still portable — tuning emphasis, not injecting stack/paths.

If no target agent stated, skip this pass.

### 10) Multi-agent / delegation path

If the task spans multiple domains (e.g. backend + security + docs, or schema + migration + observability), do not emit one monolith. Emit a **Delegation plan** section:

```markdown
## Delegation plan
1. `agents/backend/<name>` — <sub-goal>
2. `agents/qa/<name>` — <sub-goal, depends on 1>
3. `agents/docs/<name>` — <sub-goal, depends on 1>
```

Rules for the plan:
- One agent per domain; ordered by dependency; each row names the agent selector and the sub-goal it owns.
- The shared Contract / Acceptance criteria / Do not stay at the top — every sub-agent inherits them.
- If the user stated a single target agent (pass 9) and the task is single-domain, skip this pass and emit a normal single-agent prompt.

### 11) Iteration (`--refine`)

If invoked as `--refine` (or the user is re-enhancing a prompt they already enhanced), do not rewrite from zero:

1. Read the prior enhanced prompt (from the conversation or a file the user points at).
2. Treat the user's new message as a *delta* on top of it — additions, removals, or corrections.
3. Emit a new enhanced prompt that merges the delta into the prior version, preserving unchanged sections verbatim.
4. Note in the optional chat-only changelog what changed vs the prior version.

Without `--refine`, each enhance is stateless (current behavior).

## Always-on mode

If the user asks to enhance every chat / every prompt:

1. Create or update `AGENTS.md` in the **target** project.
2. Add a **Skills** section: when-to-use vs always-use.
3. Register `enhance-prompt` as always-on, e.g.:

```yaml
alwaysApply: true
```

Always-on: rewrite the user message into a better agent prompt **before** acting — still obey context policy and fidelity rules. Prefer enhancing over asking unless blocked on critical gaps (then ≤3 tight questions).

## Output

1. Either questions-first (pass 0) **or** one copy-ready enhanced prompt — with the new sections when applicable (Acceptance criteria, Do not, Destructive actions, Delegation plan, Before you start, split Open questions) + **Related artifacts** + **After you finish**.
2. Optional brief chat-only enhancer changelog outside that block (required under `--refine` to note the delta).
3. Do not announce skill usage unless the user asks.
