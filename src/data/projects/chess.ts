import type { PersonalProject } from '../../types/content';

export const CHESS: PersonalProject = {
  id: 'chess',
  slug: 'real-time-chess',
  title: 'Real-Time Chess',
  tier: 2,
  tagline: 'Building a real-time multiplayer experience from the ground up.',
  whatItIs:
    'A real-time multiplayer chess backend — two players connect over WebSockets, get matched, and every move is synchronized between them as it happens.',
  why: 'I wanted to actually build real-time communication rather than read about it — matchmaking, move synchronization, session handling, all the pieces that make “real-time” real.',
  learned:
    'This is a deliberate first version: a working WebSocket server before accounts, persistence, or scale enter the picture. Understanding a real-time system starts with getting the simplest version right.',
  tech: ['TypeScript', 'Node.js', 'WebSockets', 'React'],
  visual: 'chessboard',
};
