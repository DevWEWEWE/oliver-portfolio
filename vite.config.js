import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://devwewewe.github.io/oliver-portfolio/
export default defineConfig({
  base: '/oliver-portfolio/',
  plugins: [react()]
});
