# Security Policy

## Supported versions

Security updates apply to the **latest GitHub Release** of this catalog only.

| Line | Supported |
|------|-----------|
| Current `v*` Release | yes |
| Older tags | no — upgrade before reporting issues that may already be fixed |

## Scope

agent-tools is a **catalog of agent artifacts** (agents, skills, rules, profiles, scripts) plus a Master pack zip. Security-relevant areas include:

- Malicious or unsafe instructions in catalog artifacts
- CI / release workflows (tag publish, zip contents)
- Scripts under `scripts/` that run on a machine
- Path handling in living checks (`docs/sandbox/demo`)

Reports about **agentry the installer** belong in [agentry](https://github.com/mhmdreza-rafiei/agentry), unless this catalog's files are what caused the issue.

## Reporting a vulnerability

**Do not** open a public GitHub issue or discussion for security vulnerabilities.

### Preferred: GitHub private reporting

1. Repository **Security** tab → **Advisories** → **Report a vulnerability**  
   https://github.com/mhmdreza-rafiei/agent-tools/security/advisories/new
2. Include:
   - Tag or commit (`git describe --tags`)
   - Artifact path (`agents/…`, `skills/…`, `scripts/…`)
   - Impact and steps to reproduce
   - Whether you want to be credited

### What to expect

| Stage | Typical timing |
|-------|----------------|
| Acknowledgement | Within 7 days |
| Status update | At least every 14 days while open |
| Fix / advisory (if accepted) | As soon as practical |

If accepted: fix, optional credit, advisory and/or patched Release.  
If declined: a short reason. Please wait **90 days** from acknowledgement before public disclosure unless we agree sooner.

## Safe harbor

No legal action against researchers who act in good faith, avoid data destruction and service disruption, do not exploit beyond demonstration, and report privately as above.

## Non-security bugs

Use GitHub Issues (or Discussions for questions).
