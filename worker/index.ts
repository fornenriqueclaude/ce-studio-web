// Worker de Cloudflare: sirve la web estática (dist/) y atiende el formulario en POST /api/contact.
// Las variables (RESEND_API_KEY, CONTACT_TO, CONTACT_FROM) se configuran en el panel del Worker.
import { handleContact, type ContactEnv } from '../src/server/contact';

interface Env extends ContactEnv {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') return handleContact(request, env);
    return env.ASSETS.fetch(request);
  },
};
