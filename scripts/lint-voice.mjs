import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const roots = ['src/content', 'src/pages'];

const disallowedPhrases = [
  { phrase: 'in this article', suggestion: 'Lead with the action your reader must take.' },
  { phrase: "we'll explore", suggestion: 'State the action or answer directly.' },
  { phrase: 'cutting-edge', suggestion: 'Use neutral descriptors of the rule or process.' },
  { phrase: 'as an ai', suggestion: 'Remove AI persona language.' },
  { phrase: 'our firm', suggestion: 'Stick to neutral voice and avoid sales framing.' },
  { phrase: 'consult with our', suggestion: 'Provide concrete steps instead of pitching services.' },
  { phrase: 'professional services', suggestion: 'Focus on the procedure, not a service offering.' },
  { phrase: 'reach out to our team', suggestion: 'Give the legal step instead of a contact pitch.' },
  { phrase: 'contact our experts', suggestion: 'Give a direct instruction or citation instead.' },
  { phrase: 'state-of-the-art', suggestion: 'Use precise legal terminology without hype.' },
  { phrase: 'leverage our expertise', suggestion: 'Explain the process plainly without marketing tone.' }
];

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else if (entry.isFile() && (/\.mdx$/i.test(entry.name) || /\.astro$/i.test(entry.name))) {
      yield fullPath;
    }
  }
}

async function lint() {
  const issues = [];

  for (const root of roots) {
    if (!(await pathExists(root))) continue;

    for await (const filePath of walk(root)) {
      const content = await readFile(filePath, 'utf8');
      const lines = content.split(/\r?\n/);
      lines.forEach((line, index) => {
        const lowerLine = line.toLowerCase();
        disallowedPhrases.forEach(({ phrase, suggestion }) => {
          if (lowerLine.includes(phrase)) {
            issues.push({
              location: `${path.relative(process.cwd(), filePath)}:${index + 1}`,
              phrase,
              suggestion
            });
          }
        });
      });
    }
  }

  if (issues.length > 0) {
    console.log('\nVoice lint found discouraged phrasing:');
    console.table(issues);
    process.exit(1);
  } else {
    console.log('Voice lint passed.');
  }
}

lint().catch((error) => {
  console.error('Voice lint failed to run:', error);
  process.exit(1);
});
