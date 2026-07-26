#!/usr/bin/env node
// backup: bundle the catalog into a git bundle (default) or tarball.
// No external deps; Node built-ins only.
import { execSync } from 'node:child_process';

const wantTar = process.argv.includes('--tar');
const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const name = `agent-tools-${ts}`;

if (wantTar) {
  const out = `${name}.tar.gz`;
  execSync(`tar -czf ${out} --exclude=node_modules --exclude=.git .`, { stdio: 'inherit' });
  console.log(`backup: wrote ${out}`);
} else {
  const out = `${name}.bundle`;
  execSync(`git bundle create ${out} --all`, { stdio: 'inherit' });
  console.log(`backup: wrote ${out} (restore with: git clone ${out} <dir>)`);
}
