// Genera las imágenes para compartir en redes (Open Graph, 1200×630):
//  - public/og.png: la general, con la marca centrada.
//  - public/og/<página>.png: una por cada página de src/data/landings.ts, con su título.
// Uso: node tools/og-image.mjs   (Node ≥ 22.6 por la importación directa de .ts)
// Tipografía: tools/fonts/Outfit[wght].ttf (SIL OFL 1.1, ver tools/fonts/OFL.txt).
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';
import { MARK } from '../src/assets/brand/mark.ts';
import { LANDINGS, ogSlug } from '../src/data/landings.ts';

const W = 1200, H = 630;
const FONT = 'tools/fonts/Outfit[wght].ttf';

const cell = 60;
const grid = [];
for (let gx = 0; gx <= W; gx += cell) grid.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${H}"/>`);
for (let gy = 0; gy <= H; gy += cell) grid.push(`<line x1="0" y1="${gy}" x2="${W}" y2="${gy}"/>`);

const defs = `
  <radialGradient id="fade" cx="50%" cy="48%" r="60%"><stop offset="0" stop-color="#070707" stop-opacity="0"/><stop offset="1" stop-color="#070707"/></radialGradient>
  <linearGradient id="lit" gradientUnits="userSpaceOnUse" x1="140" y1="-20" x2="520" y2="330">
    <stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#d6d6d4"/><stop offset="1" stop-color="#8e8e8b"/>
  </linearGradient>
  <linearGradient id="fold" gradientUnits="userSpaceOnUse" x1="508" y1="0" x2="711" y2="0">
    <stop offset="0" stop-color="#7a7a77"/><stop offset="1" stop-color="#c9c9c6"/>
  </linearGradient>
  <clipPath id="base"><rect width="${MARK.width}" height="${MARK.amp.baseline}"/></clipPath>`;

const background = (fadeId = 'fade') =>
  `<rect width="${W}" height="${H}" fill="#070707"/><g stroke="#1f1f1f" stroke-width="1">${grid.join('')}</g><rect width="${W}" height="${H}" fill="url(#${fadeId})"/>`;

const mark = (x, y, width) => {
  const s = width / MARK.width;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="${MARK.c}" fill="url(#lit)"/>
    <path d="${MARK.amp.d}" fill="none" stroke="url(#lit)" stroke-width="${MARK.amp.strokeWidth}" clip-path="url(#base)"/>
    <path d="${MARK.e.top}${MARK.e.mid}" fill="url(#lit)"/>
    <path d="${MARK.e.bottom}" fill="url(#fold)"/>
  </g>`;
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Texto con Outfit renderizado por Pango (el SVG no puede cargar fuentes propias). */
const text = (markup, font, width) =>
  sharp({ text: { text: markup, font, fontfile: FONT, rgba: true, width, spacing: -6 } })
    .png()
    .toBuffer({ resolveWithObject: true });

// ---------- Imagen general ----------
{
  const markW = 620, markH = MARK.height * (markW / MARK.width);
  const x = (W - markW) / 2, y = (H - markH) / 2 - 12;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${defs}</defs>${background()}${mark(x, y, markW)}
    <rect x="${W / 2 - 36}" y="${y + markH + 48}" width="72" height="3" fill="#d4ff3a"/></svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
  console.log('public/og.png');
}

// ---------- Una por página ----------
mkdirSync('public/og', { recursive: true });
const PAD = 80;
for (const l of LANDINGS) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs>${defs}
      <radialGradient id="fadeL" cx="30%" cy="55%" r="80%"><stop offset="0" stop-color="#070707" stop-opacity="0"/><stop offset="1" stop-color="#070707"/></radialGradient>
    </defs>${background('fadeL')}${mark(PAD, 64, 150)}
    <rect x="${PAD}" y="${H - 84}" width="72" height="3" fill="#d4ff3a"/></svg>`;

  const eyebrow = await text(
    `<span foreground="#8a8a86" letter_spacing="5000">${escape(l.eyebrow.toUpperCase())}</span>`,
    'Outfit 20',
    W - PAD * 2,
  );
  // tracking negativo, como los titulares de la web (≈ -0.03em)
  const title = await text(`<span foreground="#f2f2f0" letter_spacing="-2200">${escape(l.h1)}</span>`, 'Outfit Medium 74', W - PAD * 2);
  const domain = await text('<span foreground="#8a8a86">cyestudio.com</span>', 'Outfit 24', 400);

  // Bloque eyebrow + título, anclado abajo
  const titleTop = H - 128 - title.info.height;
  const out = `public/og/${ogSlug(l)}.png`;
  await sharp(Buffer.from(svg))
    .composite([
      { input: eyebrow.data, left: PAD, top: titleTop - eyebrow.info.height - 22 },
      { input: title.data, left: PAD, top: titleTop },
      { input: domain.data, left: W - PAD - domain.info.width, top: H - 84 - Math.round(domain.info.height / 2) },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(out);
}
