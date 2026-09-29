// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Dominio y ruta base, configurables por entorno (ver .github/workflows/deploy.yml):
//  - Producción (Cloudflare Pages): por defecto https://cyestudio.com y BASE_PATH "/".
//  - GitHub Pages de proyecto: SITE_URL=https://usuario.github.io y BASE_PATH=/ce-studio-web.
/** @type {Record<string, string | undefined>} */
const env = /** @type {any} */ (globalThis).process.env;
const SITE_URL = env.SITE_URL ?? 'https://cyestudio.com';
const BASE_PATH = env.BASE_PATH ?? '/';
// Versión de prueba (p. ej. GitHub Pages): noindex en todas las páginas y robots.txt bloqueando todo.
const SITE_PREVIEW = env.SITE_PREVIEW === 'true';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' }, // CSS pequeño: incrustado para no bloquear el render
  vite: {
    plugins: [tailwindcss()],
    define: { 'import.meta.env.SITE_PREVIEW': JSON.stringify(SITE_PREVIEW) },
  },
});
