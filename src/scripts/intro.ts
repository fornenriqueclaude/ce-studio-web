/**
 * Coordinación loader → hero.
 *
 * Un script inline en <head> (ver Loader.astro) decide antes del primer pintado:
 *  - html[data-loader="on"]  → primera visita de la sesión y sin reduced motion.
 *  - html.intro-pending      → el hero arrancará con su animación de entrada.
 *
 * El loader llama a `openIntro()` justo cuando empieza a "abrirse", para que el hero
 * entre encadenado con él. Sin loader, el hero arranca de inmediato.
 */
let open: () => void = () => {};
const opened = new Promise<void>((resolve) => {
  open = resolve;
});

export const hasLoader = (): boolean => document.documentElement.dataset['loader'] === 'on';

export const hasIntro = (): boolean => document.documentElement.classList.contains('intro-pending');

export function openIntro(): void {
  open();
}

export function whenIntroOpens(): Promise<void> {
  return hasLoader() ? opened : Promise.resolve();
}

export function finishIntro(): void {
  document.documentElement.classList.remove('intro-pending');
}
