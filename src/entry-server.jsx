import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export { pages, SITE } from './pages.js';

// Used at build time only: renders a page to HTML so crawlers and no-JS visitors get the content
export const render = path => renderToString(<App path={path} />);
