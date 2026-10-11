// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
// Writes one static HTML file per page and language so every URL ships its own
// content, title, canonical, hreflang and structured data.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const server = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> placeholders');
}

function page({ head, html, htmlLang }) {
  return template
    .replace('<html lang="en">', `<html lang="${htmlLang}">`)
    .replace('<!--app-head-->', head.trimStart())
    .replace('<!--app-html-->', html);
}

// "/" → index.html, "/zh" → zh.html, "/zh/wynn-rewards-guide" → zh/wynn-rewards-guide.html
// (Netlify serves /zh from zh.html without a redirect.)
function outFile(url) {
  return url === '/' ? 'index.html' : url.slice(1) + '.html';
}

let count = 0;
for (const language of server.LANGUAGES) {
  for (const pagePath of server.PAGE_PATHS) {
    const url = server.localizePath(pagePath, language);
    const { head, htmlLang } = server.buildHead(pagePath, language);
    const file = path.join(dist, outFile(url));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page({ head, htmlLang, html: server.render(url) }));
    count++;
  }
}

fs.writeFileSync(
  path.join(dist, '404.html'),
  page({ head: server.NOT_FOUND_HEAD, htmlLang: 'en', html: server.render('/__not-found__') })
);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), server.buildSitemap());

console.log(`prerendered ${count} pages + 404.html + sitemap.xml`);
