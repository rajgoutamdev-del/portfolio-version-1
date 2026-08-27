import { useRef } from 'react';
import { usePinnedBeatSequence } from '../../hooks/usePinnedBeatSequence';
import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { ContactLink } from '../../components/ui/ContactLink';
import { FINAL_SCENE_BEATS, FINAL_SCENE_SLOGAN, CONTACT_IDENTITY, CONTACT_LINKS } from '../../data/finalScene';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './FinalScene.module.css';

export function FinalScene() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const beat1Ref = useRef<HTMLParagraphElement>(null);
  const beat2Ref = useRef<HTMLParagraphElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);

  usePinnedBeatSequence(pinnedRef, [{ ref: beat1Ref }, { ref: beat2Ref }, { ref: sloganRef }]);

  return (
    <>
      <div ref={pinnedRef}>
        <Section id="closing-beat" ariaLabel="Closing" className={styles.pinnedSection} bare>
          <div className={styles.stage}>
            <p ref={beat1Ref} className={styles.beat}>
              {FINAL_SCENE_BEATS[0]}
            </p>
            <p ref={beat2Ref} className={styles.beat}>
              {FINAL_SCENE_BEATS[1]}
            </p>
            <p ref={sloganRef} className={styles.title}>
              {FINAL_SCENE_SLOGAN[0]}
              <br />
              {FINAL_SCENE_SLOGAN[1]}
            </p>
          </div>
        </Section>
      </div>

      <Section id={SCROLL_IDS.contact} ariaLabel="Contact" className={styles.identitySection}>
        <div className={styles.identity}>
          <RevealText as="p" className={styles.name}>
            {CONTACT_IDENTITY.name}
          </RevealText>
          <p className={styles.role}>{CONTACT_IDENTITY.title}</p>
        </div>
        <nav className={styles.links} aria-label="Contact links">
          {CONTACT_LINKS.map((link) => (
            <ContactLink key={link.label} href={link.href} label={link.label} />
          ))}
        </nav>
      </Section>
    </>
  );
}
