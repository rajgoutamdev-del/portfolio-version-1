import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../animations/gsapSetup';
import { BREAKPOINTS } from '../animations/motionTokens';

interface Beat {
  ref: RefObject<HTMLElement | null>;
  /** Extra tween vars merged into this beat's reveal (e.g. scale: 1). Last beat persists (no fade-out). */
  toVars?: gsap.TweenVars;
}

/**
 * Shared pinned crossfade sequence — desktop + non-reduced-motion only.
 * Used by LabTransition and FinalScene, the site's two black-screen beats.
 */
export function usePinnedBeatSequence(
  sectionRef: RefObject<HTMLElement | null>,
  beats: Beat[],
  endDistance = '+=180%'
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ isDesktop: BREAKPOINTS.desktop, isReduced: BREAKPOINTS.reduceMotion }, (context) => {
        const { isDesktop, isReduced } = context.conditions as {
          isDesktop: boolean;
          isReduced: boolean;
        };
        if (!isDesktop || isReduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: endDistance,
            scrub: true,
            pin: true,
          },
        });

        beats.forEach((beat, i) => {
          if (i === 0) {
            tl.to(beat.ref.current, { opacity: 1, duration: 1, ...beat.toVars });
            return;
          }
          const prev = beats[i - 1];
          tl.to(prev.ref.current, { opacity: 0, duration: 1 }, '+=0.5');
          tl.to(beat.ref.current, { opacity: 1, duration: 1, ...beat.toVars }, '<');
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );
}
