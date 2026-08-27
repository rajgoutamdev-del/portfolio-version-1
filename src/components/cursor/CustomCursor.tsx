import { useEffect, useRef } from 'react';
import { mountCursorEngine } from '../../animations/cursorEngine';
import { useIsCoarsePointer } from '../../hooks/useIsCoarsePointer';
import styles from './CustomCursor.module.css';

/**
 * Renders nothing at all on coarse/touch pointers — no engine mounts, no
 * listeners attach. `document.documentElement[data-cursor-enabled]` flips
 * the native `cursor: none` rule in global.css to match.
 */
export function CustomCursor() {
  const isCoarse = useIsCoarsePointer();
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.documentElement.dataset.cursorEnabled = String(!isCoarse);
    if (isCoarse) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    const engine = mountCursorEngine(dot, label);
    return () => engine.destroy();
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} data-state="default">
        <span ref={labelRef} className={styles.label} />
      </div>
    </div>
  );
}
