import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './CinematicImage.module.css';

interface CinematicImageProps {
  src: string;
  alt: string;
  aspectRatio: string;
  className?: string;
  parallax?: boolean;
}

/** Fixed-crop, lazy-loaded photo with a subtle scale/drift parallax on scroll. */
export function CinematicImage({
  src,
  alt,
  aspectRatio,
  className,
  parallax = true,
}: CinematicImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!parallax || reducedMotion) return;
      const frame = frameRef.current;
      const img = imgRef.current;
      if (!frame || !img) return;

      gsap.fromTo(
        img,
        { scale: 1.12, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        }
      );
    },
    { dependencies: [parallax, reducedMotion], scope: frameRef }
  );

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ''}`} style={{ aspectRatio }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={styles.img}
      />
    </div>
  );
}
