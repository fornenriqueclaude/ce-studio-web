/**
 * Páginas de aterrizaje para SEO: una por servicio, dos locales y una por sector.
 * Las pinta src/pages/[...landing].astro con el layout Landing.astro.
 * Norma del proyecto: sin clientes, cifras ni casos inventados, y sin precios.
 */

export interface Landing {
  /** Ruta sin barra inicial, p. ej. "servicios/software-a-medida". */
  path: string;
  kind: 'servicio' | 'local' | 'sector';
  /** Etiqueta corta para enlaces (tarjetas, footer, relacionados). */
  nav: string;
  /** <title> (sin el sufijo de marca) y meta descripción. */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  pointsTitle: string;
  points: { title: string; text: string }[];
  /** "Te encaja si…" */
  fit: string[];
  faqs: { q: string; a: string }[];
  /** Para schema.org Service. */
  serviceType: string;
  /** Ámbito geográfico para schema.org (por defecto, España). */
  area?: string;
}

const FAQ_REMOTE = {
  q: '¿Trabajáis en remoto?',
  a: 'Sí. Estamos en Madrid y Mérida y trabajamos en remoto con empresas de toda España.',
};
const FAQ_PRICE = {
  q: '¿Cuánto cuesta?',
  a: 'Depende del alcance. Tras una primera fase de descubrimiento te damos un presupuesto cerrado, facturado por hitos: al inicio y a la entrega.',
};
const FAQ_USAGE = {
  q: '¿Cómo se paga el consumo de IA, SMS o llamadas?',
  a: 'Según el uso real. Los servicios de terceros se repercuten por lo que se consume, y en cada factura ves el detalle por servicio.',
};

export const LANDINGS: Landing[] = [
  {
    path: 'servicios/software-a-medida',
    kind: 'servicio',
    nav: 'Software a medida',
    title: 'Software a medida para pequeñas empresas',
    description:
      'Desarrollamos software a medida para pymes: gestión interna, paneles y automatizaciones hechas para tu proceso. Presupuesto por hitos y trato directo.',
    eyebrow: 'Servicio',
    h1: 'Software a medida para pequeñas empresas',
    lead: 'Herramientas de gestión, paneles y automatizaciones hechas para tu forma de trabajar, no plantillas genéricas.',
    pointsTitle: 'Qué construimos',
    points: [
      { title: 'Gestión interna', text: 'Pedidos, clientes, partes de trabajo o lo que mueva tu negocio, en un solo sitio.' },
      { title: 'Paneles e informes', text: 'Los datos que necesitas para decidir, actualizados y a la vista.' },
      { title: 'Automatización', text: 'Avisos, documentos y traspasos de datos que hoy haces a mano los hace el software.' },
      { title: 'Integraciones', text: 'Lo conectamos con las herramientas que ya usas para no duplicar trabajo.' },
    ],
    fit: [
      'Tu equipo pierde horas en hojas de cálculo o tareas manuales.',
      'Las herramientas estándar no encajan con tu proceso.',
      'Quieres saber cuánto va a costar antes de empezar.',
    ],
    faqs: [
      FAQ_PRICE,
      {
        q: '¿Cuánto tarda?',
        a: 'Depende del proyecto. Trabajamos por hitos con entregas visibles desde el principio, para que veas avances reales y no solo una fecha final.',
      },
      {
        q: '¿Qué pasa después de la entrega?',
        a: 'Formamos a tu equipo y acompañamos el arranque. Después puedes contratar el mantenimiento mensual: alojamiento, soporte y mejoras.',
      },
      FAQ_REMOTE,
    ],
    serviceType: 'Desarrollo de software a medida',
  },
  {
    path: 'servicios/plataformas-saas',
    kind: 'servicio',
    nav: 'Plataformas SaaS',
    title: 'Desarrollo de plataformas SaaS',
    description:
      'Creamos plataformas SaaS: multiusuario, por suscripción y siempre actualizadas. Nos ocupamos del desarrollo, el alojamiento y la evolución.',
    eyebrow: 'Servicio',
    h1: 'Plataformas SaaS a medida',
    lead: 'Productos por suscripción, multiusuario y siempre actualizados, listos para crecer contigo.',
    pointsTitle: 'Qué incluye',
    points: [
      { title: 'Cuentas y roles', text: 'Cada usuario ve y hace solo lo que le corresponde.' },
      { title: 'Suscripciones', text: 'Tu servicio como producto: altas, planes y acceso por suscripción.' },
      { title: 'Siempre al día', text: 'Una sola versión en la nube: todos tus usuarios tienen la última.' },
      { title: 'Preparado para crecer', text: 'Empieza con lo imprescindible y evoluciona por hitos.' },
    ],
    fit: [
      'Quieres ofrecer tu servicio como producto online.',
      'Varios clientes, equipos o sedes van a usar la misma herramienta.',
      'No quieres ocuparte de servidores ni de actualizaciones.',
    ],
    faqs: [
      {
        q: '¿Qué es un SaaS?',
        a: 'Software que se usa por internet y se paga por suscripción. No se instala nada: tus usuarios entran desde el navegador y siempre tienen la última versión.',
      },
      {
        q: '¿Quién se ocupa del alojamiento y las actualizaciones?',
        a: 'Nosotros. La suscripción mensual incluye alojamiento, soporte, actualizaciones y evolución.',
      },
      {
        q: '¿Se puede empezar con algo pequeño?',
        a: 'Sí. Definimos una primera versión con lo imprescindible y la hacemos crecer por hitos, con entregas visibles.',
      },
      FAQ_PRICE,
    ],
    serviceType: 'Desarrollo de plataformas SaaS',
  },
  {
    path: 'servicios/integraciones-ia',
    kind: 'servicio',
    nav: 'IA y comunicaciones',
    title: 'Integraciones con IA, SMS y voz para empresas',
    description:
      'Integramos inteligencia artificial, SMS, llamadas y otros servicios en tu negocio, donde aportan valor de verdad. Pagas solo lo que usas.',
    eyebrow: 'Servicio',
    h1: 'IA y comunicaciones integradas en tu negocio',
    lead: 'Inteligencia artificial, mensajes y llamadas integrados en tu negocio, donde aportan valor de verdad. Y pagas solo lo que usas.',
    pointsTitle: 'Qué integramos',
    points: [
      { title: 'Asistentes con IA', text: 'Que respondan, busquen o preparen borradores dentro de tus herramientas.' },
      { title: 'Automatizaciones con IA', text: 'Clasificar, resumir o extraer datos de textos y documentos sin hacerlo a mano.' },
      { title: 'SMS y voz', text: 'Mensajes y llamadas conectados a tu software.' },
      { title: 'APIs de terceros', text: 'Unimos los servicios que ya usas para que trabajen juntos.' },
    ],
    fit: [
      'Quieres aprovechar la IA sin montar un departamento técnico.',
      'Atiendes o haces muchas llamadas y mensajes.',
      'Te preocupa no saber cuánto vas a gastar.',
    ],
    faqs: [
      FAQ_USAGE,
      {
        q: '¿Con qué tecnología trabajáis?',
        a: 'Con la que mejor encaje en cada proyecto. Elegimos proveedores fiables de IA, mensajería y telefonía y nos ocupamos de toda la integración: tú solo ves que funciona.',
      },
      {
        q: '¿Tengo que cambiar mis herramientas?',
        a: 'No necesariamente. Podemos integrar la IA y las comunicaciones en lo que ya usas o en un software a medida.',
      },
      FAQ_REMOTE,
    ],
    serviceType: 'Integración de inteligencia artificial y comunicaciones',
  },
  {
    path: 'servicios/mantenimiento-y-soporte',
    kind: 'servicio',
    nav: 'Mantenimiento y soporte',
    title: 'Mantenimiento y soporte de software',
    description:
      'Mantenimiento de software por suscripción mensual: alojamiento, monitorización, copias de seguridad, soporte directo y mejoras continuas.',
    eyebrow: 'Servicio',
    h1: 'Mantenimiento y soporte de software',
    lead: 'Tu software vigilado, respaldado y en evolución continua, sin que tengas que pensar en ello.',
    pointsTitle: 'Qué incluye',
    points: [
      { title: 'Monitorización', text: 'Vigilamos que todo funcione y actuamos si algo falla.' },
      { title: 'Copias de seguridad', text: 'Tus datos, respaldados.' },
      { title: 'Soporte directo', text: 'Hablas con quien diseña y construye tu software.' },
      { title: 'Mejoras continuas', text: 'La herramienta evoluciona con tu negocio, mes a mes.' },
    ],
    fit: [
      'Tu software es clave en el día a día y no puede pararse.',
      'No tienes equipo técnico propio.',
      'Quieres un coste mensual previsible.',
    ],
    faqs: [
      {
        q: '¿Qué incluye la suscripción?',
        a: 'Alojamiento, soporte, actualizaciones y evolución de tu software.',
      },
      {
        q: '¿Con quién hablo si algo falla?',
        a: 'Directamente con nosotros: las mismas personas que han diseñado y construido tu herramienta.',
      },
      FAQ_USAGE,
    ],
    serviceType: 'Mantenimiento y soporte de software',
  },
  {
    path: 'software-a-medida-madrid',
    kind: 'local',
    nav: 'Software a medida en Madrid',
    title: 'Desarrollo de software a medida en Madrid',
    description:
      'Estudio de desarrollo de software a medida en Madrid para pequeñas empresas: gestión, SaaS e integraciones con IA. Trato directo con quien lo construye.',
    eyebrow: 'Madrid',
    h1: 'Software a medida en Madrid',
    lead: 'Un estudio pequeño con sede en Madrid: hablas directamente con quien diseña y construye tu software.',
    pointsTitle: 'Qué hacemos',
    points: [
      { title: 'Software a medida', text: 'Gestión, paneles y automatizaciones hechas para tu proceso.' },
      { title: 'Plataformas SaaS', text: 'Productos por suscripción, multiusuario y siempre al día.' },
      { title: 'IA y comunicaciones', text: 'IA, mensajes y llamadas integrados donde aportan.' },
      { title: 'Mantenimiento', text: 'Alojamiento, soporte y mejoras por suscripción mensual.' },
    ],
    fit: [
      'Tienes una pequeña empresa en Madrid y tareas que te quitan tiempo.',
      'Quieres trato directo, sin intermediarios.',
      'Buscas un precio claro antes de empezar.',
    ],
    faqs: [
      {
        q: '¿Podemos vernos en persona?',
        a: 'Sí. Estamos en Madrid y podemos reunirnos cuando haga falta; el día a día del proyecto lo llevamos en remoto.',
      },
      FAQ_PRICE,
      {
        q: '¿Trabajáis solo en Madrid?',
        a: 'No. También estamos en Mérida y trabajamos en remoto con empresas de toda España.',
      },
    ],
    serviceType: 'Desarrollo de software a medida',
    area: 'Madrid',
  },
  {
    path: 'software-a-medida-merida',
    kind: 'local',
    nav: 'Software a medida en Mérida',
    title: 'Desarrollo de software a medida en Mérida y Extremadura',
    description:
      'Desarrollo de software a medida en Mérida para empresas de Extremadura: gestión, SaaS e integraciones con IA. Trato cercano y precio por hitos.',
    eyebrow: 'Mérida · Extremadura',
    h1: 'Software a medida en Mérida',
    lead: 'Un estudio de software con presencia en Mérida: trato cercano y directo para empresas de Extremadura.',
    pointsTitle: 'Qué hacemos',
    points: [
      { title: 'Software a medida', text: 'Gestión, paneles y automatizaciones hechas para tu proceso.' },
      { title: 'Plataformas SaaS', text: 'Productos por suscripción, multiusuario y siempre al día.' },
      { title: 'IA y comunicaciones', text: 'IA, mensajes y llamadas integrados donde aportan.' },
      { title: 'Mantenimiento', text: 'Alojamiento, soporte y mejoras por suscripción mensual.' },
    ],
    fit: [
      'Tu empresa está en Mérida o en Extremadura y quieres a alguien cerca.',
      'Pierdes tiempo en tareas manuales u hojas de cálculo.',
      'Buscas un precio claro antes de empezar.',
    ],
    faqs: [
      {
        q: '¿Podemos vernos en persona?',
        a: 'Sí. Estamos en Mérida y podemos reunirnos cuando haga falta; el día a día del proyecto lo llevamos en remoto.',
      },
      FAQ_PRICE,
      {
        q: '¿Trabajáis solo en Extremadura?',
        a: 'No. También estamos en Madrid y trabajamos en remoto con empresas de toda España.',
      },
    ],
    serviceType: 'Desarrollo de software a medida',
    area: 'Mérida',
  },
  {
    path: 'soluciones/equipos-comerciales',
    kind: 'sector',
    nav: 'Equipos comerciales y llamadas',
    title: 'Software para equipos comerciales que trabajan por teléfono',
    description:
      'Software a medida para empresas que reciben y hacen llamadas comerciales: llamadas integradas, ficha del cliente, seguimiento automático e IA.',
    eyebrow: 'Equipos comerciales',
    h1: 'Software para equipos que venden por teléfono',
    lead: 'Para empresas que reciben y hacen llamadas cada día: menos trabajo manual, mejor seguimiento y todo el historial en un solo sitio.',
    pointsTitle: 'Qué podemos construir',
    points: [
      { title: 'Llamadas integradas', text: 'Entrantes y salientes desde tu propia herramienta.' },
      { title: 'Ficha del cliente', text: 'Historial de llamadas y notas a la vista en cada conversación.' },
      { title: 'Seguimiento automático', text: 'SMS, recordatorios y tareas después de cada llamada.' },
      { title: 'IA donde aporta', text: 'Resúmenes y clasificación de llamadas para no escribirlo todo a mano.' },
      { title: 'Paneles de actividad', text: 'Qué se ha llamado, qué queda pendiente y cómo va el equipo.' },
    ],
    fit: [
      'Tu equipo comercial recibe o hace muchas llamadas al día.',
      'El seguimiento vive en hojas de cálculo, notas o la memoria de cada uno.',
      'Quieres usar IA y telefonía sin sorpresas en la factura.',
    ],
    faqs: [
      {
        q: '¿Se integra con la telefonía que ya tenemos?',
        a: 'Depende de lo que uséis. En la fase de descubrimiento vemos cómo conectar con vuestra telefonía actual o si conviene usar un servicio de telefonía en la nube.',
      },
      {
        q: '¿Se pueden grabar o transcribir las llamadas?',
        a: 'Técnicamente sí. Lo planteamos siempre cumpliendo la normativa de protección de datos: informando a quien llama y con una base legal clara.',
      },
      FAQ_USAGE,
      FAQ_PRICE,
    ],
    serviceType: 'Software para equipos comerciales y gestión de llamadas',
  },
];

export const landingHref = (l: Landing): string => `/${l.path}`;
/** Nombre de la imagen Open Graph de la página (public/og/<slug>.png, generada con tools/og-image.mjs). */
export const ogSlug = (l: Landing): string => l.path.replace(/\//g, '-');
export const byKind = (kind: Landing['kind']): Landing[] => LANDINGS.filter((l) => l.kind === kind);
