import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import './styles.css';
import App from './App.jsx';

// Each page is pre-rendered at build time (scripts/prerender.mjs); React takes it over here
hydrateRoot(document.getElementById('root'),
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);
