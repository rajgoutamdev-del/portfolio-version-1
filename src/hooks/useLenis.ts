import { useEffect } from 'react';
import { initLenis } from '../lib/lenisInstance';
import { ScrollTrigger } from '../animations/gsapSetup';

/** Boots the Lenis + ScrollTrigger integration once, at the app root. */
export function useLenis() {
  useEffect(() => {
    initLenis();

    // Fonts settling reflows text (SplitText line splits, headline sizes);
    // refresh once they're ready so trigger positions match the final layout.
    const onFontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(onFontsReady);

    // Fonts alone don't cover it: lazy-loaded images (see CinematicImage)
    // finish decoding well after mount, on real network latency in
    // production -- unlike near-instant local dev. Each one can grow the
    // page's total scroll height after ScrollTrigger already computed
    // pin/reveal positions from the pre-image layout, and a content-height
    // change doesn't fire a `resize` event, so ScrollTrigger never
    // recalculates on its own. `window.load` fires once every resource
    // (images included) has finished, so refresh there too.
    if (document.readyState === 'complete') {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    }
  }, []);
}
