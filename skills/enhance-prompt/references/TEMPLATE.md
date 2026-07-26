# enhance-prompt — output template

Enhance = clarify + structure. **Never strip user-stated contracts.** Never inject paths/stack. Ask (≤3) when blocked or when a better decision/mode would help — don’t silently override.

## Correct output shape

```markdown
# <short title>

## Goal
<what success looks like>

## Contract
<optional — compact endpoint/body/remove-keep lines the user stated>

## Constraints
- <must / must-not — one home; don’t repeat Contract>

## Steps
1. <only if order matters>
2. …

## Related skills
- `/skill-name` *(load first)* — use for <why tied to goal>
- `/other` — use for <why>

## Output
<deliverable format>

## Open questions
- <resolve from workspace — don’t guess>

## After you finish
When the work is done, write a summary anyone can understand, while remaining detailed:
- What changed (added/removed)
- How to verify
- Anything still open or risky
```

Omit empty sections. Respect depth dial: `compact` | `standard` | `full`.

---

## Questions-first shape (pass 0)

When critical gaps or better decisions/modes matter:

```markdown
## Understood
<1–3 lines of intent>

## Questions (max 3)
1. **Mode:** run `compact` (densest), `standard` (default), or `full` (more steps/verify)? — suggestion: `standard` because <why>
2. **Better decision:** you asked for X; Y is often safer/cleaner because <why>. Use **Y** or keep **X**?
3. **Missing detail:** <field / success criteria / scope> — options A / B / C?

Reply with choices; then I’ll emit the full enhanced prompt.
```

Do not invent stack/paths in questions. Don’t ask if the user said not to, or signal is already enough.

---

## Example A — casual UI (standard)

**In:** `Hey bro, the frontend look mid can you improve it?`

**Out (right):**

```markdown
# Improve frontend UI quality

## Goal
Raise frontend visual quality so the first viewport and overall UI feel polished and intentional.

## Constraints
- Preserve existing behavior/content unless change is required for the visual fix
- Do not invent brand, stack, or design language
- Prefer target workspace design patterns when present
- First viewport: brand signal, one headline, short support, CTA group, one dominant visual

## Related skills
- `/frontend-design` *(load first)* — layout and visual polish (if installed)

## Output
UI improvements in the target workspace.

## After you finish
Plain-language summary anyone can follow: what looked weak, what changed, how to check desktop and mobile.
```

**Wrong:** invent React/Tailwind paths under `/Users/...`.

---

## Example B — ask mode + better decision (before enhance)

**In:** `refactor auth otp stuff, make it better`

**Questions-first (right):**

```markdown
## Understood
You want an auth/OTP refactor toward a cleaner flow, but the target shape isn’t specified.

## Questions (max 3)
1. **Mode:** `compact`, `standard`, or `full`? — suggestion: `full` (multi-endpoint refactor).
2. **Better decision:** collapse to `otp/request` → action endpoints (login | register | password-change) with OTP verified **inside** actions (no public verify)? Or keep a public verify step?
3. **Register body:** if OTP is inside register, should the body be `{ phone, password, code }` (recommended) or something else you already use?

Reply 1–3; then I’ll emit the enhanced prompt with contracts preserved.
```

**Wrong:** silently invent full API + FastAPI stack + `G:\Projects\...` without asking.

---

## Example C — rich auth: preserve contracts (compact packing)

**In (excerpt):** OTP verify internal; `otp/request` → action; register `{ phone, password, code }`; password-change like login + `new_password`; remove public verify + change/reset.

**Wrong (diluted):**

```markdown
## Constraints
- Register: accept phone-number and password only
```

**Right (`compact` / `standard`):**

```markdown
# Auth: OTP internal + collapse password APIs

## Goal
OTP verification is internal only. Public flow: otp/request → action (`login` | `register` | `password-change`). Remove public verify-OTP and separate change/reset password APIs.

## Contract
- `POST /auth/otp/request` — `{ phone, purpose }`
- `POST /auth/login` — `{ phone, method, secret }`
- `POST /auth/register` — `{ phone, password, code }`  ← OTP inside register
- `POST /auth/password-change` — `{ phone, method, secret, new_password }`
- Keep: refresh, logout
- Remove: public verify-OTP; password change; password reset; otp_proof cookie register flow if present

## Constraints
- Verify-OTP stays internal — do not re-expose
- Register: no `method`, no `secret`
- `locale_pref`: prefer `localStorage`, else cookies
- No invented auth fields/status/error shapes; use target workspace
- Preserve existing security behavior unless user said otherwise
- No path/stack paste — load from target workspace

## Related skills
- Rank ≤5 installed skills for auth / API / frontend / tests; mark top as load first

## Output
Backend + frontend matching Contract.

## Open questions
- Authenticated vs unauthenticated password-change: resolve OTP purpose / phone-vs-session from workspace — don’t guess

## After you finish
Plain + detailed summary: before→after flow, endpoints removed vs added (with shapes), how to verify (tests + results), anything still open.
```

---

## Example D — path / stack leak anti-pattern

**Wrong:** `/home/ubuntu/...`, `/Users/dev/...`, “Stack: Next.js, Prisma…”, README dumps.

**Right:** portable Goal/Contract/Constraints; `[use target workspace context]` if a pointer is needed.

---

## Fidelity gate (before emit)

- Fields/endpoints/remove-keep all present?
- No renames (`phone` not `phone-number`)?
- Goal ↔ Contract ↔ Steps agree?
- No silent override (suggestions only via questions)?
- Deduped; mode respected?
