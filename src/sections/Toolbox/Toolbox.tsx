import { useState } from 'react';
import { Section } from '../../components/layout/Section';
import { RevealText } from '../../components/text/RevealText';
import { TOOLBOX } from '../../data/toolbox';
import { titleForSlug } from '../../lib/projectLookup';
import { SCROLL_IDS } from '../../lib/scrollIds';
import styles from './Toolbox.module.css';

export function Toolbox() {
  const [hovered, setHovered] = useState<string[] | null>(null);

  return (
    <Section id={SCROLL_IDS.toolbox} ariaLabel="My Toolbox">
      <RevealText as="h2" className={styles.title}>
        My Toolbox
      </RevealText>

      <div className={styles.grid}>
        {TOOLBOX.map((category) => (
          <div key={category.id} className={styles.category}>
            <h3>{category.label}</h3>
            <div className={styles.items} role="list">
              {category.items.map((item) => {
                const titles = item.relatedProjectSlugs
                  ?.map(titleForSlug)
                  .filter((t): t is string => Boolean(t));
                const related = Boolean(titles?.length);

                return (
                  <button
                    key={item.name}
                    type="button"
                    role="listitem"
                    className={styles.item}
                    data-related={related}
                    onMouseEnter={() => related && setHovered(titles!)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => related && setHovered(titles!)}
                    onBlur={() => setHovered(null)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.caption} aria-live="polite">
        {hovered ? (
          <>
            Shows up in <strong>{hovered.join(', ')}</strong>
          </>
        ) : (
          'Hover a skill to see where it shows up.'
        )}
      </p>
    </Section>
  );
}
