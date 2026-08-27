import type { PersonalProject } from '../../types/content';

/*
  Framed honestly as a recreation/UI study (confirmed with the project owner) —
  this rebuilds the UI of an existing luxury event-planning site as a frontend
  exercise. Deliberately generic: no real business/person is named here.
*/
export const WEDDING: PersonalProject = {
  id: 'wedding',
  slug: 'wedding-experience',
  title: 'Wedding Experience',
  tier: 3,
  tagline: 'A frontend-craft study in motion, layout, and visual polish.',
  whatItIs:
    'A multi-page site recreating the UI of an existing luxury event-planning brand — built as a study, not a client project, to practice frontend craft end to end.',
  why: 'Some of my best frontend learning happens by rebuilding something well-made and asking why each decision was made — spacing, type pairing, the way a page reveals itself as you scroll.',
  learned:
    'Custom scroll-reveal and preloader components, a serif/sans type pairing, and eight routed pages taught me more about production frontend craft than a tutorial would have.',
  tech: ['React', 'TypeScript', 'React Router', 'CSS'],
  visual: 'typographic',
};
