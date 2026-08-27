import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './ScaleLine.module.css';

/** Thin divider that draws in on scroll — transform-only, GPU-friendly. */
export function ScaleLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        gsap.set(el, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 65%', scrub: 0.5 },
        }
      );
    },
    { dependencies: [reducedMotion], scope: ref }
  );

  return <div ref={ref} className={`${styles.line} ${className ?? ''}`} />;
}
