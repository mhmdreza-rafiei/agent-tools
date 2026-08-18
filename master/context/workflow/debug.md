# Workflow: debug / incident response

Use when a production issue, test failure, or error report needs root cause analysis and a fix. Humans follow `debug.pdf`.

## Goal

Fix the root cause once. Restore to green before moving on. Leave a test or check that would catch this again.

## Every time

### 0. Classify the incident

- **P0 (blocked, data loss, security):** stop and ask for escalation path before acting
- **P1 (degraded, high volume impact):** fix first; document after
- **P2 (intermittent, non-blocking):** reproducible? If not, hold until you can repro
- **Research (post-mortem, question):** follow `workflow/research.md` instead

### 1. Inventory the evidence

1. Exact error message, stack trace, or logs
2. When it started (commit, date, reproducible on demand?)
3. Scope: all users/requests, or a subset? Repeatable?
4. What changed recently? (git log, deploy history)
5. What is the observed behavior vs expected behavior?

Run the failing test/command yourself. Do not trust a second-hand report. If it is not reproducible, say so and ask for steps.

### 2. Find the root cause, not the symptom

The error often points to a symptom. Trace the flow end-to-end:

1. Does the error message match the code? (e.g. is that error string actually in the file?)
2. What callers feed this function? Grep for all callers.
3. Where is the state that leads to this error? (database, config, cache, in-memory?)
4. What changed in that state path?

If the issue is "database is slow," do not just add an index. Ask: what query is slow? Is it the right query? Is the data model the problem? Fix once at the shared point, not per caller.

### 3. Write a failing test first

Before fixing, encode the bug as a test:

```
test("should not crash when X is null", () => {
  const result = doThing(null);
  expect(result).toBe(expectedValue);
});
```

Run it and confirm it fails with the reported error. This test is your proof the bug exists.

### 4. Fix the root cause

- Change the shared function, not N callers.
- Add a guard, validation, or default where the data enters the system.
- Do not over-engineer; fix what is broken, not what *might* break next.
- Run the failing test; confirm it passes.

### 5. Search for siblings

Grep the whole repo for similar patterns:

```
grep -r "same_function_call" src/
```

Fix the shared cause once; if there are N callers with the same bug pattern, one fix at the source is smaller than N patches.

### 6. Verification and review

- Failing test now passes.
- All existing tests still pass. (Run the whole test suite.)
- Lint/typecheck passes.
- Can you write a step-by-step command that demonstrates the fix? (Paste it in the commit message or PR.)

### 7. Document the postmortem (optional, for P1/P0)

If the incident is high-impact, capture:

- What was the root cause? (One sentence.)
- When was it introduced? (commit hash)
- How should we have caught this before production? (missing test, missing type check, missing validation)
- Add the test or check that would have caught it.

Update `context/` if the root cause reveals a standing gap (e.g. "we never validate user input at the boundary").

### 8. Close and communicate

1. Commit the fix with a clear message: `fix(module): prevent crash when X is null`.
2. PR message: link the issue, include reproduction steps, link the test.
3. Notify the human before deploying.

## Catalog load

- Agents: `qa/debugger` for the failing test/code path; `devops/incident-responder` for comms/severity; `devops/devops-incident-responder` when logs/deploy/infra are in play.
- Skills: `workflow/triage`, `context/postmortem` (P0/P1).
- Rules: `code/error-handling`, `code/testing`, `observability`.

