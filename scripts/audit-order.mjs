#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const CLASSROOM_ROOT = path.resolve(process.cwd(), 'src/content/classroom');

async function findMdxFiles(dir) {
  const results = [];
  const queue = [dir];

  while (queue.length > 0) {
    const current = queue.pop();
    const entries = await fs.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(entryPath);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mdx')) {
        results.push(entryPath);
      }
    }
  }

  return results;
}

function toModuleInfo(filePath) {
  const relativeToClassroom = path.relative(CLASSROOM_ROOT, filePath);
  const segments = relativeToClassroom.split(path.sep);
  const moduleName = segments[0];
  if (!moduleName) {
    throw new Error(`Could not determine module for file: ${filePath}`);
  }

  const relativeWithinModule = segments.slice(1).join(path.sep) || path.basename(filePath);

  return { moduleName, relativeWithinModule };
}

function normalizeOrder(rawOrder) {
  if (typeof rawOrder === 'number') {
    return Number.isFinite(rawOrder) ? rawOrder : null;
  }

  if (typeof rawOrder === 'string') {
    const trimmed = rawOrder.trim();
    if (!trimmed) {
      return null;
    }

    const numeric = Number(trimmed);
    return Number.isFinite(numeric) ? numeric : null;
  }

  return null;
}

function compressNumberRanges(numbers) {
  if (numbers.length === 0) {
    return '';
  }

  const sorted = [...new Set(numbers)].sort((a, b) => a - b);
  const ranges = [];
  let rangeStart = sorted[0];
  let previous = sorted[0];

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i];
    if (current === previous + 1) {
      previous = current;
      continue;
    }

    ranges.push([rangeStart, previous]);
    rangeStart = current;
    previous = current;
  }

  ranges.push([rangeStart, previous]);

  return ranges
    .map(([start, end]) => (start === end ? `${start}` : `${start}-${end}`))
    .join(', ');
}

function renderTable(rows) {
  const processedRows = rows.flatMap(([issue, detail]) => {
    const detailLines = detail.split('\n');
    return detailLines.map((line, index) => [index === 0 ? issue : '', line]);
  });

  const header = ['Issue', 'Details'];
  const allRows = [header, ...processedRows];
  const colWidths = [0, 0];

  for (const row of allRows) {
    row.forEach((cell, index) => {
      colWidths[index] = Math.max(colWidths[index], cell.length);
    });
  }

  const borders = {
    top: `┌${'─'.repeat(colWidths[0] + 2)}┬${'─'.repeat(colWidths[1] + 2)}┐`,
    middle: `├${'─'.repeat(colWidths[0] + 2)}┼${'─'.repeat(colWidths[1] + 2)}┤`,
    bottom: `└${'─'.repeat(colWidths[0] + 2)}┴${'─'.repeat(colWidths[1] + 2)}┘`,
  };

  const formatRow = (row) =>
    `│ ${row[0].padEnd(colWidths[0])} │ ${row[1].padEnd(colWidths[1])} │`;

  const body = processedRows.length
    ? processedRows.map(formatRow).join('\n')
    : formatRow(['', '']);

  return [borders.top, formatRow(header), borders.middle, body, borders.bottom].join('\n');
}

async function audit() {
  try {
    await fs.access(CLASSROOM_ROOT);
  } catch (error) {
    console.error(`Classroom directory not found at ${CLASSROOM_ROOT}`);
    process.exitCode = 1;
    return;
  }

  const mdxFiles = await findMdxFiles(CLASSROOM_ROOT);
  const modules = new Map();

  for (const filePath of mdxFiles) {
    const { moduleName, relativeWithinModule } = toModuleInfo(filePath);
    const moduleEntry = modules.get(moduleName) ?? [];
    moduleEntry.push({ filePath, relativeWithinModule });
    modules.set(moduleName, moduleEntry);
  }

  const results = [];
  let hasBlockingIssues = false;

  for (const [moduleName, files] of Array.from(modules.entries()).sort(([a], [b]) =>
    a.localeCompare(b),
  )) {
    const missingOrders = [];
    const invalidOrders = [];
    const orderMap = new Map();

    for (const file of files) {
      let data;
      try {
        const raw = await fs.readFile(file.filePath, 'utf8');
        ({ data } = matter(raw));
      } catch (error) {
        invalidOrders.push(`${file.relativeWithinModule} (failed to parse frontmatter: ${error.message})`);
        continue;
      }

      const hasOrder = Object.prototype.hasOwnProperty.call(data, 'order');
      const normalizedOrder = normalizeOrder(data.order);

      if (!hasOrder) {
        missingOrders.push(file.relativeWithinModule);
        continue;
      }

      if (normalizedOrder === null || !Number.isInteger(normalizedOrder) || normalizedOrder <= 0) {
        invalidOrders.push(
          `${file.relativeWithinModule} (invalid order value: ${JSON.stringify(data.order)})`,
        );
        continue;
      }

      const existing = orderMap.get(normalizedOrder) ?? [];
      existing.push(file.relativeWithinModule);
      orderMap.set(normalizedOrder, existing);
    }

    const duplicateOrders = [];
    for (const [order, paths] of [...orderMap.entries()].sort((a, b) => a[0] - b[0])) {
      if (paths.length > 1) {
        duplicateOrders.push(`order ${order}: ${paths.join(', ')}`);
      }
    }

    const presentOrders = [...orderMap.keys()].sort((a, b) => a - b);
    const missingNumbers = [];

    if (presentOrders.length > 0) {
      const highest = presentOrders[presentOrders.length - 1];
      const presentSet = new Set(presentOrders);
      for (let expected = 1; expected < highest; expected += 1) {
        if (!presentSet.has(expected)) {
          missingNumbers.push(expected);
        }
      }
    }

    const gapDetails = missingNumbers.length
      ? `Missing orders: ${compressNumberRanges(missingNumbers)}`
      : '';

    const tableRows = [];

    if (missingOrders.length > 0) {
      tableRows.push(['Missing order', missingOrders.join('\n')]);
    }

    if (invalidOrders.length > 0) {
      tableRows.push(['Invalid order', invalidOrders.join('\n')]);
    }

    if (duplicateOrders.length > 0) {
      tableRows.push(['Duplicate order', duplicateOrders.join('\n')]);
    }

    if (gapDetails) {
      tableRows.push(['Gaps', gapDetails]);
    }

    if (tableRows.length === 0) {
      tableRows.push(['Status', 'OK']);
    } else {
      hasBlockingIssues ||= missingOrders.length > 0 || invalidOrders.length > 0 || duplicateOrders.length > 0;
    }

    results.push({
      moduleName,
      table: renderTable(tableRows),
    });
  }

  for (const result of results) {
    console.log(`\nModule: ${result.moduleName}`);
    console.log(result.table);
  }

  if (results.length === 0) {
    console.log('No modules found under src/content/classroom.');
  }

  if (hasBlockingIssues) {
    console.log('\nOrdering issues detected.');
    process.exitCode = 1;
  } else {
    console.log('\nAll modules have sequential lesson orders.');
  }
}

audit().catch((error) => {
  console.error('Failed to run audit:', error);
  process.exitCode = 1;
});
