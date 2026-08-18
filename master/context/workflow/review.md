# Workflow: review / architecture audit

Use when a PR, branch, or codebase needs review for scope, security, correctness, or architectural fit. Humans follow `review.pdf`.

## Goal

Answer: **Is this safe to merge?** Identify scope creep, security issues, missing tests, and broken acceptance. Not code style, not "I would write it differently."

## Every time

### 0. Understand what is being reviewed

- PR or branch? (get the link or list commits)
- What was the spec? (link or paste the issue/spec)
- What is the scope supposed to be? (files, modules, layers)
- Is the human looking for rubber-stamp review or deep audit?

### 1. Read the spec first

If there is a spec:
1. What was the acceptance criteria (commands, checks, expected behavior)?
2. What is explicitly out of scope?
3. What are the constraints (no new deps, performance budget, security)?

Read this before reading code.

### 2. Inventory the diff

```bash
git log main..HEAD --oneline
git diff main...HEAD --stat
```

- How many files touched?
- How many lines added/deleted?
- Do all changes belong in this PR? (Or is there scope creep?)

If the diff is too large to review in one sitting, ask the human to split it.

### 3. Spec vs code: does the diff address the acceptance criteria?

For each acceptance criterion:

- Is there a test that exercises this criterion?
- Does the code change make that test pass?
- If the spec says "no new dependencies," are any added? (Check manifest.)
- If the spec says "do not refactor module X," is X touched? (Warn if so.)

### 4. Security checks

- User input is validated at the boundary (not in the business logic later).
- Secrets (keys, passwords, tokens) are never logged or committed.
- Auth/permission checks are in place; the feature does not bypass them.
- SQL/query strings are parameterized (no string concat).
- External API calls have timeouts and error handling.

### 5. Missing tests

- Happy path: is there a test that exercises the new code?
- Edge cases: null, empty, invalid input — are these tested?
- Failure cases: what happens if a dependency fails? (Network, database, external API.)
- For a bug fix: does the test reproduce the bug before the fix? (Not just "passes after".)

### 6. Code correctness (not style)

- Logic errors: does the code do what it says? Trace a few paths.
- Off-by-one, nil dereference, race condition, double-lock?
- Are error codes / status checked? (Not just "fire and forget" calls.)
- Is the code path reachable? (Or dead code?)

### 7. Architectural fit

- Does this change fit the existing codebase? (Same patterns, naming, structure.)
- Is a new pattern introduced? Is it justified? (Or is it a one-off that confuses the next reader?)
- Are boundaries respected? (Layers, modules, responsibilities.)
- Do public APIs (exports, endpoints) match the existing conventions?

### 8. Common red flags

- **Scope creep:** changes that do not appear in the spec or acceptance criteria
- **Silent failures:** error is caught and ignored (`.catch(() => {})`) without logging or recovery
- **Type safety reduced:** `any` types, disabled lints, type assertions that hide real bugs
- **Performance regression:** new queries without indexes, n+1 loading, polling instead of events
- **Brittleness:** test that checks implementation details (mocks, spy calls) instead of behavior
- **Undocumented quirks:** "this has to run before that" with no comment or assertion

### 9. What not to report

Skip code style, formatting, naming preferences, or "I would have written this differently" unless it hides a real bug. Focus on safety, correctness, scope, and tests.

Example of skip:
- `const x = 1;` vs `const x=1;` — skip
- Function name `doThing` vs `processThing` — skip (unless it breaks a documented convention)
- Loop vs `map()`— skip (unless performance or readability is compromised)

### 10. Report findings

For each issue, state:

1. **Location:** file and line (or function name)
2. **Severity:** critical (cannot merge), warning (should fix), note (good to know)
3. **Finding:** one sentence, specific
4. **Fix:** what code change or test would address it

Example:
```
src/api.js, line 42: CRITICAL. User input is string-interpolated into SQL query.
  Fix: Use parameterized query: db.query("SELECT * FROM users WHERE id = ?", [userId])
```

### 11. Approve or recommend changes

- **Approve:** All acceptance criteria met, no critical issues, tests in place.
- **Request changes:** Issues that must be fixed before merge (security, broken acceptance, critical bugs).
- **Comment:** Issues that should be fixed but are not merge-blockers (style, nice-to-haves, future work).

Example comment:
```
Consider adding a test for the null case. Current tests cover only the happy path.
(Not a blocker, but this edge case failed in production once before.)
```

### 12. Do not merge

The human merges. You are a second pair of eyes. If you find a critical issue, flag it clearly and let the human decide.

## Catalog load

- Agents: `qa/code-reviewer` (default), `qa/architect-review` if structure/API changed, `qa/accessibility-auditor` if UI changed, `security-auditor` if auth/input/secrets touched.
- Skills: `context/review`, `audit/a11y`, `workflow/spec` (diff against the spec).
- Rules: `code/testing`, `code/accessibility`, `security`.
- Profile: `qa` or `security`.

