#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

import { collectFiles, moveFile, readFile, writeFile } from './common/fs-utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CLASSROOM_DIR = path.join(ROOT_DIR, 'src/content/classroom');

const MODULE_DEFINITIONS = [
  {
    id: 'foundations',
    label: 'Foundations',
    folder: 'foundations',
    aliases: ['foundation', 'intro', 'basics'],
  },
  {
    id: 'courts',
    label: 'Courts',
    folder: 'courts',
    aliases: ['court', 'court-system', 'the-courts'],
  },
  {
    id: 'constitutional-law',
    label: 'Constitutional Law',
    folder: 'constitutional-law',
    aliases: ['con-law', 'constitutional', 'constitution'],
  },
  {
    id: 'criminal-law',
    label: 'Criminal Law',
    folder: 'criminal-law',
    aliases: ['crim-law', 'criminal', 'crimlaw'],
  },
  {
    id: 'crim-pro',
    label: 'Criminal Procedure',
    folder: 'crim-pro',
    aliases: [
      'crim-procedure',
      'crim-proc',
      'criminal-procedure',
      'crimproc',
      'crim-pro',
      'crimprocedure',
      'crimpro',
      'criminal-proc',
    ],
  },
  {
    id: 'civil-procedure',
    label: 'Civil Procedure',
    folder: 'civil-procedure',
    aliases: ['civil-pro', 'civilprocedure', 'civ-pro', 'civpro', 'civil-proc', 'civ-procedure'],
  },
  {
    id: 'evidence',
    label: 'Evidence',
    folder: 'evidence',
    aliases: ['rules-of-evidence'],
  },
  {
    id: 'remedies',
    label: 'Remedies',
    folder: 'remedies',
    aliases: ['equitable-remedies', 'remedy'],
  },
  {
    id: 'scotus-practice',
    label: 'SCOTUS Practice',
    folder: 'scotus-practice',
    aliases: ['scotus', 'supreme-court-practice', 'scotus-prac'],
  },
];

const aliasLookup = buildAliasLookup(MODULE_DEFINITIONS);

const args = new Set(process.argv.slice(2));
const applyChanges = args.has('--apply');
const dryRun = args.has('--dry') || !applyChanges;

if (args.has('--help') || args.has('-h')) {
  console.log(`Usage: node scripts/unify-modules.mjs [--apply|--dry]\n`);
  console.log('  --apply  Write changes to disk.');
  console.log('  --dry    Explicit dry run (default).');
  process.exit(0);
}

if (applyChanges && args.has('--dry')) {
  console.error('Cannot use --apply and --dry together.');
  process.exit(1);
}

function buildAliasLookup(definitions) {
  const map = new Map();
  for (const def of definitions) {
    const allKeys = new Set([def.id, def.folder, ...(def.aliases ?? [])]);
    for (const key of allKeys) {
      map.set(normalizeModuleKey(key), def.id);
    }
  }
  return map;
}

function normalizeModuleKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getDefinitionById(id) {
  return MODULE_DEFINITIONS.find((def) => def.id === id);
}

function resolveModuleId({ moduleValue, folderName }) {
  const normalized = normalizeModuleKey(moduleValue);
  if (normalized && aliasLookup.has(normalized)) {
    return aliasLookup.get(normalized);
  }

  const normalizedFolder = normalizeModuleKey(folderName);
  if (normalizedFolder && aliasLookup.has(normalizedFolder)) {
    return aliasLookup.get(normalizedFolder);
  }

  return null;
}

function reorderFrontmatterKeys(data, moduleId, moduleLabel) {
  const order = [...Object.keys(data)];
  if (!order.includes('module')) {
    order.unshift('module');
  }

  const modulePositionHint = order.indexOf('module');
  const desiredLabelIndex = modulePositionHint + 1;
  const currentLabelIndex = order.indexOf('moduleLabel');

  if (currentLabelIndex === -1) {
    order.splice(Math.min(desiredLabelIndex, order.length), 0, 'moduleLabel');
  } else if (currentLabelIndex !== desiredLabelIndex) {
    order.splice(currentLabelIndex, 1);
    order.splice(Math.min(desiredLabelIndex, order.length), 0, 'moduleLabel');
  }

  const entries = [];
  const seen = new Set();

  for (const key of order) {
    if (seen.has(key)) continue;
    seen.add(key);
    if (key === 'module') {
      if (moduleId != null) {
        entries.push(['module', moduleId]);
      }
    } else if (key === 'moduleLabel') {
      if (moduleLabel != null) {
        entries.push(['moduleLabel', moduleLabel]);
      }
    } else if (Object.prototype.hasOwnProperty.call(data, key)) {
      entries.push([key, data[key]]);
    }
  }

  const hasModule = entries.some(([key]) => key === 'module');
  if (!hasModule && moduleId != null) {
    entries.unshift(['module', moduleId]);
  }

  const moduleIndex = entries.findIndex(([key]) => key === 'module');
  const hasModuleLabel = entries.some(([key]) => key === 'moduleLabel');
  if (!hasModuleLabel && moduleLabel != null) {
    if (moduleIndex === -1) {
      entries.push(['moduleLabel', moduleLabel]);
    } else {
      entries.splice(moduleIndex + 1, 0, ['moduleLabel', moduleLabel]);
    }
  }

  return Object.fromEntries(entries);
}

function buildSummaryRow({
  relativePath,
  moduleChange,
  labelChange,
  moved,
  note,
}) {
  return {
    file: relativePath,
    module: moduleChange || '',
    moduleLabel: labelChange || '',
    moved: moved || '',
    note: note || '',
  };
}

async function processFile(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  const relativeToClassroom = path.relative(CLASSROOM_DIR, filePath);
  const [folderName, ...restSegments] = relativeToClassroom.split(path.sep);
  const originalContent = await readFile(filePath);
  const parsed = matter(originalContent);
  const data = { ...parsed.data };

  const originalModuleValue = data.module ?? data.moduleId ?? data.moduleID ?? null;
  const moduleId = resolveModuleId({ moduleValue: originalModuleValue, folderName });
  const definition = moduleId ? getDefinitionById(moduleId) : null;

  let moduleChange = '';
  let labelChange = '';
  let note = '';
  let moved = '';
  let finalContent = originalContent;

  if (!definition) {
    note = 'Unrecognized module';
    return buildSummaryRow({ relativePath, moduleChange, labelChange, moved, note });
  }

  const desiredFolder = definition.folder;
  const desiredModuleLabel = definition.label;

  const dataWithUpdates = { ...data };
  const originalModuleId = dataWithUpdates.module ?? null;
  if (originalModuleId !== moduleId) {
    moduleChange = `${originalModuleId ?? '(none)'} → ${moduleId}`;
  }
  dataWithUpdates.module = moduleId;

  const originalLabel = dataWithUpdates.moduleLabel ?? null;
  if (originalLabel !== desiredModuleLabel) {
    labelChange = `${originalLabel ?? '(none)'} → ${desiredModuleLabel}`;
  }
  dataWithUpdates.moduleLabel = desiredModuleLabel;

  const shouldRewrite = Boolean(moduleChange || labelChange);
  let contentChanged = false;

  if (shouldRewrite) {
    const reorderedData = reorderFrontmatterKeys(dataWithUpdates, moduleId, desiredModuleLabel);
    finalContent = matter.stringify(parsed.content, reorderedData, {
      lineWidth: Number.MAX_SAFE_INTEGER,
    });
    contentChanged = finalContent !== originalContent;
  }

  const relativeRest = restSegments.length ? path.join(...restSegments) : path.basename(filePath);
  const desiredRelativePath = path.join(desiredFolder, relativeRest);
  const desiredFullPath = path.join(CLASSROOM_DIR, desiredRelativePath);

  if (path.normalize(filePath) !== path.normalize(desiredFullPath)) {
    const fromFolder = folderName
      ? path.join('src/content/classroom', folderName)
      : 'src/content/classroom';
    const toFolder = path.join('src/content/classroom', desiredFolder);
    moved = `${fromFolder} → ${toFolder}`;
  }

  if (!dryRun) {
    if (moved) {
      await moveFile(filePath, desiredFullPath);
    }
    if (contentChanged || moved) {
      await writeFile(desiredFullPath, finalContent);
    }
  }

  if (dryRun && (contentChanged || moved)) {
    note = 'Dry run';
  }

  return buildSummaryRow({ relativePath, moduleChange, labelChange, moved, note });
}

async function main() {
  const mdxFiles = await collectFiles(CLASSROOM_DIR, {
    filter: (filePath) => filePath.endsWith('.mdx'),
  });

  const summaryRows = [];
  const errors = [];

  for (const filePath of mdxFiles) {
    try {
      const row = await processFile(filePath);
      summaryRows.push(row);
    } catch (error) {
      errors.push({ file: path.relative(ROOT_DIR, filePath), error });
    }
  }

  const changedRows = summaryRows.filter(
    (row) => row.module || row.moduleLabel || row.moved || row.note,
  );

  if (changedRows.length) {
    console.log('\nModule normalization summary');
    console.table(changedRows);
  } else {
    console.log('No module normalization changes detected.');
  }

  console.log(`\nInspected ${summaryRows.length} MDX file(s).`);

  if (dryRun && changedRows.length) {
    console.log('\nDry run complete. Re-run with --apply to write changes.');
  } else if (!dryRun && changedRows.length) {
    console.log('\nModule metadata updates applied.');
  }

  if (errors.length) {
    console.error('\nErrors encountered:');
    for (const { file, error } of errors) {
      console.error(` - ${file}:`, error.message);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
