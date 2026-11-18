// After `vite build`, render the page into dist/index.html so it ships as real HTML.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { render } from '../dist-ssr/entry-server.js';

const file = new URL('../dist/index.html', import.meta.url);
const html = readFileSync(file, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html');
writeFileSync(file, html.replace(marker, `<div id="root">${render()}</div>`));
rmSync(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true });
console.log('prerendered dist/index.html');
