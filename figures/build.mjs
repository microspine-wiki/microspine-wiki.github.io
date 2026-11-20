#!/usr/bin/env node
/* Regenerate the wiki's original figures: node figures/build.mjs [name …]

   Each module in this folder that exports `file` and `render()` becomes one
   SVG in wiki/assets/figures/. The SVGs are committed, so pages render on
   GitHub and in Obsidian without running anything. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, '..', 'wiki', 'assets', 'figures');
const only = new Set(process.argv.slice(2));
const skip = new Set(['build.mjs', 'lib.mjs', 'stalk.mjs']);

fs.mkdirSync(outDir, {recursive: true});
for (const name of fs.readdirSync(here).filter(n => n.endsWith('.mjs') && !skip.has(n)).sort()) {
  if (only.size && !only.has(name.replace(/\.mjs$/, ''))) continue;
  const module = await import(pathToFileURL(path.join(here, name)).href);
  if (!module.file || !module.render) throw new Error(`${name} must export "file" and "render()"`);
  const svg = module.render();
  fs.writeFileSync(path.join(outDir, module.file), svg);
  console.log(`${module.file.padEnd(34)} ${(svg.length / 1024).toFixed(1)} KB`);
}
