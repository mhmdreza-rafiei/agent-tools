---
name: release
description: Cut a release end-to-end — generate the changelog from commits, bump the version per the project's scheme, tag, and produce release notes. Automation-first; asks only for the bump type or target version. Use whenever the user wants to cut a release, ship a version, generate a changelog, or runs /release.
author: mhmdreza_rafiei
---

# /release

Cut a release as one consistent operation: changelog → version bump → tag →
notes. A release done by hand drifts (forgotten changelog, wrong bump, missing
tag); this skill makes the four steps agree.

## When to use

When the user says "cut a release", "ship a version", "generate the
changelog"; on `/release`; before announcing a version.

## Commands

- `/release <major|minor|patch>` — bump per semver and cut.
- `/release <version>` — cut a specific version (e.g. `/release 2.0.0`).
- `/release --dry-run` — print the changelog + tag without writing.

## Step 1 — Detect the version scheme

- Read the manifest (`package.json`, `pyproject.toml`, `Cargo.toml`,
  `VERSION`, git tags) to find the current version and the scheme (semver,
  calver, custom).
- If no scheme is detectable, ask once which to use.

## Step 2 — Generate the changelog

- Collect commits since the last tag using Conventional Commits:
  `feat` → Features, `fix` → Fixes, `perf` → Performance, `docs` → Docs,
  `refactor`/`chore` → Maintenance (collapse if noisy).
- Group by type; one line per commit, scope in parens.
- Append an "Unreleased" → "<version>" heading.

## Step 3 — Bump + tag

- Bump per the requested type or explicit version.
- Update the manifest(s) in one commit: `chore(release): vX.Y.Z`.
- Tag `vX.Y.Z` on that commit. Do not push unless the user asks.

## Step 4 — Release notes

- A short summary (1–3 lines) of what this release is about.
- The grouped changelog from step 2.
- Breaking changes (if any) called out at the top.

## Output

- `CHANGELOG.md` updated (or created).
- Manifest version bumped.
- Tag `vX.Y.Z` created (not pushed).
- Release notes printed to chat.

## Constraints

- Follow `rule/global/git-workflow`: never push without explicit user ask; never rewrite history without permission.
- Conventional Commits only; if the repo has non-conforming commits, list them and ask before guessing their type.
- Do not include secrets or uncommitted files in the release commit.

## Related artifacts

- `rule/global/git-workflow` *(load first)* — governs the commits and the tag.
- `scripts/release` — automate this skill end-to-end once stable.
- `/context/remember` — save the released version for the next session.

## After you finish

Plain-language summary: version released, what's in it (counts by type), any
breaking changes, and the tag name (and that it has not been pushed unless
asked).
