import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { ScaleLine } from '../../components/ui/ScaleLine';
import { ENGINEER_STATEMENT, EXPERIENCE } from '../../data/experience';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './TheEngineer.module.css';

export function TheEngineer() {
  return (
    <Section id={SCROLL_IDS.engineer} ariaLabel="The Engineer">
      <RevealText as="h2" className={styles.statement}>
        {ENGINEER_STATEMENT[0]}
        <br />
        {ENGINEER_STATEMENT[1]}
      </RevealText>

      <ScaleLine className={styles.divider} />

      <div className={styles.experience}>
        <div>
          <p className={styles.company}>{EXPERIENCE.company}</p>
          <p className={styles.role}>{EXPERIENCE.role}</p>
        </div>
        <p className={styles.timeline}>{EXPERIENCE.timeline}</p>
      </div>
    </Section>
  );
}
