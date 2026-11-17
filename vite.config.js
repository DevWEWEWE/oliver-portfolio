import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the root of https://oliverharrismedia.co.uk/
export default defineConfig({
  base: '/',
  plugins: [react()]
});
