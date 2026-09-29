import { url } from './utils/url';

// Datos del sitio reutilizados en SEO, schema.org, navbar y footer.
// Todo lo marcado como PENDIENTE debe completarse antes del lanzamiento.

export const SITE = {
  name: 'C&E Studio',
  legalName: 'C&E Studio, C.B.',
  description:
    'Diseñamos, implantamos y mantenemos software a medida y plataformas SaaS para pequeñas empresas, con IA donde aporta y costes claros.',
  locale: 'es_ES',
  /** [PENDIENTE: email de contacto] */
  email: null as string | null,
  /** [PENDIENTE: enlace de agenda (Calendly / Cal.com)] */
  bookingUrl: null as string | null,
  locations: 'Madrid · Mérida',
  remote: 'Trabajo en remoto en toda España',
  address: {
    streetAddress: 'Calle Madridejos 56, 1º A',
    postalCode: '28026',
    addressLocality: 'Madrid',
    addressCountry: 'ES',
  },
  founders: ['Enrique Madruga Ricardo', 'Carlos Fornelino Gala'],
  year: 2026,
} as const;

/** Datos del titular para las páginas legales (docs/legal.md). */
export const LEGAL = {
  /** [PENDIENTE: NIF de la C.B.] (modelo 036) */
  nif: null as string | null,
  address: 'Calle Madridejos 56, 1º A, 28026 Madrid',
  activity: 'Desarrollo, implantación y mantenimiento de software y servicios SaaS.',
  /** [PENDIENTE: hosting] Vercel o Netlify, según se decida. */
  hosting: null as string | null,
  emailProvider: 'Resend',
  /** [PENDIENTE: confirmar plazo] Conservación máxima si no hay relación comercial. */
  retentionMonths: 12,
  updated: '29 de septiembre de 2026',
} as const;

export const NAV_LINKS = [
  { href: url('/#servicios'), label: 'Servicios' },
  { href: url('/#como-trabajamos'), label: 'Cómo trabajamos' },
  { href: url('/#costes'), label: 'Costes' },
  { href: url('/#equipo'), label: 'Equipo' },
  { href: url('/#contacto'), label: 'Contacto' },
] as const;

export const LEGAL_LINKS = [
  { href: url('/aviso-legal'), label: 'Aviso legal' },
  { href: url('/privacidad'), label: 'Privacidad' },
  { href: url('/cookies'), label: 'Cookies' },
] as const;

export const PRIMARY_CTA = { href: url('/#contacto'), label: 'Cuéntanos tu proyecto' } as const;
