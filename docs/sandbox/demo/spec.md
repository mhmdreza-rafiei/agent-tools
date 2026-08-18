# task list — spec

## Problem
No sandbox exists in agent-tools to prove catalog artifacts work end-to-end.
Without a real web slice we cannot observe which agents/skills/rules break in
practice vs theory.

## Users
- Primary: contributor to agent-tools catalog, running integration tests.
- Secondary: anyone evaluating the catalog before adopting it.

## Scope
In:
- Static HTML page that lists and adds tasks via a simple API.
- Zero-dependency Node.js HTTP server exposing GET /tasks and POST /tasks.
- A self-check script (check.js) that starts the server, hits both endpoints,
  and exits 0 on success / non-zero on failure.

Out:
- No database — in-memory array only.
- No authentication, no persistence across restarts.
- No build step, no npm install.
- No React, no TypeScript, no bundler.

## Acceptance criteria
- `node server.js` starts without error and logs a port.
- `node check.js` exits 0; exits non-zero if an endpoint is broken.
- The HTML page renders a task list and a form with no JS errors in the console.
- All interactive elements are keyboard-reachable and have visible labels.
- One intentional a11y gap exists before the fix pass (missing form label),
  then is fixed after the audit.

## Constraints
- Must-not: introduce npm dependencies.
- Must-not: commit or push anything.
- Must: pass the files-folders naming rule (lowercase, snake_case).
- Must: follow error-handling rule (no silent catches, typed errors at edges).
