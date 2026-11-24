import { mkdir, readFile, writeFile, copyFile, cp, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const output = path.join(root, 'dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const referenced = [...html.matchAll(/(?:href|src)="([^"#]+\.(?:css|js))"/g)]
  .map(match => match[1])
  .filter(file => !file.includes('://'));

await mkdir(output, { recursive: true });
await writeFile(path.join(output, 'index.html'), html);
for (const file of new Set(referenced)) {
  const source = path.resolve(root, file);
  if (!source.startsWith(root + path.sep)) throw new Error('Asset outside project');
  await copyFile(source, path.join(output, file));
}
await cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
for (const file of ['index.html', ...referenced]) await access(path.join(output, file));
console.log(`Static invitation built in dist/: index.html, ${new Set(referenced).size} scripts/styles, and artwork.`);
