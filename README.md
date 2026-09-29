# C&E Studio — Web

Web corporativa one-page de **C&E Studio, C.B.** Astro 5 (estático) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.
La documentación interna del proyecto (brief, dirección de diseño, requisitos legales) se mantiene fuera del repositorio.

**Versión de prueba:** https://fornenriqueclaude.github.io/ce-studio-web/ — se publica sola en cada push a `master`
(`.github/workflows/deploy.yml`), sin indexar en buscadores y con el formulario aún sin activar.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local (el formulario no envía: no hay función; ver abajo) |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build |
| `npm run check` | Comprobación de tipos (`astro check`) |
| `node tools/og-image.mjs` | Regenera `public/og.png` (imagen para redes, 1200×630) |

## Estructura
```
src/
  components/      Secciones (Hero, Manifesto, Services, Process, Costs, Stack, Team, Contact…)
  components/brand Mark.astro: la marca C&E en SVG, por piezas
  assets/brand/    mark.ts (trazados vectoriales del logo) y logos recortados para astro:assets
  layouts/         Base.astro (SEO, fuentes, motion) y Legal.astro
  pages/           index, aviso-legal, privacidad, cookies, 404, gracias, contacto-error, sitemap.xml, robots.txt
  scripts/         motion.ts (Lenis + ScrollTrigger), parallax.ts (hero), intro.ts, reveal.ts
  server/          contact.ts: lógica del formulario (validación, antispam, envío con Resend)
api/contact.ts                 Entrada para Vercel  → POST /api/contact
netlify/functions/contact.ts   Entrada para Netlify → POST /api/contact
public/brand/                  Logos originales, favicons y mark-vector.svg
```

## Despliegue
1. **Dominio**: variable de entorno `SITE_URL` (o su valor por defecto en `astro.config.mjs`); afecta a canonical,
   Open Graph, sitemap y robots. `BASE_PATH` solo hace falta si la web vive en una subcarpeta (como en GitHub Pages).
2. **Hosting**: Vercel o Netlify. Ambos detectan Astro y publican `dist/`; la función del formulario ya está
   preparada para los dos (`api/` o `netlify/functions/`). Tras el primer despliegue, comprobar que
   `POST /api/contact` responde.
3. **Formulario (Resend)**: verificar el dominio en Resend (registros DNS) y definir en el panel del hosting las
   variables de `.env.example`: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
4. Para probar el formulario en local con función real: `vercel dev` o `netlify dev`.

## Pendiente antes de publicar
- [ ] Dominio (`astro.config.mjs`) y verificación en Resend.
- [ ] Email de contacto (`src/consts.ts` → `SITE.email`).
- [ ] NIF de la C.B. (`src/consts.ts` → `LEGAL.nif`).
- [ ] Hosting elegido (`src/consts.ts` → `LEGAL.hosting`) y firma del contrato de encargado (DPA).
- [ ] Confirmar plazo de conservación de datos (12 meses por defecto).
- [ ] Revisar el domicilio publicado en el aviso legal.
- [ ] Enlace de agenda para "Agenda una llamada" (`SITE.bookingUrl`).
- [ ] Fotos del equipo (sustituyen a las letras C y E en `Team.astro`).
- [ ] Casos / proyectos reales (sección aún no creada, a propósito).
- [ ] Comprobar en OEPM/EUIPO que «C&E Studio» no está registrada por terceros (clases 9, 35 y 42).
