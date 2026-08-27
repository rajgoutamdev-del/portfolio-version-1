import Lenis from 'lenis';
import { ensureGsapRegistered, gsap, ScrollTrigger } from '../animations/gsapSetup';

let lenis: Lenis | null = null;

/**
 * Initializes the module-singleton Lenis instance and wires it to GSAP's
 * ticker/ScrollTrigger. Guarded so React 19 StrictMode's double-invoke
 * in dev doesn't create two instances.
 */
export function initLenis(): Lenis {
  if (lenis) return lenis;

  ensureGsapRegistered();

  lenis = new Lenis({
    duration: 1.15,
    // honors prefers-reduced-motion automatically (Lenis default)
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
