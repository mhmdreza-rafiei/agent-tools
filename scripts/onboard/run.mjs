#!/usr/bin/env node
// onboard: print a contributor onboarding guide built from the live tree.
// No external deps; Node built-ins only.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function count(dir, ext) {
  if (!existsSync(join(root, dir))) return 0;
  let n = 0;
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(ext)) n++;
    }
  };
  walk(join(root, dir));
  return n;
}

const agents = count('agents', '.mdc');
const rules = count('rules', '.mdc');
const skills = count('skills', 'SKILL.md');
const profiles = existsSync(join(root, 'profiles'))
  ? readdirSync(join(root, 'profiles')).filter((f) => f.endsWith('.yaml')).length : 0;

const guide = [
  '# Welcome to agent-tools',
  '',
  'agent-tools is an agentry-compatible catalog of agents, skills, rules,',
  'profiles, and scripts. This guide gets you to your first PR.',
  '',
  '## 1. Read the context',
  '- AGENTS.md - repo layout and artifact conventions (start here).',
  '- README.md - what the catalog is and how to install it.',
  '- docs/proposals.md - ideas for new artifacts.',
  '',
  '## 2. The catalog right now',
  `- ${agents} agents (agents/...)`,
  `- ${rules} rules (rules/...)`,
  `- ${skills} skills (skills/.../SKILL.md)`,
  `- ${profiles} profiles (profiles/*.yaml)`,
  '',
  '## 3. Conventions to follow',
  '- Every artifact has `author: mhmdreza_rafiei` in frontmatter.',
  '- Agents and rules use .mdc; skills use SKILL.md; profiles use .yaml.',
  '- Categorize into subfolders; avoid single-item subfolders.',
  '',
  '## 4. Your first PR',
  '1. Pick a proposed artifact from docs/proposals.md (or fix a gap you found).',
  '2. Run `node scripts/lint-artifacts/run.mjs` and `node scripts/check-compat/run.mjs`.',
  '3. Commit with Conventional Commits (feat/fix/docs/chore/...).',
  '4. Open the PR; the CI gate runs check-compat.',
  '',
].join('\n');

console.log(guide);
