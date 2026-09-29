/**
 * Revelados genéricos al entrar en pantalla:
 *  - [data-reveal]       → sube y aparece (opacidad + desplazamiento).
 *  - [data-reveal-line]  → línea de titular que sale de su máscara (.mask).
 * Sin JS o con reduced motion todo está visible desde el principio: el estado
 * inicial solo lo aplica GSAP dentro del contexto de "motion".
 */
import { gsap, ScrollTrigger } from './motion';

let initialised = false;

export function initReveals(): void {
  if (initialised) return;
  initialised = true;

  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const lines = gsap.utils.toArray<HTMLElement>('[data-reveal-line]');
    const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

    gsap.set(lines, { yPercent: 110 });
    gsap.set(items, { opacity: 0, y: 36 });

    ScrollTrigger.batch(lines, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
    });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });
  });
}
