import { useRef } from 'react';
import { usePinnedBeatSequence } from '../../hooks/usePinnedBeatSequence';
import { Section } from '../../components/layout/Section';
import { LAB_TRANSITION_BEATS, LAB_TITLE } from '../../data/labTransition';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './LabTransition.module.css';

export function LabTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const beat1Ref = useRef<HTMLParagraphElement>(null);
  const beat2Ref = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  usePinnedBeatSequence(sectionRef, [
    { ref: beat1Ref },
    { ref: beat2Ref },
    { ref: titleRef, toVars: { scale: 1 } },
  ]);

  return (
    <div ref={sectionRef}>
      <Section id={SCROLL_IDS.lab} ariaLabel="The Lab" className={styles.section} bare>
        <div className={styles.stage}>
          <p ref={beat1Ref} className={styles.beat}>
            {LAB_TRANSITION_BEATS[0]}
          </p>
          <p ref={beat2Ref} className={styles.beat}>
            {LAB_TRANSITION_BEATS[1]}
          </p>
          <h2 ref={titleRef} className={styles.title} style={{ transform: 'scale(0.94)' }}>
            {LAB_TITLE}
          </h2>
        </div>
      </Section>
    </div>
  );
}
