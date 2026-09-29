// Datos del sitio reutilizados en SEO, schema.org, navbar y footer.
// Todo lo marcado como PENDIENTE debe completarse antes del lanzamiento.

export const SITE = {
  name: 'C&E Studio',
  legalName: 'C&E Studio, C.B.',
  description:
    'Diseñamos, implantamos y mantenemos software a medida y plataformas SaaS para pequeñas empresas, con IA donde aporta y costes bajo control.',
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

export const NAV_LINKS = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#como-trabajamos', label: 'Cómo trabajamos' },
  { href: '/#costes', label: 'Costes' },
  { href: '/#equipo', label: 'Equipo' },
  { href: '/#contacto', label: 'Contacto' },
] as const;

export const LEGAL_LINKS = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
] as const;

export const PRIMARY_CTA = { href: '/#contacto', label: 'Cuéntanos tu proyecto' } as const;
