export const CURSOR_LABELS = {
  explore: 'EXPLORE →',
  view: 'VIEW →',
  about: 'ABOUT →',
  build: 'LET’S BUILD →',
} as const;

export type CursorKey = keyof typeof CURSOR_LABELS;

/** Spread onto an interactive element to declare its cursor hover label. */
export function cursorAttr(key: CursorKey): { 'data-cursor': CursorKey } {
  return { 'data-cursor': key };
}

export function isCursorKey(value: string | null): value is CursorKey {
  return !!value && value in CURSOR_LABELS;
}
