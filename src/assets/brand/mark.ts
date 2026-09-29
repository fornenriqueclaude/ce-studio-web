// Marca C&E reconstruida en SVG a partir de public/brand/logo-original-fondo-negro.png
// (medición subpíxel + ajuste por mínimos cuadrados; coincidencia con el original ≈ 98 %).
// Coordenadas en el viewBox `0 0 711 295`.
// - C: anillo entre dos elipses ajustadas al original + dos cortes rectos.
// - &: trazo monolínea (línea central + grosor), recortado en la línea base.
// - E: barra superior, barra central + fuste con chaflán, y barra inferior como plano aparte (pliegue).
export const MARK = {
  viewBox: '0 0 711 295',
  width: 711,
  height: 295,
  c: 'M278.14 61.41 A152.34 146.22 -26.51 1 0 259.64 247.39 L227.72 214.33 A104.45 99.43 -20.86 1 1 241.15 93.82 Z',
  amp: { d: 'M478.54 302.5 L342.94 145 C319.16 117.39 307.87 92.79 342.81 74.5 C370.2 60.17 406.64 99.6 374.88 132 C354.59 152.68 288.32 162.54 283.63 210.75 C280.28 245.12 304.66 271.1 339.34 273.3 C373.03 275.43 400.52 248.34 413.31 229.38', strokeWidth: 22.26, baseline: 286.9 },
  e: {
    top: 'M460.9 4.3 H710.9 V53.3 H460.9 Z',
    mid: 'M460.7 124.7 H657.34 L625.12 169.5 H506.4 V286.9 H506.4 L460.7 231.42 Z',
    bottom: 'M508.5 240.6 H711 V286.9 H508.5 Z',
  },
} as const;
