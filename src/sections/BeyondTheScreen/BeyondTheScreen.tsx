import { Section } from '../../components/layout/Section';
import { CinematicImage } from '../../components/media/CinematicImage';
import { BEYOND_SCREEN_TITLE, BEYOND_SCREEN_STATEMENT, BEYOND_SCREEN_MOMENTS } from '../../data/beyondTheScreen';
import { SCROLL_IDS } from '../../lib/scrollIds';
import personalPic from '../../assets/images/personal-pic.jpg';
import bikePic from '../../assets/images/bike-pic.jpg';
import styles from './BeyondTheScreen.module.css';

export function BeyondTheScreen() {
  return (
    <Section id={SCROLL_IDS.beyondScreen} ariaLabel="Beyond the Screen">
      <div className={styles.header}>
        <span className={styles.title}>{BEYOND_SCREEN_TITLE}</span>
        <p className={styles.statement}>{BEYOND_SCREEN_STATEMENT}</p>
      </div>

      <div className={styles.moments}>
        <div className={styles.moment}>
          <CinematicImage
            src={personalPic}
            alt={BEYOND_SCREEN_MOMENTS.outdoors.alt}
            aspectRatio="4 / 5"
          />
          <span className={styles.caption}>{BEYOND_SCREEN_MOMENTS.outdoors.label}</span>
        </div>
        <div className={styles.moment}>
          <CinematicImage
            src={bikePic}
            alt={BEYOND_SCREEN_MOMENTS.riding.alt}
            aspectRatio="3 / 2"
          />
          <span className={styles.caption}>{BEYOND_SCREEN_MOMENTS.riding.label}</span>
        </div>
      </div>
    </Section>
  );
}
