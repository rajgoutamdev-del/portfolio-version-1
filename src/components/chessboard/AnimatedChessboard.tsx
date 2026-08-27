import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../animations/motionTokens';
import {
  INITIAL_PIECES,
  OPENING_SEQUENCE,
  glyphFor,
  squareToPercent,
} from './chessboardData';
import styles from './AnimatedChessboard.module.css';

const SQUARES = Array.from({ length: 64 }, (_, i) => {
  const row = Math.floor(i / 8);
  const col = i % 8;
  return { key: i, tone: (row + col) % 2 === 0 ? 'dark' : 'light' } as const;
});

/**
 * A coded, on-brand illustration of real-time move sync — not a screenshot
 * of the (currently minimal) real frontend. Plays a short, recognizable
 * opening once when scrolled into view.
 */
export function AnimatedChessboard() {
  const boardRef = useRef<HTMLDivElement>(null);
  const pieceRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const board = boardRef.current;
      if (!board) return;

      if (reducedMotion) {
        // Jump straight to the final position — no animated sequence.
        OPENING_SEQUENCE.forEach(({ pieceId, to }) => {
          const el = pieceRefs.current.get(pieceId);
          if (!el) return;
          const { left, top } = squareToPercent(to);
          gsap.set(el, { left: `${left}%`, top: `${top}%` });
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: board, start: 'top 70%', once: true },
        delay: 0.2,
      });

      OPENING_SEQUENCE.forEach(({ pieceId, to }, i) => {
        const el = pieceRefs.current.get(pieceId);
        if (!el) return;
        const { left, top } = squareToPercent(to);
        tl.to(
          el,
          { left: `${left}%`, top: `${top}%`, duration: 0.55, ease: EASE.cinematic },
          i === 0 ? 0.4 : '+=0.35'
        );
      });
    },
    { dependencies: [reducedMotion], scope: boardRef }
  );

  return (
    <div
      ref={boardRef}
      className={styles.board}
      role="img"
      aria-label="Animated chessboard illustrating a short opening sequence between two players."
    >
      {SQUARES.map((sq) => (
        <div key={sq.key} className={styles.square} data-tone={sq.tone} />
      ))}
      {INITIAL_PIECES.map((piece) => {
        const { left, top } = squareToPercent(piece.square);
        return (
          <div
            key={piece.id}
            ref={(el) => {
              if (el) pieceRefs.current.set(piece.id, el);
            }}
            className={styles.piece}
            data-color={piece.color}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            {glyphFor(piece.type)}
          </div>
        );
      })}
    </div>
  );
}
