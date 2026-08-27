import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText } from '../../animations/gsapSetup';
import { EASE, DURATION, BREAKPOINTS } from '../../animations/motionTokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Section } from '../../components/layout/Section';
import { AmbientGlow } from '../../components/ui/AmbientGlow';
import { HERO_CONTENT } from '../../data/hero';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './Hero.module.css';

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const focusRef = useRef<HTMLParagraphElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  // Entrance: plays once on mount, independent of scroll — the site's
  // first breath. Reduced motion sets final state instantly.
  useGSAP(
    () => {
      const els = [nameRef.current, roleRef.current, focusRef.current, sloganRef.current];
      if (els.some((el) => !el)) return;

      if (reducedMotion) {
        gsap.set(els, { opacity: 1 });
        return;
      }

      const splits = els.map((el) => new SplitText(el as HTMLElement, { type: 'lines', mask: 'lines' }));
      gsap.set(els, { opacity: 1 });

      const tl = gsap.timeline({ delay: 0.4, defaults: { ease: EASE.cinematic } });
      splits.forEach((split, i) => {
        tl.from(
          split.lines,
          { yPercent: 115, opacity: 0, stagger: 0.06, duration: DURATION.slow },
          i === 0 ? 0 : '+=0.15'
        );
      });

      return () => splits.forEach((s) => s.revert());
    },
    { dependencies: [reducedMotion], scope: contentRef }
  );

  // Scroll-out: only pins/scrubs on desktop, never under reduced motion —
  // the hero dissolves as the visitor scrolls into The Engineer.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ isDesktop: BREAKPOINTS.desktop, isReduced: BREAKPOINTS.reduceMotion }, (context) => {
        const { isDesktop, isReduced } = context.conditions as { isDesktop: boolean; isReduced: boolean };
        if (!isDesktop || isReduced) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=70%',
            scrub: true,
            pin: true,
          },
        });
        tl.to(contentRef.current, { scale: 0.92, opacity: 0, ease: 'none' }, 0);
        tl.to(scrollHintRef.current, { opacity: 0, ease: 'none' }, 0);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef}>
      <Section id={SCROLL_IDS.hero} ariaLabel="Introduction" className={styles.section} bare>
        <AmbientGlow variant="primary" />
        <div ref={contentRef} className={styles.content}>
          <h1 ref={nameRef} className={styles.name} style={{ opacity: 0 }}>
            {HERO_CONTENT.name}
          </h1>
          <p ref={roleRef} className={styles.role} style={{ opacity: 0 }}>
            {HERO_CONTENT.role}
          </p>
          <p ref={focusRef} className={styles.focus} style={{ opacity: 0 }}>
            {HERO_CONTENT.focus}
          </p>
          <p ref={sloganRef} className={styles.slogan} style={{ opacity: 0 }}>
            {HERO_CONTENT.slogan[0]}
            <br />
            {HERO_CONTENT.slogan[1]}
          </p>
        </div>
        <span ref={scrollHintRef} className={styles.scrollHint}>
          Scroll
        </span>
      </Section>
    </div>
  );
}
