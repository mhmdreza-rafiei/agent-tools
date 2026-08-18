# Debug / incident

Use when production is broken or a test fails.

1. Reproduce the issue yourself. Do not act on a report; run the failing test or command.
2. Trace the error to the source. Is the error a symptom? What state led to it?
3. Write a test that fails with the reported error. Then fix the code.
4. Search the codebase for the same bug pattern. Fix once at the shared cause.
5. Verify: the test passes, all other tests still pass, lint passes.
6. Document what went wrong and how to catch it next time (add a test or check).

Do not paper over symptoms. Do not patch N callers; fix the shared function once.
