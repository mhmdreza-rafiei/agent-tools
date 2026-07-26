#!/usr/bin/env node
// lint-artifacts: validate frontmatter (author) and extensions across the catalog.
// No external deps; Node built-ins only.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const AUTHOR = 'mhmdreza_rafiei';
let violations = 0;

function readFrontmatter(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') return null;
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return null;
  return lines.slice(1, end).join('\n');
}

function checkAuthor(filePath, kind) {
  const fm = readFrontmatter(filePath);
  if (fm === null) {
    console.warn(`FAIL ${kind}: ${relative(root, filePath)} -- no frontmatter`);
    violations++;
    return;
  }
  if (!new RegExp(`^author:\\s*${AUTHOR}\\s*$`, 'm').test(fm)) {
    console.warn(`FAIL ${kind}: ${relative(root, filePath)} -- missing or wrong author`);
    violations++;
  }
}

function walk(dir, ext, cb) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, cb);
    else if (e.isFile() && e.name.endsWith(ext)) cb(p);
  }
}

// agents: must be .mdc, must have author
walk(join(root, 'agents'), '.mdc', (p) => checkAuthor(p, 'agent'));
// flag any stray .md files in agents/ (wrong extension)
walk(join(root, 'agents'), '.md', (p) => {
  console.warn(`FAIL agent: ${relative(root, p)} -- .md extension (must be .mdc)`);
  violations++;
});

// rules: must be .mdc, must have author
walk(join(root, 'rules'), '.mdc', (p) => checkAuthor(p, 'rule'));

// skills: SKILL.md must have author
walk(join(root, 'skills'), 'SKILL.md', (p) => checkAuthor(p, 'skill'));

if (violations === 0) {
  console.log(`lint-artifacts: OK -- all artifacts have author: ${AUTHOR} and correct extensions.`);
} else {
  console.error(`lint-artifacts: ${violations} violation(s) found.`);
  process.exit(1);
}
