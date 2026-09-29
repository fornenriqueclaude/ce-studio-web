/**
 * Antepone la ruta base del sitio (config `base`) a una ruta absoluta interna.
 * En local o con dominio propio la base es "/" y no cambia nada; en GitHub Pages
 * (fornenriqueclaude.github.io/ce-studio-web) añade "/ce-studio-web".
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string): string => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
