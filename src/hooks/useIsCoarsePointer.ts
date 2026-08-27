import { useEffect, useState } from 'react';
import { COARSE_POINTER_QUERY } from '../animations/motionTokens';

/** True for touch/coarse-pointer devices — gates the custom cursor entirely. */
export function useIsCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COARSE_POINTER_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(COARSE_POINTER_QUERY);
    const handler = (event: MediaQueryListEvent) => setCoarse(event.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return coarse;
}
