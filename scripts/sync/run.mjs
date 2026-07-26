#!/usr/bin/env node
// sync: thin wrapper around `agentry add` to install this catalog into a target.
// No external deps; Node built-ins only.
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('sync: usage: node scripts/sync/run.mjs <target-path> [--profile <name>]');
  process.exit(1);
}

const target = resolve(args[0]);
const profileIdx = args.indexOf('--profile');
const profile = profileIdx !== -1 ? args[profileIdx + 1] : null;

const cmd = profile
  ? `agentry add "${target}" --from . --profile ${profile}`
  : `agentry add "${target}" --from .`;

console.log(`sync: running -> ${cmd}`);
execSync(cmd, { stdio: 'inherit' });
console.log('sync: done.');
