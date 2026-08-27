import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { FlowStep } from '../../types/content';
import styles from './FlowSequence.module.css';

interface FlowSequenceProps {
  steps: FlowStep[];
}

/**
 * Shared scroll-scrubbed flow diagram — reused with different data across
 * Azure APIM, MNRL, Freelancing Org, Stella, and the AI philosophy section.
 * Path stays a simple straight line (stroke-dashoffset isn't compositor-only
 * like transform/opacity, so geometry is kept cheap on purpose).
 */
export function FlowSequence({ steps }: FlowSequenceProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const track = trackRef.current;
      const line = lineRef.current;
      if (!track || !line) return;

      const stepEls = track.querySelectorAll(`.${styles.step}`);
      const length = line.getTotalLength();

      if (reducedMotion) {
        gsap.set(line, { strokeDashoffset: 0 });
        gsap.set(stepEls, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(stepEls, { opacity: 0.3, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      });

      tl.to(line, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);
      stepEls.forEach((el, i) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.001 }, i / Math.max(stepEls.length - 1, 1));
      });
    },
    { dependencies: [steps, reducedMotion], scope: trackRef }
  );

  return (
    <div className={styles.wrapper}>
      <div ref={trackRef} className={styles.track}>
        <svg className={styles.line} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line ref={lineRef} x1="0" y1="50" x2="100" y2="50" />
        </svg>
        {steps.map((step) => (
          <div key={step.label} className={styles.step}>
            <span className={styles.dot} />
            <span className={styles.label}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
