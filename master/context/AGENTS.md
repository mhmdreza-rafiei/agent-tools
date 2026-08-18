# Master — for the AI

Default operating pack for **any person or team**. Not a per-user fork. Humans read the PDFs in the parent folder. You read this directory.

## Start each session

1. Read `rules.md` (standing rules for this pack).
2. Identify the workflow: human tells you which track, or you infer from the prompt.
   - `workflow/new.md` — new project, greenfield
   - `workflow/inherited.md` — existing codebase, targeted change
   - `workflow/research.md` — question, answer, or plan (no files)
   - `workflow/debug.md` — production issue, incident, root cause
   - `workflow/review.md` — PR or merge review, architecture audit
3. Read that workflow file.
4. Treat the human's filled `checklist.md` as the contract. Blank lines are blockers.
5. Do not invent product facts, metrics, stack, or biography.
6. Run verification commands before claiming done. Do not commit or push unless they said so.

## Layout (human PDFs ↔ AI markdown pairs)

| Human (parent folder) | You (this folder) | Workflow |
|-----------------------|-------------------|----------|
| `start.pdf` | `start.md` | Entry point for all sessions |
| `checklist.pdf` | `checklist.md` | Spec template (all tracks) |
| `roadmap.pdf` | `roadmap.md` | Maturity rungs (all teams) |
| `new.pdf` | `workflow/new.md` | Greenfield projects |
| `inherited.pdf` | `workflow/inherited.md` | Existing repos |
| `research.pdf` | `workflow/research.md` | Q&A, no implementation |
| `debug.pdf` | `workflow/debug.md` | Incident response |
| `review.pdf` | `workflow/review.md` | PR & architecture review |
| `rules.pdf` | `rules.md` | Always-on constraints |
| — | `practices.md` | Research-backed operating patterns |
| — | `sources.md` | Evidence (not for printing) |

## Catalog tie-in

Load these **by id** from the agent-tools catalog (agentry or a clone). Do not invent names.

| Track | Agents | Skills | Rules / profiles |
|-------|--------|--------|------------------|
| New | `frontend/frontend-developer`, `backend/full-stack-developer`, `backend/backend-architect` | `workflow/spec`, `workflow/scaffold`, `context/groundwork` | `global/ask-dont-guess`, `global/ponytail`, `global/git-workflow`, `global/files-folders-structure`; profile `starter` or `fullstack` |
| Inherited | `dx/codebase-onboarder`, `backend/full-stack-developer`, `qa/code-reviewer` | `workflow/spec`, `context/architect`, `context/groundwork` | same globals + `code/testing`; profile `fullstack` |
| Research | — | `enhance-prompt` | `global/ask-dont-guess`, `prompt-quality` |
| Debug | `qa/debugger`, `devops/incident-responder`, `devops/devops-incident-responder` | `workflow/triage`, `context/postmortem` | `code/error-handling`, `code/testing`, `observability` |
| Review | `qa/code-reviewer`, `qa/architect-review`, `qa/accessibility-auditor`, `security-auditor` | `audit/a11y`, `context/review`, `workflow/spec` | `code/accessibility`, `security`, `code/testing`; profile `qa` or `security` |

Install with `agentry add` / a profile. Standing rules stay short; skills load when the track needs them.

## Do not

- Do not build a custom Master in someone else's home folder.
- Do not dump markdown into PDFs; keep PDFs short and track-specific.
- Do not add agentry markers (`SKILL.md`, `.mdc`) here unless asked to turn a piece into a catalog artifact.
