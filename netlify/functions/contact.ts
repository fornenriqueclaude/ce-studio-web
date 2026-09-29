// Punto de entrada para Netlify (Netlify Functions v2): POST /api/contact
import { handleContact } from '../../src/server/contact';

declare const process: { env: Record<string, string | undefined> };

export default (request: Request): Promise<Response> => handleContact(request, process.env);

export const config = { path: '/api/contact' };
