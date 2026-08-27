import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { EASE } from '../../animations/motionTokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/** Scroll-triggered count-up, used for the scale figures on professional work. */
export function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (reducedMotion) {
        el.textContent = `${value.toLocaleString()}${suffix}`;
        return;
      }

      const counter = { val: 0 };
      gsap.to(counter, {
        val: value,
        duration: 1.6,
        ease: EASE.standard,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.floor(counter.val).toLocaleString()}${suffix}`;
        },
      });
    },
    { dependencies: [value, suffix, reducedMotion], scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
