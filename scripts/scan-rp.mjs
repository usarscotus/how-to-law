#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = fileURLToPath(new URL('.', import.meta.url));
const ROOT = path.resolve(scriptDir, '..');
const SOURCE_DIR = path.join(ROOT, 'src');
const ALLOWED_EXTENSIONS = new Set(['.mdx', '.astro', '.tsx', '.ts']);
const IGNORED_SUFFIX = path.join('scotus-practice', '01-overview.mdx');

const PATTERNS = [
  { label: '"RP "', regex: /RP /g },
  { label: '"RP:"', regex: /RP:/g },
  { label: '"roleplay"', regex: /roleplay/gi },
  { label: '"role-play"', regex: /role-play/gi },
  { label: '"direct appeal"', regex: /direct appeal/gi },
];

async function* walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function shouldScan(filePath) {
  const ext = path.extname(filePath);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return false;
  }
  return !filePath.endsWith(IGNORED_SUFFIX);
}

function findMatches(contents) {
  const lines = contents.split(/\r?\n/);
  const occurrences = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    for (const { label, regex } of PATTERNS) {
      regex.lastIndex = 0;
      if (regex.test(line)) {
        occurrences.push({
          line: i + 1,
          pattern: label,
          snippet: line.trim(),
        });
      }
    }
  }

  return occurrences;
}

async function main() {
  const flaggedFiles = [];

  try {
    for await (const filePath of walk(SOURCE_DIR)) {
      if (!shouldScan(filePath)) continue;
      const contents = await readFile(filePath, 'utf8');
      const matches = findMatches(contents);
      if (matches.length > 0) {
        flaggedFiles.push({ filePath, matches });
      }
    }
  } catch (error) {
    console.error('Error while scanning:', error);
    process.exitCode = 1;
    return;
  }

  if (flaggedFiles.length === 0) {
    console.log('No prohibited language detected.');
    process.exitCode = 0;
    return;
  }

  console.error('Prohibited language detected in the following files:');
  for (const { filePath, matches } of flaggedFiles) {
    console.error(`\n- ${path.relative(ROOT, filePath)}`);
    for (const { line, pattern, snippet } of matches) {
      console.error(`  L${line}: ${pattern} -> ${snippet}`);
    }
  }
  console.error(`\nTotal files flagged: ${flaggedFiles.length}`);
  process.exitCode = 1;
}

await main();
