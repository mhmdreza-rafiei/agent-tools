#!/usr/bin/env node
// gen-index: regenerate the catalog tables in README.md from the live tree.
// No external deps; Node built-ins only.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const readme = join(root, 'README.md');
const START = '<!-- catalog-start -->';
const END = '<!-- catalog-end -->';

function walk(dir, ext, out) {
  if (!existsSync(dir)) return;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, ext, out);
    else if (e.name.endsWith(ext)) out.push(p);
  }
}

function readFm(path) {
  const text = readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/);
  if (lines[0] !== '---') return {};
  let end = -1;
  for (let i = 1; i < lines.length; i++) if (lines[i] === '---') { end = i; break; }
  if (end === -1) return {};
  const fm = {};
  for (const l of lines.slice(1, end)) {
    const m = l.match(/^(\w+):\s*(.+)$/);
    if (m) fm[m[1]] = m[2].trim();
  }
  return fm;
}

function descOf(path) {
  const fm = readFm(path);
  let d = fm.description || '';
  if (d.length > 90) d = d.slice(0, 87) + '...';
  return d;
}

function table(kind, files) {
  const rows = files.map((p) => {
    const rel = relative(root, p).replace(/\\/g, '/');
    const id = rel.replace(new RegExp(`^${kind}/`), '').replace(/\.mdc$/, '').replace(/\/SKILL\.md$/, '');
    return `| \`${id}\` | ${descOf(p)} |`;
  });
  return `| Path | Description |\n|------|-------------|\n${rows.join('\n')}`;
}

const agents = []; walk(join(root, 'agents'), '.mdc', agents);
const rules = []; walk(join(root, 'rules'), '.mdc', rules);
const skills = []; walk(join(root, 'skills'), 'SKILL.md', skills);

const body = [
  '### Agents', '', table('agents', agents), '',
  '### Rules', '', table('rules', rules), '',
  '### Skills', '', table('skills', skills), '',
].join('\n');

let text = readFileSync(readme, 'utf8');
const s = text.indexOf(START);
const e = text.indexOf(END);
if (s === -1 || e === -1) {
  console.error('gen-index: README.md missing catalog markers.');
  process.exit(1);
}
const out = text.slice(0, s + START.length) + '\n' + body + '\n' + text.slice(e);
writeFileSync(readme, out, 'utf8');
console.log('gen-index: README.md catalog tables regenerated.');
