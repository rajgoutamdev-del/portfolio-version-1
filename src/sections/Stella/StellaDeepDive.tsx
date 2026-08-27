import { StellaTopologyDiagram } from '../../components/architecture/StellaTopologyDiagram';
import { ProtocolTable } from '../../components/architecture/ProtocolTable';
import { EngineeringFacts } from '../../components/architecture/EngineeringFacts';
import { DiagramFrame } from '../../components/media/DiagramFrame';
import { DeepDiveSection, DeepDiveBlock } from '../../components/layout/DeepDive';
import {
  PROTOCOL_CLIENT_TO_SERVER,
  PROTOCOL_SERVER_TO_CLIENT,
  DESIGN_DECISIONS,
  CHAT_TURN_IMAGE_ALT,
} from '../../data/projects/stellaArchitecture';
import chatTurnDiagram from '../../assets/images/stella-anatomy-of-chat-run.png';

/**
 * A deeper look at Stella specifically — real architecture, no
 * confidentiality boundary (personal project). Continues the Stella story
 * rather than starting a new landmark section.
 */
export function StellaDeepDive() {
  return (
    <DeepDiveSection>
      <DeepDiveBlock eyebrow="System Topology" heading="Browser, backend, gateway">
        <StellaTopologyDiagram />
      </DeepDiveBlock>

      <DeepDiveBlock eyebrow="Anatomy of a Chat Turn" heading="One message, start to finish">
        <DiagramFrame
          src={chatTurnDiagram}
          alt={CHAT_TURN_IMAGE_ALT}
          caption="The spoken and displayed replies come from the same model turn, split apart — a summary and a task-plan breakdown are instructions appended to the outgoing message, then parsed back out of the reply. There's no separate planning or summarization call."
        />
      </DeepDiveBlock>

      <DeepDiveBlock eyebrow="Protocol Surface" heading="What the browser and backend actually say to each other">
        <ProtocolTable clientToServer={PROTOCOL_CLIENT_TO_SERVER} serverToClient={PROTOCOL_SERVER_TO_CLIENT} />
      </DeepDiveBlock>

      <DeepDiveBlock eyebrow="Design Decisions" heading="A few choices worth explaining">
        <EngineeringFacts facts={DESIGN_DECISIONS} />
      </DeepDiveBlock>
    </DeepDiveSection>
  );
}
