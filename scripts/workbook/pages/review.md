# Review / architecture

Use when reviewing a PR, branch, or codebase.

1. Read the spec first. What is the acceptance criteria?
2. Check the diff: is everything in the spec? Is there scope creep?
3. Verify tests. Does the new code have a test? Does it cover the new behavior?
4. Security: input validated at the boundary? Secrets safe? Auth in place?
5. Code correctness: logic sound? Error handling in place? No silent failures?
6. Architectural fit: matches existing patterns? Respects boundaries?
7. Report critical issues: security, broken acceptance, missing tests. Not style.
8. Do not merge. The human decides. You are a second pair of eyes.
