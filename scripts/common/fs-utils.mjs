import fs from 'node:fs/promises';
import path from 'node:path';

export async function readFile(filePath) {
  return fs.readFile(filePath, 'utf8');
}

export async function writeFile(filePath, contents) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, contents, 'utf8');
}

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    if (error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
      return false;
    }
    throw error;
  }
}

export async function moveFile(srcPath, destPath) {
  if (srcPath === destPath) {
    return;
  }
  await ensureDir(path.dirname(destPath));
  await fs.rename(srcPath, destPath);
}

export async function collectFiles(rootDir, { filter } = {}) {
  const results = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (!filter || filter(fullPath)) {
        results.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return results.sort();
}
