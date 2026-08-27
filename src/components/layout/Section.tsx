import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  bare?: boolean;
}

/** Landmark wrapper shared by every scene — id matches lib/scrollIds. */
export function Section({ id, ariaLabel, children, className, bare = false }: SectionProps) {
  return (
    <section id={id} aria-label={ariaLabel} className={`${styles.section} ${className ?? ''}`}>
      {bare ? children : <div className={styles.inner}>{children}</div>}
    </section>
  );
}
