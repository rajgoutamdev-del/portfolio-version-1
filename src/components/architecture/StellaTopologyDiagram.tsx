import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { EASE } from '../../animations/motionTokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { TOPOLOGY_CAPTION } from '../../data/projects/stellaArchitecture';
import styles from './StellaTopologyDiagram.module.css';

export function StellaTopologyDiagram() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = wrapperRef.current;
      if (!el || reducedMotion) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.cinematic,
          scrollTrigger: { trigger: el, start: 'top 82%' },
        }
      );
    },
    { dependencies: [reducedMotion], scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.legend}>
        <span className={styles.legendItem} data-kind="request">
          <span className={styles.legendLine} />
          command / request
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendLine} data-style="dashed" />
          event / response
        </span>
        <span className={styles.legendItem} data-kind="signal">
          <span className={styles.legendLine} />
          voice output (server-side)
        </span>
      </div>

      <div className={styles.frame}>
        <svg
          className={styles.svg}
          viewBox="0 0 1040 320"
          role="img"
          aria-label="Topology: the browser connects only to the Stella backend over a session-token WebSocket. The backend, holding the device keys and gateway token, is the only thing that connects onward to the OpenClaw Gateway. A side branch shows the backend speaking finished replies aloud via the operating system's speech output, which never reaches the browser."
        >
          <defs>
            <marker id="stella-arrow-req" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--color-violet)" />
            </marker>
            <marker id="stella-arrow-evt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--color-text-faint)" />
            </marker>
            <marker id="stella-arrow-sig" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--diagram-signal)" />
            </marker>
          </defs>

          {/* connectors: browser <-> backend */}
          <line x1="200" y1="135" x2="418" y2="135" stroke="var(--color-violet)" strokeWidth="1.5" markerEnd="url(#stella-arrow-req)" />
          <text x="310" y="122" textAnchor="middle" className={styles.arrowLabel}>
            auth · send · history
          </text>
          <line x1="418" y1="170" x2="200" y2="170" stroke="var(--color-text-faint)" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#stella-arrow-evt)" />
          <text x="310" y="188" textAnchor="middle" className={styles.arrowLabel}>
            messages · plan · tts
          </text>

          {/* connectors: backend <-> gateway */}
          <line x1="620" y1="135" x2="818" y2="135" stroke="var(--color-violet)" strokeWidth="1.5" markerEnd="url(#stella-arrow-req)" />
          <text x="720" y="122" textAnchor="middle" className={styles.arrowLabel}>
            send · history (signed)
          </text>
          <line x1="818" y1="170" x2="620" y2="170" stroke="var(--color-text-faint)" strokeWidth="1.4" strokeDasharray="5 4" markerEnd="url(#stella-arrow-evt)" />
          <text x="720" y="188" textAnchor="middle" className={styles.arrowLabel}>
            chat events · tools
          </text>

          {/* browser */}
          <rect x="20" y="100" width="180" height="80" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border-strong)" strokeWidth="1.4" />
          <text x="110" y="134" textAnchor="middle" className={styles.boxLabel}>
            Browser
          </text>
          <text x="110" y="154" textAnchor="middle" className={styles.boxSublabel}>
            React · Vite
          </text>

          {/* backend */}
          <rect x="420" y="60" width="200" height="160" rx="10" fill="var(--color-violet-soft)" stroke="var(--color-violet)" strokeWidth="1.5" />
          <text x="520" y="92" textAnchor="middle" className={styles.boxLabel}>
            Stella Backend
          </text>
          <text x="520" y="110" textAnchor="middle" className={styles.boxSublabel}>
            Node · WS + HTTP
          </text>
          <text x="520" y="196" textAnchor="middle" className={styles.boxSublabel}>
            holds: device keys, gateway token,
          </text>
          <text x="520" y="210" textAnchor="middle" className={styles.boxSublabel}>
            session tokens
          </text>

          {/* gateway */}
          <rect x="820" y="100" width="200" height="80" rx="10" fill="var(--color-bg-elevated)" stroke="var(--color-border-strong)" strokeWidth="1.4" />
          <text x="920" y="134" textAnchor="middle" className={styles.boxLabel}>
            OpenClaw Gateway
          </text>
          <text x="920" y="154" textAnchor="middle" className={styles.boxSublabel}>
            ws://127.0.0.1:&lt;port&gt;
          </text>

          {/* tts side branch */}
          <line x1="520" y1="220" x2="520" y2="248" stroke="var(--diagram-signal)" strokeWidth="1.6" markerEnd="url(#stella-arrow-sig)" />
          <text x="536" y="238" className={styles.signalLabel}>
            speak(spokenText)
          </text>
          <rect x="440" y="250" width="160" height="54" rx="8" fill="none" stroke="var(--diagram-signal)" strokeWidth="1.3" />
          <text x="520" y="273" textAnchor="middle" className={styles.signalLabel}>
            macOS "say"
          </text>
          <text x="520" y="289" textAnchor="middle" className={styles.signalLabel}>
            → Mac speakers
          </text>
        </svg>
      </div>

      <p className={styles.caption}>{TOPOLOGY_CAPTION}</p>
    </div>
  );
}
