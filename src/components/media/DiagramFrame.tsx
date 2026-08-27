import styles from './DiagramFrame.module.css';

interface DiagramFrameProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

/** A supplied reference diagram, shown as-is (own native styling) inside a neutral panel. */
export function DiagramFrame({ src, alt, caption, className }: DiagramFrameProps) {
  return (
    <figure className={`${styles.figure} ${className ?? ''}`}>
      <div className={styles.panel}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className={styles.image} />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
