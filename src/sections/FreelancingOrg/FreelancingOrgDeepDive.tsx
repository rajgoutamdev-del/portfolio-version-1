import { SystemArchitectureDiagram } from '../../components/architecture/SystemArchitectureDiagram';
import { EngineeringFacts } from '../../components/architecture/EngineeringFacts';
import { ScreenshotFrame } from '../../components/media/ScreenshotFrame';
import { RevealText } from '../../components/text/RevealText';
import { ENGINEERING_FACTS, DASHBOARD_IMAGE_ALT } from '../../data/projects/freelancingOrgArchitecture';
import dashboardImage from '../../assets/images/freelancing-org-dashboard.png';
import styles from './FreelancingOrgDeepDive.module.css';

/**
 * A deeper look at Freelancing Org specifically — the one personal project
 * with real architecture worth showing (no confidentiality boundary here,
 * unlike the Bajaj Finance work). Continues the Freelancing Org story
 * rather than starting a new landmark section.
 */
export function FreelancingOrgDeepDive() {
  return (
    <div className={styles.wrap}>
      <div className={styles.block}>
        <span className="eyebrow">System Architecture</span>
        <RevealText as="h4" className={styles.heading}>
          How a lead becomes a sent proposal
        </RevealText>
        <SystemArchitectureDiagram />
      </div>

      <div className={styles.block}>
        <span className="eyebrow">Engineering Notes</span>
        <RevealText as="h4" className={styles.heading}>
          A few decisions worth explaining
        </RevealText>
        <EngineeringFacts facts={ENGINEERING_FACTS} />
      </div>

      <div className={styles.block}>
        <span className="eyebrow">The Dashboard</span>
        <RevealText as="h4" className={styles.heading}>
          Where I actually run this
        </RevealText>
        <ScreenshotFrame
          src={dashboardImage}
          alt={DASHBOARD_IMAGE_ALT}
          label="goutam_org — Freelancing Ops"
        />
      </div>
    </div>
  );
}
