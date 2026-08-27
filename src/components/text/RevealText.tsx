import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../animations/gsapSetup';
import { EASE, DURATION } from '../../animations/motionTokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealTextProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  start?: string;
}

/**
 * Scroll-triggered line mask/stagger reveal — the shared entrance technique
 * for scene headlines. SplitText's `mask: 'lines'` auto-wraps each line in
 * an overflow-hidden container, which *is* the mask reveal.
 */
export function RevealText({ as: Tag = 'div', className, children, start = 'top 80%' }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = new SplitText(el, { type: 'lines', mask: 'lines' });

      if (reducedMotion) {
        gsap.set(split.lines, { yPercent: 0, opacity: 1 });
        return () => split.revert();
      }

      const tween = gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.08,
        duration: DURATION.slow,
        ease: EASE.cinematic,
        scrollTrigger: { trigger: el, start },
      });

      return () => {
        tween.scrollTrigger?.kill();
        split.revert();
      };
    },
    { dependencies: [children, reducedMotion, start], scope: ref as React.RefObject<HTMLElement> }
  );

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
