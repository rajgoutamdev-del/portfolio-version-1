/*
  JS mirror of src/styles/tokens.css motion values — single source both
  sides read. If the desktop breakpoint changes, update tokens.css too.
*/
export const EASE = {
  cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 1.1,
} as const;

export const BREAKPOINTS = {
  desktop: '(min-width: 1024px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
} as const;

export const COARSE_POINTER_QUERY = '(hover: none), (pointer: coarse)';
