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

Do **not** invent requirements or paste workspace-local paths/stack. For shape and examples, open [references/TEMPLATE.md](references/TEMPLATE.md).

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

After answers (or if not blocked), continue passes 1–8.

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

Use only sections with content; drop empty ones. One structure. **One home per fact** (Contract = shapes; Constraints = must-not; Steps = order only).

- **Title** — when helpful
- **Goal** — success looks like
- **Contract** (optional) — APIs / bodies / remove-keep; prefer compact packing
- **Constraints** — must / must-not
- **Steps** — only if order matters (omit in `compact` unless essential)
- **Related skills** — pass 5
- **Output** — deliverable format
- **Open questions** — unresolved; “resolve from workspace — don’t guess”
- **After you finish** — pass 6

After drafting: **Goal ↔ Contract ↔ Constraints ↔ Steps must agree**.

### 4) Token optimization + dedup

- Same or better meaning, fewer tokens — **without dropping preserved contracts**.
- Strip banners, redundant headers, fluff verbs.
- Prefer short imperatives; pack field lists and endpoints as compact lines/tables.
- **Dedup:** remove the same constraint repeated across Goal / Constraints / Steps; delete Steps that only restate Contract.

### 5) Related skills (precision)

Discover skills relevant to the prompt; attach **inside** the prompt.

1. Search installed / project / agent skills (`npx skills list`, `AGENTS.md`, agent skills dirs). Prefer **target** environment.
2. Rank by relevance to the goal; keep the **strongest** matches only (prefer ≤5).
3. Each entry: name + one “use for …” tied to the goal. Optional: mark top 1–2 as “load first”.
4. Skip weak / unrelated. Do not invent skill names.
5. If none: omit section or `None found — proceed with workspace defaults.`

### 6) After you finish (handoff summary instruction)

End with **After you finish**: tell the *implementing* agent, once work is done, write a result summary that:

- Anyone can understand (plain language)
- Still detailed — what changed, added/removed, how to verify, what’s still open
- Is **not** a prompt restatement or enhancer changelog

Always include unless the user asked to omit post-work summaries.

### 7) Ambiguity policy

- Unclear but non-blocking → **Open questions** for the implementer; do not invent a default.
- Blocking → return to pass 0 (ask). Never silently pick auth rules, field names, or modes the user didn’t state or accept.

### 8) Fidelity checklist + silent self-eval (before emit)

**Must pass before delivering the enhanced prompt:**

- [ ] Every user field / body / endpoint preserved?
- [ ] Every remove / keep preserved?
- [ ] Goal ↔ Contract ↔ Steps agree?
- [ ] No renamed fields; no invented stack / paths?
- [ ] No silent override of user intent (suggestions only via asks)?
- [ ] Deduped; depth mode respected?

If any fail → fix once, then emit.

Silently score 1–5: fidelity, portability, density. If fidelity &lt; 5 → revise once. Don’t print scores unless asked.

Optional chat-only enhancer changelog after the copy-ready block — omit if overloaded or user disabled it.

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

1. Either questions-first (pass 0) **or** one copy-ready enhanced prompt (Related skills when found + **After you finish**).
2. Optional brief chat-only enhancer changelog outside that block.
3. Do not announce skill usage unless the user asks.
