import { useState } from 'react';
import { BRAND_NAME } from '../../data/nav';
import { getLenis, scrollToId } from '../../lib/lenisInstance';
import { SCROLL_IDS } from '../../lib/scrollIds';
import { MenuOverlay } from './MenuOverlay';
import styles from './SiteNav.module.css';

export function SiteNav() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      const lenis = getLenis();
      if (next) lenis?.stop();
      else lenis?.start();
      return next;
    });
  };

  const close = () => {
    setOpen(false);
    getLenis()?.start();
  };

  return (
    <>
      <header className={styles.nav}>
        <a
          href={`#${SCROLL_IDS.hero}`}
          className={styles.brand}
          onClick={(event) => {
            event.preventDefault();
            scrollToId(SCROLL_IDS.hero);
          }}
        >
          {BRAND_NAME}
        </a>
        <button
          type="button"
          className={styles.trigger}
          onClick={toggle}
          aria-expanded={open}
          aria-controls="site-menu-overlay"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div id="site-menu-overlay">
        <MenuOverlay open={open} onClose={close} />
      </div>
    </>
  );
}
