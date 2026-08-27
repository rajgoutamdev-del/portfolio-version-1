import styles from './ScreenshotFrame.module.css';

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}

/** A real product screenshot, shown at its natural aspect ratio inside a browser-chrome frame. */
export function ScreenshotFrame({ src, alt, label, className }: ScreenshotFrameProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.chrome}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        {label && <span className={styles.chromeLabel}>{label}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className={styles.image} />
    </figure>
  );
}
