/**
 * Motion base: Lenis (smooth scroll) sincronizado con GSAP ScrollTrigger.
 *
 * - Con `prefers-reduced-motion: reduce` no se crea Lenis: scroll nativo.
 * - Si la preferencia cambia con la página abierta, se activa/desactiva en caliente.
 * - Los enlaces internos (#id o /#id en la misma página) se desplazan con Lenis
 *   y mueven el foco al destino para no romper la navegación por teclado.
 *
 * Las fases siguientes registran sus animaciones con `onMotionChange`.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | null = null;
const listeners = new Set<(reduced: boolean) => void>();

const raf = (time: number) => lenis?.raf(time * 1000);

export const prefersReducedMotion = (): boolean => reducedQuery.matches;

export const getLenis = (): Lenis | null => lenis;

function startLenis(): void {
  if (lenis) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

function stopLenis(): void {
  if (!lenis) return;
  gsap.ticker.remove(raf);
  lenis.destroy();
  lenis = null;
}

/** Bloquea / desbloquea el scroll (menú móvil, modales). */
export function lockScroll(locked: boolean): void {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
  if (locked) lenis?.stop();
  else lenis?.start();
}

/**
 * Registra un callback que se ejecuta ahora y cada vez que cambia
 * `prefers-reduced-motion`. Devuelve una función para darlo de baja.
 */
export function onMotionChange(cb: (reduced: boolean) => void): () => void {
  listeners.add(cb);
  cb(prefersReducedMotion());
  return () => listeners.delete(cb);
}

export function scrollToTarget(target: HTMLElement): void {
  const focusTarget = () => {
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.2, onComplete: focusTarget });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    focusTarget();
  }
}

function handleAnchorClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!link || link.target === '_blank') return;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
  if (!url.hash || url.hash === '#') return;

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;

  event.preventDefault();
  history.pushState(null, '', url.hash);
  scrollToTarget(target);
}

function applyPreference(): void {
  const reduced = prefersReducedMotion();
  if (reduced) stopLenis();
  else startLenis();
  listeners.forEach((cb) => cb(reduced));
  ScrollTrigger.refresh();
}

let initialised = false;

export function initMotion(): void {
  if (initialised) return;
  initialised = true;
  applyPreference();
  reducedQuery.addEventListener('change', applyPreference);
  document.addEventListener('click', handleAnchorClick);
}

export { gsap, ScrollTrigger };
