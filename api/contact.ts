// Punto de entrada para Vercel (Vercel Functions, runtime Node): POST /api/contact
import { handleContact } from '../src/server/contact';

declare const process: { env: Record<string, string | undefined> };

export function POST(request: Request): Promise<Response> {
  return handleContact(request, process.env);
}
