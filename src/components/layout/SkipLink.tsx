import styles from './SkipLink.module.css';

export function SkipLink() {
  return (
    <a href="#main-content" className={styles.link}>
      Skip to content
    </a>
  );
}
