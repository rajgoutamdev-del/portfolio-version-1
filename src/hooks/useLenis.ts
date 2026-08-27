import { useEffect } from 'react';
import { initLenis } from '../lib/lenisInstance';
import { ScrollTrigger } from '../animations/gsapSetup';

/** Boots the Lenis + ScrollTrigger integration once, at the app root. */
export function useLenis() {
  useEffect(() => {
    initLenis();

    const onFontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(onFontsReady);
  }, []);
}
