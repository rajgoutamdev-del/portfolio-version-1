import type { ProfessionalProject } from '../../types/content';

/*
  Content-safety boundary: this project is proprietary employer work.
  Keep every line here at the level of "what problem space" — never
  architecture, detection logic, internal services, or data structures.
  Any edit to this file should re-pass the "does this reveal internals?"
  test before shipping.
*/
export const MNRL: ProfessionalProject = {
  id: 'mnrl',
  slug: 'mnrl',
  title: 'MNRL',
  summary: 'A large-scale fraud-risk management initiative.',
  description:
    'Engineering work on a high-volume, production-critical fraud-risk system — built to hold up under heavy daily load across a large Azure-based API infrastructure, where reliability isn’t optional.',
  stats: [
    { value: 120, suffix: 'M+', caption: 'records' },
    { value: 200, suffix: 'M+', caption: 'daily requests' },
  ],
  flow: [{ label: 'Scale' }, { label: 'Reliability' }, { label: 'Engineering' }],
  tech: ['Fraud Risk Management', 'Azure', 'High-Volume Data', 'Production Systems'],
};
