import styles from './AmbientGlow.module.css';

interface AmbientGlowProps {
  variant?: 'primary' | 'soft';
  className?: string;
}

/** Purely decorative ambient lighting layer — never carries content. */
export function AmbientGlow({ variant = 'primary', className }: AmbientGlowProps) {
  return <div aria-hidden="true" className={`${styles.glow} ${styles[variant]} ${className ?? ''}`} />;
}
