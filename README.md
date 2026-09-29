# C&E Studio — Web

Web corporativa one-page de **C&E Studio, C.B.** — https://cyestudio.com
Astro 5 (estático) + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis. Alojada en Cloudflare Pages.
La documentación interna del proyecto (brief, dirección de diseño, requisitos legales) se mantiene fuera del repositorio.

**Versión de prueba:** https://fornenriqueclaude.github.io/ce-studio-web/ — se publica sola en cada push a `master`
(`.github/workflows/deploy.yml`), sin indexar y con el formulario sin activar. Se retirará cuando la web esté en producción.

## Comandos
| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor local (el formulario no envía: no hay función) |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build |
| `npm run check` | Comprobación de tipos (`astro check`) |
| `npm run build && npx wrangler pages dev dist` | Build servido como en Cloudflare, con la función del formulario |
| `node tools/og-image.mjs` | Regenera `public/og.png` (imagen para redes, 1200×630) |

## Estructura
```
src/
  components/      Secciones (Hero, Manifesto, Services, Process, Costs, Stack, Team, Contact…)
  components/brand Mark.astro: la marca C&E en SVG, por piezas
  assets/brand/    mark.ts (trazados vectoriales del logo) y logos recortados para astro:assets
  assets/team/     Retratos del equipo (B/N y color)
  layouts/         Base.astro (SEO, fuentes, motion) y Legal.astro
  pages/           index, aviso-legal, privacidad, cookies, 404, gracias, contacto-error, sitemap.xml, robots.txt
  scripts/         motion.ts (Lenis + ScrollTrigger), parallax.ts (hero), intro.ts, reveal.ts
  server/          contact.ts: lógica del formulario (validación, antispam, envío con Resend)
functions/api/contact.ts   Cloudflare Pages Function → POST /api/contact
public/_headers            Cabeceras de seguridad y caché (Cloudflare Pages)
public/brand/              Logos originales, favicons y mark-vector.svg
```

## Despliegue (Cloudflare Pages · cyestudio.com)
1. **Pages**: Cloudflare → *Workers & Pages* → *Create* → pestaña *Pages* → *Connect to Git* → repo `ce-studio-web`.
   - Production branch: `master` · Framework preset: *Astro* · Build command: `npm run build` · Output: `dist`.
   - Variables de entorno: `NODE_VERSION=22`, `CONTACT_TO`, `CONTACT_FROM` y `RESEND_API_KEY` (esta, como *Secret*).
   - La función del formulario (`functions/api/contact.ts`) y `public/_headers` se despliegan solos.
2. **Dominio**: proyecto de Pages → *Custom domains* → `cyestudio.com` y `www.cyestudio.com` (redirigir www → raíz).
3. **Email**: Cloudflare → *Email* → *Email Routing* → `contacto@cyestudio.com` reenviando a vuestro correo.
4. **Resend**: añadir el dominio `cyestudio.com` (región UE) y crear en Cloudflare DNS los registros que indique;
   crear una API key con permiso solo de envío y guardarla como `RESEND_API_KEY`.
5. Probar el formulario en producción y, después, retirar la publicación de prueba de GitHub Pages.

## Pendiente antes de publicar
- [ ] Verificar cyestudio.com en Resend y activar el formulario.
- [ ] NIF de la C.B. (`src/consts.ts` → `LEGAL.nif`).
- [ ] Confirmar que el DPA de Cloudflare cubre la cuenta (acuerdo de autoservicio).
- [ ] Confirmar plazo de conservación de datos (12 meses por defecto).
- [ ] Revisar el domicilio publicado en el aviso legal.
- [ ] Enlace de agenda para "Agenda una llamada" (`SITE.bookingUrl`).
- [ ] Casos / proyectos reales (sección aún no creada, a propósito).
- [ ] Comprobar en OEPM/EUIPO que «C&E Studio» no está registrada por terceros (clases 9, 35 y 42).
