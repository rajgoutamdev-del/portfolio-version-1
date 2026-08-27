import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../animations/motionTokens';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(BREAKPOINTS.reduceMotion).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(BREAKPOINTS.reduceMotion);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return reduced;
}
