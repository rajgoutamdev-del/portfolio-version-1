import type { ProtocolMessage } from '../../data/projects/stellaArchitecture';
import styles from './ProtocolTable.module.css';

interface ProtocolTableProps {
  clientToServer: ProtocolMessage[];
  serverToClient: ProtocolMessage[];
}

export function ProtocolTable({ clientToServer, serverToClient }: ProtocolTableProps) {
  return (
    <div className={styles.grid}>
      <div>
        <h4 className={styles.caption}>Client → Server</h4>
        <dl className={styles.list}>
          {clientToServer.map((message) => (
            <div key={message.key} className={styles.row}>
              <dt className={styles.key}>{message.key}</dt>
              <dd className={styles.desc}>{message.description}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h4 className={styles.caption}>Server → Client</h4>
        <dl className={styles.list}>
          {serverToClient.map((message) => (
            <div key={message.key} className={styles.row}>
              <dt className={styles.key}>{message.key}</dt>
              <dd className={styles.desc}>
                {message.description}
                {message.future && <span className={styles.futureTag}> — schema only, not sent yet</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
