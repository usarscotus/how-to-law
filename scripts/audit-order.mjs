import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const classroomDir = path.resolve(__dirname, '../src/content/classroom');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && path.extname(entry.name) === '.mdx') {
      files.push(fullPath);
    }
  }

  return files;
}

function formatList(items) {
  if (!items.length) {
    return '-';
  }

  return items.map((item) => `• ${item}`).join('\n');
}

async function main() {
  const mdxFiles = await walk(classroomDir);
  const results = new Map();

  for (const filePath of mdxFiles) {
    const relativePath = path.relative(classroomDir, filePath);
    const [moduleName] = relativePath.split(path.sep);

    if (!moduleName) continue;

    if (!results.has(moduleName)) {
      results.set(moduleName, {
        missing: [],
        seenOrders: new Map(),
      });
    }

    const moduleData = results.get(moduleName);
    const content = await readFile(filePath, 'utf8');
    const { data } = matter(content);
    const order = data?.order;

    if (order === undefined || order === null) {
      moduleData.missing.push(relativePath);
      continue;
    }

    const orderKey = String(order);
    const existing = moduleData.seenOrders.get(orderKey) ?? [];
    existing.push(relativePath);
    moduleData.seenOrders.set(orderKey, existing);
  }

  const tableData = [];

  for (const [moduleName, moduleData] of [...results.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    const duplicateEntries = [];

    for (const [order, files] of moduleData.seenOrders.entries()) {
      if (files.length > 1) {
        duplicateEntries.push(`order ${order}: ${files.join(', ')}`);
      }
    }

    if (moduleData.missing.length || duplicateEntries.length) {
      tableData.push({
        Module: moduleName,
        'Missing order fields': formatList(moduleData.missing),
        'Duplicate order values': formatList(duplicateEntries),
      });
    }
  }

  if (tableData.length === 0) {
    console.log('No missing or duplicate order fields found.');
    process.exit(0);
  }

  console.log('Order audit issues found:');
  console.table(tableData);
  process.exit(1);
}

main().catch((error) => {
  console.error('Error running order audit:', error);
  process.exit(1);
});
