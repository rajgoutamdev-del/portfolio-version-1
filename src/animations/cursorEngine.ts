import { gsap } from './gsapSetup';
import { CURSOR_LABELS, isCursorKey } from '../lib/cursorRegistry';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, [tabindex]';

export interface CursorEngineHandle {
  destroy: () => void;
}

/**
 * DOM-direct cursor engine — not React state. Pointer position changes at
 * pointermove frequency; routing that through React reconciliation would be
 * wasted work. Position is driven by gsap.quickTo (shares GSAP's/Lenis's one
 * tick loop). Hover state resolution uses a single document-level delegated
 * listener pair, never per-element listeners.
 */
export function mountCursorEngine(dotEl: HTMLElement, labelEl: HTMLElement): CursorEngineHandle {
  const xTo = gsap.quickTo(dotEl, 'x', { duration: 0.45, ease: 'power3' });
  const yTo = gsap.quickTo(dotEl, 'y', { duration: 0.45, ease: 'power3' });

  const onMove = (event: PointerEvent) => {
    xTo(event.clientX);
    yTo(event.clientY);
  };

  const setState = (state: 'default' | 'hover' | 'label', label?: string) => {
    dotEl.dataset.state = state;
    labelEl.textContent = label ?? '';
  };

  const onOver = (event: PointerEvent) => {
    const target = event.target as HTMLElement | null;
    const interactive = target?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
    if (!interactive) return;

    const cursorEl = target?.closest?.('[data-cursor]') as HTMLElement | null;
    const key = cursorEl?.getAttribute('data-cursor') ?? null;

    if (isCursorKey(key)) {
      setState('label', CURSOR_LABELS[key]);
    } else {
      setState('hover');
    }
  };

  const onOut = (event: PointerEvent) => {
    const related = event.relatedTarget as HTMLElement | null;
    const stillInteractive = related?.closest?.(INTERACTIVE_SELECTOR);
    if (!stillInteractive) setState('default');
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.addEventListener('pointerout', onOut, { passive: true });

  return {
    destroy() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    },
  };
}
