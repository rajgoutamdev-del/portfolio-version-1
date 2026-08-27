import type { ReactNode } from 'react';
import { RevealText } from '../text/RevealText';
import styles from './DeepDive.module.css';

/** Shared wrapper for a project's extended "V2-style" content — continues
 * the project's own landmark rather than starting a new one. */
export function DeepDiveSection({ children }: { children: ReactNode }) {
  return <div className={styles.wrap}>{children}</div>;
}

interface DeepDiveBlockProps {
  eyebrow: string;
  heading: string;
  children: ReactNode;
}

export function DeepDiveBlock({ eyebrow, heading, children }: DeepDiveBlockProps) {
  return (
    <div className={styles.block}>
      <span className="eyebrow">{eyebrow}</span>
      <RevealText as="h4" className={styles.heading}>
        {heading}
      </RevealText>
      {children}
    </div>
  );
}
