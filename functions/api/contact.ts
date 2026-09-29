// Punto de entrada para Cloudflare Pages Functions: POST /api/contact
// Las variables (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM) se configuran en el panel de Pages.
import { handleContact, type ContactEnv } from '../../src/server/contact';

interface PagesContext {
  request: Request;
  env: ContactEnv;
}

export const onRequestPost = ({ request, env }: PagesContext): Promise<Response> => handleContact(request, env);
