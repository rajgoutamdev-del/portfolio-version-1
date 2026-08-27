import type { ProfessionalProject } from '../../types/content';

/*
  Content-safety boundary: this project is proprietary employer work.
  Keep every line here at the level of "what problem space" — never
  architecture, internal names, endpoints, or infra topology. Any edit
  to this file should re-pass the "does this reveal internals?" test
  before shipping.
*/
export const AZURE_APIM: ProfessionalProject = {
  id: 'azure-apim',
  slug: 'azure-apim',
  title: 'Azure APIM Automation',
  summary: 'Automating the management of a large-scale API ecosystem.',
  description:
    'Responsible for automation and management across a production-scale API ecosystem built on Azure API Management and its supporting Azure services — keeping a large, constantly-moving surface area consistent, observable, and safe to change.',
  stats: [{ value: 12000, suffix: '+', caption: 'APIs' }],
  flow: [
    { label: 'Large API Ecosystem' },
    { label: 'Automation' },
    { label: 'API Management' },
    { label: 'Production' },
  ],
  tech: ['Azure API Management', 'Azure Functions', 'Azure DevOps', 'CI/CD'],
};
