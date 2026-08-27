import { PROFESSIONAL_PROJECTS, PERSONAL_PROJECTS } from '../data/projects';

const ALL_PROJECTS = [...PROFESSIONAL_PROJECTS, ...PERSONAL_PROJECTS];

export function titleForSlug(slug: string): string | undefined {
  return ALL_PROJECTS.find((project) => project.slug === slug)?.title;
}
