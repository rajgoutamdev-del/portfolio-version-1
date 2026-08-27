import type { PersonalProject } from '../../types/content';

export const FREELANCING_ORG: PersonalProject = {
  id: 'freelancing-org',
  slug: 'freelancing-org',
  title: 'Freelancing Org',
  tier: 1,
  tagline: 'An AI-driven system that automates the freelancing workflow.',
  whatItIs:
    'A pipeline that runs the early stages of freelance work end to end — discovering opportunities, researching them, scoring fit, and drafting proposals — so my own time goes into the parts that actually need a human intervention.',
  why: 'I wanted to see how far a real, working AI pipeline could go — not a demo, an actual backend with agents making calls and a human approval gate on anything that leaves the building.',
  learned:
    'Freelance platforms don’t hand out a “send” API to individuals, so the system is built around that constraint from day one — every draft waits on a human decision, and nothing reaches a client without someone confirming it first.',
  tech: ['Python', 'FastAPI', 'PostgreSQL', 'Claude API', 'Docker'],
  visual: 'flow',
  flow: [
    { label: 'Opportunity' },
    { label: 'AI' },
    { label: 'Research' },
    { label: 'Qualify' },
    { label: 'Proposal' },
    { label: 'Outreach' },
  ],
};
