import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { FlowSequence } from '../../components/flow/FlowSequence';
import { Counter } from '../../components/ui/Counter';
import type { ProfessionalProject } from '../../types/content';
import styles from './ProfessionalProjectSection.module.css';

interface ProfessionalProjectSectionProps {
  project: ProfessionalProject;
  scrollId: string;
  eyebrow: string;
}

/** Shared renderer for both professional-work scenes — data-driven, kept abstract. */
export function ProfessionalProjectSection({
  project,
  scrollId,
  eyebrow,
}: ProfessionalProjectSectionProps) {
  return (
    <Section id={scrollId} ariaLabel={project.title}>
      <span className="eyebrow">{eyebrow}</span>
      <RevealText as="h2" className={styles.title}>
        {project.title}
      </RevealText>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.stats}>
        {project.stats.map((stat) => (
          <div key={stat.caption} className={styles.stat}>
            <Counter value={stat.value} suffix={stat.suffix} className={styles.statValue} />
            <span className={styles.statCaption}>{stat.caption}</span>
          </div>
        ))}
      </div>

      <div className={styles.flowWrap}>
        <FlowSequence steps={project.flow} />
      </div>

      <div className={styles.tech}>
        {project.tech.map((item) => (
          <span key={item} className={styles.pill}>
            {item}
          </span>
        ))}
      </div>
    </Section>
  );
}
