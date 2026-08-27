export interface FlowStep {
  label: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  timeline: string;
}

export interface ProfessionalProject {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  stats: { value: number; suffix: string; caption: string }[];
  flow: FlowStep[];
  tech: string[];
}

export type ProjectTier = 1 | 2 | 3;
export type PersonalProjectVisual = 'flow' | 'chessboard' | 'typographic';

export interface PersonalProject {
  id: string;
  slug: string;
  title: string;
  tier: ProjectTier;
  tagline: string;
  whatItIs: string;
  why: string;
  learned: string;
  tech: string[];
  visual: PersonalProjectVisual;
  flow?: FlowStep[];
}

export interface ToolboxItem {
  name: string;
  relatedProjectSlugs?: string[];
}

export interface ToolboxCategory {
  id: string;
  label: string;
  items: ToolboxItem[];
}

export interface NavLink {
  label: string;
  targetId: string;
}
