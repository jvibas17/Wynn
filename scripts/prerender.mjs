// Build-time prerender: writes dist/<route>/index.html with real HTML content and
// per-route <head> tags, so Google sees unique pages without running JavaScript.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, PAGES } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const SEO_BLOCK = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/;
if (!SEO_BLOCK.test(template)) throw new Error('index.html is missing the SEO:START/SEO:END markers');
if (!template.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');

for (const { path: route } of PAGES) {
  const { html, head } = render(route);
  const out = template
    .replace(SEO_BLOCK, () => `<!-- SEO:START -->\n    ${head}\n    <!-- SEO:END -->`)
    .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
  console.log(`prerendered ${route} -> ${path.relative(root, file)} (${out.length} bytes)`);
}
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
