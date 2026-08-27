/*
  Personal project — no confidentiality boundary here. Detail drawn from the
  project's own architecture notes, simplified for a portfolio read.
*/
export const TOPOLOGY_CAPTION =
  'The browser and the Gateway never connect to each other — every wire crosses the backend, the only holder of long-lived secrets. Finished replies are also spoken here, server-side; audio never travels back over the browser WebSocket.';

export const CHAT_TURN_IMAGE_ALT =
  'Sequence diagram of one full chat turn across the browser, the Stella backend, and the OpenClaw Gateway: session token fetch, WebSocket auth, history sync, a message send that gets an immediate acknowledgement while the real reply is tracked separately by run id, a progress loop while the model works, and a finished reply that is split into display text, a spoken summary, and a task plan.';

export interface ProtocolMessage {
  key: string;
  description: string;
  future?: boolean;
}

export const PROTOCOL_CLIENT_TO_SERVER: ProtocolMessage[] = [
  { key: 'auth', description: 'Hand the backend the one-time session token before anything else is accepted.' },
  { key: 'chat.send', description: 'Send a user turn: conversation id, text, a client-generated idempotency key.' },
  { key: 'chat.abort', description: 'Cancel the in-flight run for a conversation.' },
  { key: 'chat.history.request', description: "Ask for a conversation's transcript, or start a new one." },
  { key: 'tts.setEnabled', description: 'Turn server-side speech on or off.' },
];

export const PROTOCOL_SERVER_TO_CLIENT: ProtocolMessage[] = [
  { key: 'connection.status', description: 'Current Gateway link state.' },
  { key: 'chat.history', description: 'The requested transcript.' },
  { key: 'chat.message.user.ack', description: 'Reconciles the optimistic local user bubble.' },
  { key: 'chat.message.start', description: 'A run was accepted; the assistant bubble begins.' },
  { key: 'chat.message.delta', description: 'One streamed token', future: true },
  { key: 'chat.message.end', description: 'The finished reply text, ready to render.' },
  { key: 'tool.activity', description: 'A tool call started or ended', future: true },
  { key: 'session.operation', description: 'Raw session operation event', future: true },
  { key: 'chat.progress', description: '"What\'s happening" status line, at most once a minute.' },
  { key: 'task.plan', description: "The Current Task panel's structured step breakdown." },
  { key: 'error', description: 'Scoped, retryable-flagged error.' },
  { key: 'tts.state', description: 'Whether server-side speech is currently on.' },
];

export const DESIGN_DECISIONS = [
  {
    label: 'No session database',
    value:
      "The session key itself is the durable identifier. The Gateway's own history is the transcript store, so Stella keeps no conversation log of its own.",
  },
  {
    label: 'Signed regardless',
    value:
      'Every connection goes through full Ed25519 device signing, even on loopback — claiming a reserved client id would grant no exemption anyway.',
  },
  {
    label: 'Secrets in one place',
    value:
      'Only three backend files ever see the Gateway token or the device private key. The browser gets a completely separate, backend-minted session token.',
  },
  {
    label: 'Fire, then listen',
    value:
      'chat.send returns the instant the Gateway accepts a run. The real reply arrives later as an event, matched back by run id.',
  },
  {
    label: 'Speech stays server-side',
    value: 'Replies are spoken through the OS directly. The browser only ever learns an on/off boolean — no audio crosses the WebSocket.',
  },
  {
    label: 'Schema ahead of wiring',
    value:
      'Token streaming and tool-activity events are already defined and already handled by the frontend listener — nothing sends them yet. The seam for v2 is pre-built.',
  },
];
