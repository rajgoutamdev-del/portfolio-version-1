import { SystemArchitectureDiagram } from '../../components/architecture/SystemArchitectureDiagram';
import { EngineeringFacts } from '../../components/architecture/EngineeringFacts';
import { ScreenshotFrame } from '../../components/media/ScreenshotFrame';
import { DeepDiveSection, DeepDiveBlock } from '../../components/layout/DeepDive';
import { ENGINEERING_FACTS, DASHBOARD_IMAGE_ALT } from '../../data/projects/freelancingOrgArchitecture';
import dashboardImage from '../../assets/images/freelancing-org-dashboard.png';

/**
 * A deeper look at Freelancing Org specifically — the one personal project
 * with real architecture worth showing (no confidentiality boundary here,
 * unlike the Bajaj Finance work). Continues the Freelancing Org story
 * rather than starting a new landmark section.
 */
export function FreelancingOrgDeepDive() {
  return (
    <DeepDiveSection>
      <DeepDiveBlock eyebrow="System Architecture" heading="How a lead becomes a sent proposal">
        <SystemArchitectureDiagram />
      </DeepDiveBlock>

      <DeepDiveBlock eyebrow="Engineering Notes" heading="A few decisions worth explaining">
        <EngineeringFacts facts={ENGINEERING_FACTS} />
      </DeepDiveBlock>

      <DeepDiveBlock eyebrow="The Dashboard" heading="Where I actually run this">
        <ScreenshotFrame
          src={dashboardImage}
          alt={DASHBOARD_IMAGE_ALT}
          label="goutam_org — Freelancing Ops"
        />
      </DeepDiveBlock>
    </DeepDiveSection>
  );
}
