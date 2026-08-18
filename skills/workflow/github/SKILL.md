---
name: github
description: Set up a GitHub repository the way this catalog and agentry do — security policy, quality CI, Dependabot, branches, tag/branch rulesets, README/releases, and community files (issues, PRs, discussions). Use when creating or hardening a GitHub repo, or on /github-setup.
author: mhmdreza_rafiei
---

# /github-setup

Make a GitHub repo **recognizable and safe**: security reporting, CI on
every push/PR, Dependabot, protected `v*` tags, a real GitHub Release
(not a folder named `releases/`), and community entry points. Match the
target repo's voice; default to this catalog's (plain English, no emoji,
Conventional Commits, no AI `Co-authored-by`).

## When to use

New GitHub repo; "add security / quality / branches / rules / tags";
hardening agent-tools or a sibling repo (agentry); `/github-setup`.

## Commands

- `/github-setup` — apply the full checklist to the current repo.
- `/github-setup --dry-run` — print the file list and `gh` calls; write nothing.
- `/github-setup --files-only` — write in-repo files; skip `gh` API (no auth).

## Step 1 — Detect

- Remote: `owner/repo`, default branch (`main` unless the repo already uses another).
- Kind: catalog (markdown/scripts, no app test suite) vs app (`package.json` scripts).
- Voice: README / AGENTS.md / LICENSE. Do not invent a credits section if the repo forbids it.
- Whether `gh` is authenticated. If not, do files-only and print the API commands.

## Step 2 — Community files (in the tree)

Write only what is missing or stale. Names are GitHub-mandated where noted.

| Path | Purpose |
|------|---------|
| `SECURITY.md` | Private advisory reporting. No public issues for vulns. |
| `CONTRIBUTING.md` | Point at AGENTS.md / CI commands. Short. |
| `.github/CODEOWNERS` | `* @<owner>` |
| `.github/pull_request_template.md` | Conventional Commits, no secrets, how verified |
| `.github/ISSUE_TEMPLATE/config.yml` | Route security to advisories; optional Discussions |
| `.github/ISSUE_TEMPLATE/bug.yml` | Repro, expected, actual |
| `.github/DISCUSSION_TEMPLATE/q-and-a.yml` | Community Q&A when Discussions is on |

Skip `CODE_OF_CONDUCT` / `FUNDING` unless the target repo already has them.

`SECURITY.md` must name **this** repo's URL and scope (do not copy agentry's npm-package scope onto a catalog).

## Step 3 — Quality CI + Dependabot

- `.github/workflows/ci.yml` — on `push`/`pull_request` to `main` (and `dev` if that branch exists). `permissions: contents: read`.
- Pin `actions/checkout` and `actions/setup-node` by **commit SHA** (same pins agentry uses; see `references/files.md`).
- Catalog repos: `lint-artifacts`, `check-compat`, `validate-profiles`, `audit-catalog`, plus any living check (e.g. `docs/sandbox/demo/check.js`).
- App repos: the project's own `typecheck` / `test` / `build`.
- `.github/dependabot.yml` — `github-actions` weekly; `npm` weekly only if a root lockfile exists.

## Step 4 — Releases and tags

- GitHub **Releases** sidebar = annotated tags `v*`, not a folder named `releases/`.
- Workflow on `v*` tags: attach the built zip/assets (`gh release create`).
- Store tag protection in `.github/rulesets/protect-version-tags.json` (deletion / non-fast-forward / update blocked).
- Store main protection in `.github/rulesets/protect-main.json` (no delete, no force-push). Do **not** require PR reviews on a solo-maintainer repo unless they asked — that locks `git push origin main`.

## Step 5 — Branches

- Keep `main` as default.
- Create `dev` only if the project already uses a two-branch flow (agentry CI listens on `main` and `dev`). Empty `dev` with no process is ceremony — skip unless they want it.
- CI must list every branch it should run on.

## Step 6 — Apply with `gh` (skip on `--files-only`)

Exact calls: `references/api.md`. At minimum:

1. Enable private vulnerability reporting.
2. Enable Discussions if they asked for community chats (this catalog: yes).
3. PUT/POST repository rulesets from `.github/rulesets/*.json`.
4. Topics: keep existing; add only what the README already claims.

Do not change `git config`. Do not force-push. Do not skip hooks.

## Step 7 — Verify

- Repo **Security** tab: policy + private reporting.
- **Actions**: CI green on the default branch.
- **Releases**: at least one `v*` Release if they already ship; otherwise the workflow is ready for the next tag.
- **Insights → Community standards**: SECURITY, README, LICENSE, CONTRIBUTING present.
- Discussions (if enabled): Q&A template visible.

## Constraints

- Follow `rule/global/git-workflow` and `rule/github`.
- Conventional Commits for the setup commit: `ci:` / `docs:` / `feat(skills):` as appropriate.
- No secrets in files or logs.
- Do not require paid GitHub features.

## Related artifacts

- `rule/github` *(load first)* — when to touch `.github/` and SECURITY.
- `rule/global/git-workflow` — tags, push, no history rewrite.
- `rule/security` — reporting and secrets.
- `scripts/github` — apply rulesets / reporting when `gh` is available.
- `scripts/release` — cut `v*` so the release workflow can publish.
- `workflow/release` — changelog + bump + tag.

## After you finish

Plain-language summary: files added, `gh` calls that succeeded or were skipped, CI/release URLs, and what the human still must click in GitHub settings if the API cannot do it.
