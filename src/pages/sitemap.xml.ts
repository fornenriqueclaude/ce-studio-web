// Sitemap estático, generado en el build (sin dependencias). Solo páginas indexables.
import type { APIRoute } from 'astro';

const PAGES = ['/', '/aviso-legal', '/privacidad', '/cookies'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const urls = PAGES.map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
