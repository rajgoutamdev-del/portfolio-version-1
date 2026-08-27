import type { ToolboxCategory } from '../types/content';

/*
  relatedProjectSlugs only ever points at a project where the connection is
  literally true (verified tech stacks) — never added for narrative flavor.
*/
export const TOOLBOX: ToolboxCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: [
      { name: 'C#' },
      { name: 'Java' },
      { name: 'Python', relatedProjectSlugs: ['freelancing-org'] },
      { name: 'C++' },
      { name: 'C' },
      { name: 'JavaScript' },
      { name: 'TypeScript', relatedProjectSlugs: ['stella', 'real-time-chess', 'wedding-experience'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: '.NET Core' },
      { name: 'Node.js', relatedProjectSlugs: ['stella', 'real-time-chess'] },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', relatedProjectSlugs: ['stella', 'real-time-chess', 'wedding-experience'] },
      { name: 'Angular' },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    items: [
      { name: 'MySQL' },
      { name: 'PostgreSQL', relatedProjectSlugs: ['freelancing-org'] },
      { name: 'PySpark' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    items: [
      { name: 'Azure', relatedProjectSlugs: ['azure-apim', 'mnrl'] },
      { name: 'Azure APIM', relatedProjectSlugs: ['azure-apim'] },
      { name: 'Azure Functions', relatedProjectSlugs: ['azure-apim'] },
      { name: 'Azure Databricks' },
      { name: 'Azure DevOps', relatedProjectSlugs: ['azure-apim'] },
      { name: 'CI/CD', relatedProjectSlugs: ['azure-apim'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    items: [
      { name: 'LLMs', relatedProjectSlugs: ['freelancing-org'] },
      { name: 'AI Agents', relatedProjectSlugs: ['freelancing-org'] },
      { name: 'Agentic Workflows', relatedProjectSlugs: ['freelancing-org'] },
      { name: 'Automation', relatedProjectSlugs: ['freelancing-org'] },
    ],
  },
];
