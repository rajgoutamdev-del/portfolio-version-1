import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { EASE, DURATION } from '../../animations/motionTokens';
import { NAV_LINKS } from '../../data/nav';
import { scrollToId } from '../../lib/lenisInstance';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './MenuOverlay.module.css';

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useFocusTrap(overlayRef, open, onClose);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll(`.${styles.item}`);

      if (reducedMotion) {
        gsap.set(overlay, { clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' });
        gsap.set(items, { y: 0, opacity: open ? 1 : 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } });
      tl.to(overlay, {
        clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        duration: DURATION.slow,
      });
      tl.fromTo(
        items,
        { yPercent: open ? 110 : 0, opacity: open ? 0 : 1 },
        { yPercent: open ? 0 : 110, opacity: open ? 1 : 0, duration: DURATION.base, stagger: 0.06 },
        open ? '-=0.6' : 0
      );
    },
    { dependencies: [open], scope: overlayRef }
  );

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
    >
      <nav>
        <ul role="list" className={styles.list}>
          {NAV_LINKS.map((link) => (
            <li key={link.targetId} className={styles.item}>
              <a
                href={`#${link.targetId}`}
                className={styles.link}
                tabIndex={open ? 0 : -1}
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                  scrollToId(link.targetId);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
