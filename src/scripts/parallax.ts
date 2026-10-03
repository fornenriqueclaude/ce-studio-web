/**
 * Hero: entrada, parallax por capas y tilt con el ratón.
 *
 *  - Entrada (una vez): las piezas C / & / E se ensamblan desde la profundidad, el
 *    titular sube línea a línea y el resto aparece. Encadenada con el loader.
 *  - Scroll (scrub): rejilla 0.2×, UI 0.5×, marca ~0.7× separando sus piezas en Z/X,
 *    titular 1.2× desvaneciéndose. Al volver arriba todo se recompone.
 *  - Tilt: 2–4° en escritorio con puntero fino.
 *
 * Todo vive dentro de gsap.matchMedia: con reduced motion no se crea nada y, si la
 * preferencia o el tamaño cambian, se revierte y se reconstruye solo.
 */
import { gsap, ScrollTrigger } from './motion';
import { finishIntro, hasIntro, hasLoader, whenIntroOpens } from './intro';

type Piece = 'c' | 'amp' | 'e' | 'fold';

export function initHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const one = <T extends Element = HTMLElement>(sel: string) => hero.querySelector<T>(sel);
  const all = <T extends Element = HTMLElement>(sel: string) => Array.from(hero.querySelectorAll<T>(sel));

  const bg = one('[data-layer="bg"]');
  const ui = one('[data-layer="ui"]');
  const uiTilt = one('[data-ui-tilt]');
  const markWrap = one('[data-hero-mark]');
  const tilt = one('[data-tilt]');
  const copy = one('[data-hero-copy]');
  const pieces = Object.fromEntries(
    (['c', 'amp', 'e', 'fold'] as Piece[]).map((p) => [p, one<SVGSVGElement>(`[data-piece="${p}"]`)]),
  ) as Record<Piece, SVGSVGElement | null>;

  if (!bg || !ui || !uiTilt || !markWrap || !tilt || !copy || Object.values(pieces).some((p) => !p)) return;

  const { c, amp, e, fold } = pieces as Record<Piece, SVGSVGElement>;
  const isDesktop = () => window.matchMedia('(min-width: 64rem)').matches;

  // ---------- Entrada ----------
  const runIntro = (): Promise<void> => {
    document.documentElement.setAttribute('data-intro-running', '');
    const lines = all('[data-intro="line"]');
    // En móvil, el párrafo principal no entra con fundido: ya está pintado (LCP)
    const narrow = window.matchMedia('(max-width: 47.99rem)').matches;
    const fades = all('[data-intro="fade"]').filter((el) => !(narrow && el.hasAttribute('data-lcp')));
    const frags = all('[data-frag]');
    // Con loader, su marca vuela hasta aquí y hace el relevo: las piezas ya llegan montadas
    const handoff = hasLoader();

    // GSAP toma el control del estado inicial que marcaba el CSS
    // y: 0 → descarta el translateY(110%) del CSS, que GSAP leería como píxeles
    gsap.set(lines, { yPercent: 110, y: 0 });
    gsap.set([...fades, uiTilt, markWrap], { opacity: 0 });
    finishIntro();

    return new Promise((resolve) => {
      whenIntroOpens().then(() => {
        const k = isDesktop() ? 1 : 0.6;
        const tl = gsap
          .timeline({
            defaults: { ease: 'expo.out', duration: 1.5 },
            onComplete: () => {
              // Por si el relevo del loader no llegó a producirse
              if (handoff) gsap.to(markWrap, { opacity: 1, duration: 0.3 });
              document.documentElement.removeAttribute('data-intro-running');
              resolve();
            },
          })
          .to(lines, { yPercent: 0, duration: 1.2, stagger: 0.09 }, 0.15)
          .fromTo(fades, { y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.07 }, 0.5)
          .to(uiTilt, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0.35)
          .from(frags, { y: 40, duration: 1.6, stagger: 0.1 }, 0.35)
          .add(() => markWrap.classList.add('is-sheening'), 1.2);

        if (!handoff) {
          tl.to(markWrap, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
            .from(c, { xPercent: -16 * k, z: -260, rotationY: 22, opacity: 0 }, 0)
            .from(amp, { yPercent: -18 * k, z: 320, rotation: -10, opacity: 0 }, 0.08)
            .from(e, { xPercent: 16 * k, z: -180, rotationY: -22, opacity: 0 }, 0.12)
            .from(fold, { yPercent: 14 * k, rotationX: -70, transformOrigin: '50% 78%', opacity: 0 }, 0.2);
        }
      });
    });
  };

  const introDone: Promise<void> = hasIntro() ? runIntro() : Promise.resolve();

  const buildScroll = (desktop: boolean): void => {
    const h = () => hero.offsetHeight;
    const k = desktop ? 1 : 0.55;
    // Escritorio: la marca (a la derecha) va algo más lenta que el texto.
    // Móvil: la marca está encima del texto, así que sube más rápido para no pisarlo.
    const markSpeed = desktop ? 0.85 : 1.3;
    const copySpeed = desktop ? 1.2 : 1;
    gsap
      .timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      // capas a distinta velocidad (y = (1 − velocidad) · recorrido)
      .to(bg, { y: () => h() * 0.8 }, 0)
      .to(ui, { y: () => h() * 0.5 }, 0)
      .to(markWrap, { y: () => h() * (1 - markSpeed) }, 0)
      .to(copy, { y: () => h() * (1 - copySpeed) }, 0)
      .to(copy, { opacity: 0, duration: 0.55, ease: 'power1.in' }, 0)
      // la marca se separa en profundidad
      .to(c, { xPercent: -10 * k, z: -180, rotationY: 16 }, 0)
      .to(amp, { yPercent: -10 * k, z: 240, rotation: -6 }, 0)
      .to(e, { xPercent: 10 * k, z: -90, rotationY: -16 }, 0)
      .to(fold, { xPercent: 13 * k, yPercent: 12 * k, z: 120, rotationX: -38, transformOrigin: '50% 78%' }, 0);
  };

  const buildTilt = (): (() => void) => {
    const rotX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3' });
    const rotY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3' });
    const uiX = gsap.quickTo(uiTilt, 'x', { duration: 1.2, ease: 'power3' });
    const uiY = gsap.quickTo(uiTilt, 'y', { duration: 1.2, ease: 'power3' });

    const onMove = (ev: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const px = ((ev.clientX - r.left) / r.width) * 2 - 1;
      const py = ((ev.clientY - r.top) / r.height) * 2 - 1;
      rotY(px * 4);
      rotX(-py * 3);
      uiX(px * -18);
      uiY(py * -12);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
      uiX(0);
      uiY(0);
    };

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      gsap.set([tilt, uiTilt], { clearProps: 'transform' });
    };
  };

  // ---------- Scroll + tilt (según medio) ----------
  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 64rem)',
      finePointer: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { motion, desktop, finePointer } = ctx.conditions as Record<string, boolean>;
      if (!motion) {
        markWrap.classList.remove('is-sheening');
        return;
      }

      let cleanupTilt: (() => void) | undefined;
      let alive = true;

      // Registrada con nombre para ejecutarla más tarde dentro del contexto (se revierte con él)
      const start = ctx.add('start', () => {
        markWrap.classList.add('is-sheening');
        buildScroll(!!desktop);
        if (desktop && finePointer) cleanupTilt = buildTilt();
        ScrollTrigger.refresh();
      });
      introDone.then(() => alive && start());

      return () => {
        alive = false;
        cleanupTilt?.();
      };
    },
  );
}
