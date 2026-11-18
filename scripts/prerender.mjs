// After `vite build`, write one pre-rendered HTML file per page: dist/index.html, dist/podcast/index.html, ...
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { render, pages, SITE } from '../dist-ssr/entry-server.js';

const dist = new URL('../dist/', import.meta.url);
const template = readFileSync(new URL('index.html', dist), 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html');

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const swap = (html, re, value) => {
  if (!re.test(html)) throw new Error(`prerender: ${re} not found in index.html`);
  return html.replace(re, value);
};

for (const p of pages) {
  const url = SITE + p.path;
  let html = template.replace(marker, `<div id="root">${render(p.path)}</div>`);
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`);
  html = swap(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(p.description)}">`);
  html = swap(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(p.title)}">`);
  html = swap(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(p.description)}">`);
  html = swap(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  html = swap(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  const dir = new URL(`.${p.path}`, dist);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL('index.html', dir), html);
}

writeFileSync(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${SITE}${p.path}</loc></url>`).join('\n')}
</urlset>
`);
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log(`prerendered ${pages.length} pages`);
