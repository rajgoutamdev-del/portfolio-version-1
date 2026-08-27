/** Single source of truth for section anchor ids — read by nav, Section, and ScrollTrigger. */
export const SCROLL_IDS = {
  hero: 'hero',
  engineer: 'the-engineer',
  azureApim: 'azure-apim',
  mnrl: 'mnrl',
  lab: 'the-lab',
  freelancingOrg: 'freelancing-org',
  stella: 'stella',
  chess: 'real-time-chess',
  wedding: 'wedding-experience',
  toolbox: 'toolbox',
  philosophy: 'the-way-i-build',
  beyondScreen: 'beyond-the-screen',
  contact: 'contact',
} as const;

export type ScrollId = (typeof SCROLL_IDS)[keyof typeof SCROLL_IDS];
