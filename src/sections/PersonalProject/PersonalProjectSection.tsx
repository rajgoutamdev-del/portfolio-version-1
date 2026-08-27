import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { FlowSequence } from '../../components/flow/FlowSequence';
import { AnimatedChessboard } from '../../components/chessboard/AnimatedChessboard';
import type { PersonalProject } from '../../types/content';
import styles from './PersonalProjectSection.module.css';

interface PersonalProjectSectionProps {
  project: PersonalProject;
  scrollId: string;
}

/** Shared renderer for all four Lab projects — visual varies per project.visual. */
export function PersonalProjectSection({ project, scrollId }: PersonalProjectSectionProps) {
  return (
    <Section id={scrollId} ariaLabel={project.title}>
      <div data-tier={project.tier} className={styles.section}>
        <div className={styles.header}>
          <RevealText as="h3" className={styles.title}>
            {project.title}
          </RevealText>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        <div className={styles.copy}>
          <div className={styles.copyBlock}>
            <h3>What it is</h3>
            <p>{project.whatItIs}</p>
          </div>
          <div className={styles.copyBlock}>
            <h3>Why</h3>
            <p>{project.why}</p>
          </div>
          <div className={styles.copyBlock}>
            <h3>What it took</h3>
            <p>{project.learned}</p>
          </div>
        </div>

        <div className={styles.tech}>
          {project.tech.map((item) => (
            <span key={item} className={styles.pill}>
              {item}
            </span>
          ))}
        </div>

        <div className={styles.visual}>
          {project.visual === 'flow' && project.flow && <FlowSequence steps={project.flow} />}
          {project.visual === 'chessboard' && <AnimatedChessboard />}
          {project.visual === 'typographic' && (
            <div className={styles.typographic}>
              <span className={styles.typographicWord}>{project.title}</span>
              <span className={styles.typographicCaption}>A frontend / UI craft study</span>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
