import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { FlowSequence } from '../../components/flow/FlowSequence';
import {
  PHILOSOPHY_TITLE,
  PHILOSOPHY_STATEMENT,
  PHILOSOPHY_FLOW,
  PHILOSOPHY_QUOTE,
} from '../../data/philosophy';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './Philosophy.module.css';

export function Philosophy() {
  return (
    <Section id={SCROLL_IDS.philosophy} ariaLabel="The Way I Like to Build">
      <RevealText as="h2" className={styles.title}>
        {PHILOSOPHY_TITLE}
      </RevealText>
      <p className={styles.statement}>{PHILOSOPHY_STATEMENT}</p>

      <div className={styles.flowWrap}>
        <FlowSequence steps={PHILOSOPHY_FLOW} />
      </div>

      <p className={styles.quote}>{PHILOSOPHY_QUOTE}</p>
    </Section>
  );
}
