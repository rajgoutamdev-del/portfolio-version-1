import { useLenis } from './hooks/useLenis';
import { SkipLink } from './components/layout/SkipLink';
import { CustomCursor } from './components/cursor/CustomCursor';
import { SiteNav } from './components/nav/SiteNav';
import { Hero } from './sections/Hero/Hero';
import { TheEngineer } from './sections/TheEngineer/TheEngineer';
import { ProfessionalProjectSection } from './sections/ProfessionalProject/ProfessionalProjectSection';
import { LabTransition } from './sections/LabTransition/LabTransition';
import { PersonalProjectSection } from './sections/PersonalProject/PersonalProjectSection';
import { FreelancingOrgDeepDive } from './sections/FreelancingOrg/FreelancingOrgDeepDive';
import { StellaDeepDive } from './sections/Stella/StellaDeepDive';
import { Toolbox } from './sections/Toolbox/Toolbox';
import { Philosophy } from './sections/Philosophy/Philosophy';
import { BeyondTheScreen } from './sections/BeyondTheScreen/BeyondTheScreen';
import { FinalScene } from './sections/FinalScene/FinalScene';
import { AZURE_APIM, MNRL, FREELANCING_ORG, STELLA, CHESS, WEDDING } from './data/projects';
import { SCROLL_IDS } from './lib/scrollIds';

export function App() {
  useLenis();

  return (
    <>
      <SkipLink />
      <CustomCursor />
      <SiteNav />
      <main id="main-content">
        <Hero />
        <TheEngineer />
        <ProfessionalProjectSection
          project={AZURE_APIM}
          scrollId={SCROLL_IDS.azureApim}
          eyebrow="Professional — 01"
        />
        <ProfessionalProjectSection
          project={MNRL}
          scrollId={SCROLL_IDS.mnrl}
          eyebrow="Professional — 02"
        />
        <LabTransition />
        <PersonalProjectSection project={FREELANCING_ORG} scrollId={SCROLL_IDS.freelancingOrg} />
        <FreelancingOrgDeepDive />
        <PersonalProjectSection project={STELLA} scrollId={SCROLL_IDS.stella} />
        <StellaDeepDive />
        <PersonalProjectSection project={CHESS} scrollId={SCROLL_IDS.chess} />
        <PersonalProjectSection project={WEDDING} scrollId={SCROLL_IDS.wedding} />
        <Toolbox />
        <Philosophy />
        <BeyondTheScreen />
        <FinalScene />
      </main>
    </>
  );
}
