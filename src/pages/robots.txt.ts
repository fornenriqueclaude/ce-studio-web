// robots.txt. En la versión de prueba (SITE_PREVIEW=true) se bloquea todo el rastreo.
import type { APIRoute } from 'astro';
import { url } from '../utils/url';

export const GET: APIRoute = ({ site }) => {
  if (import.meta.env.SITE_PREVIEW) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  const sitemap = new URL(url('/sitemap.xml'), site ?? 'https://example.com').href;
  const body = ['User-agent: *', 'Allow: /', `Disallow: ${url('/api/')}`, '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
