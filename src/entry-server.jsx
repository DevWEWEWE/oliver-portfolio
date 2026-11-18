import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Used at build time only: renders the page to HTML so crawlers and no-JS visitors get the content
export const render = () => renderToString(<App />);
