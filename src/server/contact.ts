/**
 * Formulario de contacto — lógica de servidor independiente de la plataforma.
 * La usa el punto de entrada de Cloudflare Pages Functions (functions/api/contact.ts),
 * que atiende POST /api/contact.
 *
 *  - Acepta JSON (envío con JS) y application/x-www-form-urlencoded (sin JS).
 *  - Valida los mismos campos y límites que el formulario.
 *  - Antispam: campo trampa (`website`) y tiempo mínimo de rellenado (`ts`).
 *  - Envía el aviso con la API REST de Resend (sin SDK: solo fetch).
 *  - No registra datos personales en los logs.
 *
 * Variables de entorno: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM (ver .env.example).
 */

export interface ContactEnv {
  RESEND_API_KEY?: string | undefined;
  CONTACT_TO?: string | undefined;
  CONTACT_FROM?: string | undefined;
}

export interface ContactData {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  mensaje: string;
  privacidad: boolean;
}

export type FieldErrors = Partial<Record<keyof ContactData, string>>;

export const LIMITS = {
  nombre: { min: 2, max: 100 },
  empresa: { min: 2, max: 120 },
  email: { max: 254 },
  telefono: { max: 30 },
  mensaje: { min: 10, max: 5000 },
} as const;

/** Tiempo mínimo (ms) entre que se muestra el formulario y se envía: los bots son instantáneos. */
const MIN_FILL_MS = 3000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,30}$/;

export function validate(d: ContactData): FieldErrors {
  const e: FieldErrors = {};
  if (d.nombre.length < LIMITS.nombre.min) e.nombre = 'Indica tu nombre.';
  else if (d.nombre.length > LIMITS.nombre.max) e.nombre = 'El nombre es demasiado largo.';

  if (d.empresa.length < LIMITS.empresa.min) e.empresa = 'Indica el nombre de tu empresa.';
  else if (d.empresa.length > LIMITS.empresa.max) e.empresa = 'El nombre de la empresa es demasiado largo.';

  if (!d.email) e.email = 'Indica tu email.';
  else if (d.email.length > LIMITS.email.max || !EMAIL_RE.test(d.email)) e.email = 'Revisa el email: no parece válido.';

  if (d.telefono && !PHONE_RE.test(d.telefono)) e.telefono = 'Revisa el teléfono: solo números, espacios y +.';

  if (d.mensaje.length < LIMITS.mensaje.min) e.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).';
  else if (d.mensaje.length > LIMITS.mensaje.max) e.mensaje = 'El mensaje es demasiado largo (máximo 5000 caracteres).';

  if (!d.privacidad) e.privacidad = 'Necesitamos que aceptes la política de privacidad para responderte.';
  return e;
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const bool = (v: unknown) => v === true || v === 'on' || v === 'true' || v === '1';

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) return (await request.json()) as Record<string, unknown>;
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

function reply(request: Request, status: number, body: Record<string, unknown>): Response {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
    });
  }
  // Envío sin JS: páginas estáticas de resultado (la home no puede leer el resultado sin JS)
  const url = new URL(status < 300 ? '/gracias' : '/contacto-error', request.url);
  return Response.redirect(url.toString(), 303);
}

export async function handleContact(request: Request, env: ContactEnv): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await readBody(request);
  } catch {
    return reply(request, 400, { ok: false, error: 'Petición no válida.' });
  }

  // Antispam: si el campo trampa viene relleno o el envío es instantáneo, fingimos éxito.
  const ts = Number(raw['ts']); // número (JSON) o texto (formulario)
  const tooFast = Number.isFinite(ts) && ts > 0 && Date.now() - ts < MIN_FILL_MS;
  if (str(raw['website']) || tooFast) return reply(request, 200, { ok: true });

  const data: ContactData = {
    nombre: str(raw['nombre']),
    empresa: str(raw['empresa']),
    email: str(raw['email']),
    telefono: str(raw['telefono']),
    mensaje: str(raw['mensaje']),
    privacidad: bool(raw['privacidad']),
  };

  const errors = validate(data);
  if (Object.keys(errors).length) return reply(request, 422, { ok: false, errors });

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error('[contacto] Faltan variables de entorno (RESEND_API_KEY, CONTACT_TO o CONTACT_FROM).');
    return reply(request, 500, { ok: false, error: 'El formulario no está disponible ahora mismo.' });
  }

  const rows: [string, string][] = [
    ['Nombre', data.nombre],
    ['Empresa', data.empresa],
    ['Email', data.email],
    ['Teléfono', data.telefono || '—'],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMensaje:\n${data.mensaje}\n\n(Privacidad aceptada)`;
  const html = `<table cellpadding="6" style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
    .join('')}</table><p style="font:14px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(
    data.mensaje,
  )}</p><p style="font:12px system-ui,sans-serif;color:#888">Privacidad aceptada en el formulario web.</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: env.CONTACT_TO.split(',').map((s) => s.trim()),
        reply_to: data.email,
        subject: `Nuevo contacto web: ${data.nombre} (${data.empresa})`.slice(0, 200),
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error(`[contacto] Resend respondió ${res.status}`);
      return reply(request, 502, { ok: false, error: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo.' });
    }
  } catch {
    console.error('[contacto] Error de red al llamar a Resend');
    return reply(request, 502, { ok: false, error: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo.' });
  }

  return reply(request, 200, { ok: true });
}
