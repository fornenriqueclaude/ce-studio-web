// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// [PENDIENTE: dominio] — sustituir cuando esté decidido (afecta a canonical, Open Graph y sitemap).
export const SITE_URL = 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' }, // CSS pequeño: incrustado para no bloquear el render
  vite: {
    plugins: [tailwindcss()],
  },
});
