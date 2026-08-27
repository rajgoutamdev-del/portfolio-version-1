/*
  Personal project — no confidentiality boundary here (unlike Azure APIM /
  MNRL). This is real detail from the project's own architecture notes,
  simplified for a portfolio read rather than an internal review doc.
*/
export interface ArchitectureNode {
  id: string;
  lane: string;
  label: string;
  sublabel: string[];
  kind: 'automated' | 'human';
  detail?: string[];
  x: number;
  width: number;
}

export const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'trigger',
    lane: 'Trigger',
    label: 'Scheduler',
    sublabel: ['ticks every 30s,', 'or a manual run'],
    kind: 'automated',
    x: 20,
    width: 150,
  },
  {
    id: 'router',
    lane: 'Route',
    label: 'Freelance Head',
    sublabel: ['stateless router,', 'no writes'],
    kind: 'automated',
    x: 195,
    width: 150,
  },
  {
    id: 'research',
    lane: 'Discover',
    label: 'Lead Research Agent',
    sublabel: ['fetch → normalize → dedupe'],
    kind: 'automated',
    detail: ['RemoteOK', 'Remotive', 'We Work Remotely'],
    x: 370,
    width: 280,
  },
  {
    id: 'qualify',
    lane: 'Qualify',
    label: 'Qualification Agent',
    sublabel: ['Claude API,', 'scores fit'],
    kind: 'automated',
    x: 675,
    width: 170,
  },
  {
    id: 'proposal',
    lane: 'Draft',
    label: 'Proposal Agent',
    sublabel: ['drafts only,', 'never sends'],
    kind: 'automated',
    x: 870,
    width: 170,
  },
  {
    id: 'approval',
    lane: 'Approve — you',
    label: 'Approval Gateway',
    sublabel: ['approve · reject ·', 'request changes'],
    kind: 'human',
    x: 1065,
    width: 190,
  },
  {
    id: 'outreach',
    lane: 'Send — you',
    label: 'Outreach',
    sublabel: ['human-confirmed', 'send'],
    kind: 'human',
    x: 1280,
    width: 170,
  },
];

export const ARCHITECTURE_CAPTION =
  'Violet stages run unattended. Every stage reads and writes one Postgres database directly — nothing calls another stage without going through it first.';

export const ENGINEERING_FACTS = [
  {
    label: 'Stack',
    value: 'FastAPI · SQLAlchemy (async) · PostgreSQL · Docker Compose · Claude API',
  },
  {
    label: 'Why event-driven, not a queue',
    value:
      'A handful of events a day, one consumer — a Postgres outbox gives durability and an audit trail for free. A dedicated message queue would be a second system to keep alive for no real benefit at this scale.',
  },
  {
    label: 'Runtime model',
    value:
      'One process, three independent loops — an HTTP server, a scheduler, and an event dispatcher — all reading and writing only through Postgres, never calling each other directly.',
  },
  {
    label: 'Idempotency',
    value: 'Unique constraints do the work. Reruns and retries are safe by design, not by convention.',
  },
];

export const DASHBOARD_IMAGE_ALT =
  'The Freelancing Ops dashboard: live pipeline stats, the research schedule, and a log of recent agent activity.';
