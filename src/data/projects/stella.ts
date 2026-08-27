import type { PersonalProject } from '../../types/content';

export const STELLA: PersonalProject = {
  id: 'stella',
  slug: 'stella',
  title: 'Stella',
  tier: 1,
  tagline: 'A front door to my own AI systems, wherever they’re running.',
  whatItIs:
    'A real-time client to a personal AI agent gateway — a device pairs with the gateway over a signed handshake, opens a persistent connection, and streams the conversation back in real time.',
  why: 'I wanted one real interface into my own AI systems instead of juggling terminals and one-off scripts — something that connects once, stays connected, and picks the conversation back up if it drops.',
  learned:
    'The client turned out to be its own discipline — getting the handshake, reconnects, and session persistence right mattered as much as anything happening on the agent side of the wire. Voice input and output is next on the roadmap.',
  tech: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'Zod'],
  visual: 'flow',
  flow: [
    { label: 'Device' },
    { label: 'Handshake' },
    { label: 'Gateway' },
    { label: 'Conversation' },
  ],
};
