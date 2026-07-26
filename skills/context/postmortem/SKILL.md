---
name: postmortem
description: Write a postmortem from an incident timeline and contributing factors — timeline, impact, root cause, contributing factors, action items with owners. Automation-first; asks only when the timeline is unclear. Use whenever the user wants to write a postmortem, an incident report, or runs /postmortem, after /recover has stabilized the incident.
author: mhmdreza_rafiei
---

# /postmortem

Write the **postmortem** after an incident is stabilized. `/recover` stops the
bleeding; postmortem explains how the bleeding started and how to prevent it
next time. Blameless — focus on systems, not people.

## When to use

After `/recover` has stabilized an incident; when the user says "write a
postmortem" or "post-incident report"; on `/postmortem`.

## Commands

- `/postmortem` — write from the incident timeline in context.
- `/postmortem <incident>` — write a named incident.
- `/postmortem update` — merge new findings into an existing postmortem.

## Step 1 — Gather the timeline

- Read logs, chat threads, deploys, alerts from the incident window.
- If the timeline is unclear, ask for the start/end markers (max 2 questions).

## Step 2 — Write the postmortem

Write to `context/memory/incidents/<date>-<slug>.md`. Use this shape — omit
empty sections:

```markdown
# <incident> — postmortem (<date>)

## Summary
<1–3 lines: what happened, impact, duration>

## Impact
- Users / requests / data affected: <numbers>
- Duration: <window>

## Timeline
- <time> — <event>
- <time> — <event>

## Root cause
<the proximate cause, verified>

## Contributing factors
- <factor — e.g. missing alert, slow rollback, untested path>

## What went well
- <e.g. fast detection, clean rollback>

## Action items
- [ ] <action> — owner: <name/team> — by <date>
```

## Step 3 — Verify

- Root cause is labeled verified or `> NEEDS VERIFICATION` if not confirmed.
- Every action item has an owner and a date; no ownerless items.
- Blameless — no person named as a cause; only systems and processes.

## Constraints

- Blameless: people don't cause incidents, systems do.
- Distinguish root cause (proximate) from contributing factors (conditions that made it worse).
- Do not invent impact numbers; mark unknowns.
- Trust runtime evidence over recollection.

## Related artifacts

- `/context/recover` *(load first)* — stabilized the incident this documents.
- `/context/remember` — save the postmortem path for the next session.
- `agents/devops/incident-responder` — owns the response this reviews.
- `rule/global/git-workflow` — governs any fix commits referenced.

## After you finish

Plain-language summary: what the incident was, its impact, the verified
root cause, and the action items with owners and dates.
