// Genera public/og.png (1200×630) para Open Graph a partir de la marca vectorial.
// Uso: node tools/og-image.mjs   (Node ≥ 22.6 por la importación directa de .ts)
import sharp from 'sharp';
import { MARK } from '../src/assets/brand/mark.ts';

const W = 1200, H = 630;
const markW = 620, scale = markW / MARK.width, markH = MARK.height * scale;
const x = (W - markW) / 2, y = (H - markH) / 2 - 12;
const cell = 60;
const grid = [];
for (let gx = 0; gx <= W; gx += cell) grid.push(`<line x1="${gx}" y1="0" x2="${gx}" y2="${H}"/>`);
for (let gy = 0; gy <= H; gy += cell) grid.push(`<line x1="0" y1="${gy}" x2="${W}" y2="${gy}"/>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="fade" cx="50%" cy="48%" r="60%"><stop offset="0" stop-color="#070707" stop-opacity="0"/><stop offset="1" stop-color="#070707"/></radialGradient>
    <linearGradient id="lit" gradientUnits="userSpaceOnUse" x1="140" y1="-20" x2="520" y2="330">
      <stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#d6d6d4"/><stop offset="1" stop-color="#8e8e8b"/>
    </linearGradient>
    <linearGradient id="fold" gradientUnits="userSpaceOnUse" x1="508" y1="0" x2="711" y2="0">
      <stop offset="0" stop-color="#7a7a77"/><stop offset="1" stop-color="#c9c9c6"/>
    </linearGradient>
    <clipPath id="base"><rect width="${MARK.width}" height="${MARK.amp.baseline}"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="#070707"/>
  <g stroke="#1f1f1f" stroke-width="1">${grid.join('')}</g>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <g transform="translate(${x} ${y}) scale(${scale})">
    <path d="${MARK.c}" fill="url(#lit)"/>
    <path d="${MARK.amp.d}" fill="none" stroke="url(#lit)" stroke-width="${MARK.amp.strokeWidth}" clip-path="url(#base)"/>
    <path d="${MARK.e.top}${MARK.e.mid}" fill="url(#lit)"/>
    <path d="${MARK.e.bottom}" fill="url(#fold)"/>
  </g>
  <rect x="${W / 2 - 36}" y="${y + markH + 48}" width="72" height="3" fill="#d4ff3a"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('public/og.png generado');
