#!/usr/bin/env node
// dedupe: find duplicate/near-duplicate agents and skills by description similarity.
// No external deps; Node built-ins only. Jaccard token overlap on descriptions.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const tIdx = process.argv.indexOf('--threshold');
const THRESH = tIdx !== -1 ? parseFloat(process.argv[tIdx + 1]) : 0.6;

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
  for (const l of lines.slice(1, end)) {
    const m = l.match(/^description:\s*(.+)$/);
    if (m) return { description: m[1].trim() };
  }
  return {};
}

function tokens(s) {
  return new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean));
}

function jaccard(a, b) {
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const files = [];
walk(join(root, 'agents'), '.mdc', files);
walk(join(root, 'skills'), 'SKILL.md', files);

const desc = files.map((p) => ({ path: relative(root, p), tokens: tokens(readFm(p).description || '') }));

let pairs = 0;
for (let i = 0; i < desc.length; i++) {
  for (let j = i + 1; j < desc.length; j++) {
    const s = jaccard(desc[i].tokens, desc[j].tokens);
    if (s >= THRESH) {
      console.warn(`DEDUP (${s.toFixed(2)}): ${desc[i].path}  ~  ${desc[j].path}`);
      pairs++;
    }
  }
}
if (pairs === 0) console.log('dedupe: OK -- no near-duplicate descriptions found.');
else { console.error(`dedupe: ${pairs} pair(s) above threshold.`); process.exit(1); }
