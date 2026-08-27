import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../animations/gsapSetup';
import { EASE } from '../../animations/motionTokens';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ARCHITECTURE_NODES, ARCHITECTURE_CAPTION } from '../../data/projects/freelancingOrgArchitecture';
import styles from './SystemArchitectureDiagram.module.css';

const BOX_TOP = 50;
const BOX_HEIGHT = 150;
const BOX_BOTTOM = BOX_TOP + BOX_HEIGHT;
const CONNECTOR_Y = BOX_TOP + BOX_HEIGHT / 2;
const FOUNDATION_TOP = 260;
const FOUNDATION_HEIGHT = 80;
const SUBLABEL_START = BOX_TOP + 48;
const SUBLABEL_LINE_HEIGHT = 13;

const lastNode = ARCHITECTURE_NODES[ARCHITECTURE_NODES.length - 1];
const VIEW_WIDTH = lastNode.x + lastNode.width + 20;
const VIEW_HEIGHT = FOUNDATION_TOP + FOUNDATION_HEIGHT + 20;

export function SystemArchitectureDiagram() {
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
        <span className={styles.legendItem}>
          <span className={styles.legendDot} data-kind="automated" />
          Automated
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendDot} data-kind="human" />
          Human decision
        </span>
      </div>

      <div className={styles.frame}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          role="img"
          aria-label="Architecture diagram: a scheduler or manual trigger dispatches through a stateless router to a lead research agent, which fans out to three job-board connectors, then a Claude-powered qualification agent, then a proposal-drafting agent, then a human approval gateway, then human-confirmed outreach — every stage reading and writing one shared Postgres database."
        >
          <defs>
            <marker
              id="arch-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="var(--color-violet)" />
            </marker>
          </defs>

          {/* connectors */}
          <g stroke="var(--color-violet)" strokeWidth="1.5" fill="none">
            {ARCHITECTURE_NODES.slice(0, -1).map((node, i) => {
              const next = ARCHITECTURE_NODES[i + 1];
              return (
                <path
                  key={node.id}
                  d={`M${node.x + node.width},${CONNECTOR_Y} L${next.x - 2},${CONNECTOR_Y}`}
                  markerEnd="url(#arch-arrow)"
                />
              );
            })}
          </g>

          {/* vertical stubs to the foundation band */}
          <g stroke="var(--color-border-strong)" strokeWidth="1.25" strokeDasharray="3 3">
            {ARCHITECTURE_NODES.map((node) => {
              const cx = node.x + node.width / 2;
              return <line key={node.id} x1={cx} y1={BOX_BOTTOM} x2={cx} y2={FOUNDATION_TOP} />;
            })}
          </g>

          {/* nodes */}
          {ARCHITECTURE_NODES.map((node) => {
            const cx = node.x + node.width / 2;
            const isHuman = node.kind === 'human';
            return (
              <g key={node.id}>
                <text x={cx} y={BOX_TOP - 15} textAnchor="middle" className={styles.laneLabel}>
                  {node.lane.toUpperCase()}
                </text>
                <rect
                  x={node.x}
                  y={BOX_TOP}
                  width={node.width}
                  height={BOX_HEIGHT}
                  rx="10"
                  fill={isHuman ? 'var(--diagram-human-fill)' : 'var(--diagram-automated-fill)'}
                  stroke={isHuman ? 'var(--diagram-human)' : 'var(--color-violet)'}
                  strokeWidth="1.4"
                />
                <text x={cx} y={BOX_TOP + 28} textAnchor="middle" className={styles.nodeLabel}>
                  {node.label}
                </text>
                {node.sublabel.map((line, i) => (
                  <text
                    key={line}
                    x={cx}
                    y={SUBLABEL_START + i * SUBLABEL_LINE_HEIGHT}
                    textAnchor="middle"
                    className={styles.nodeSublabel}
                  >
                    {line}
                  </text>
                ))}
                {node.detail?.map((item, i) => {
                  const pillsStartY =
                    SUBLABEL_START + node.sublabel.length * SUBLABEL_LINE_HEIGHT + 6;
                  const pillY = pillsStartY + i * 26;
                  return (
                    <g key={item}>
                      <rect
                        x={node.x + 16}
                        y={pillY}
                        width={node.width - 32}
                        height="20"
                        rx="5"
                        fill="var(--color-surface)"
                        stroke="var(--color-border)"
                      />
                      <text x={cx} y={pillY + 14} textAnchor="middle" className={styles.pillLabel}>
                        {item}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* foundation band */}
          <rect
            x="20"
            y={FOUNDATION_TOP}
            width={VIEW_WIDTH - 40}
            height={FOUNDATION_HEIGHT}
            rx="12"
            fill="var(--color-bg-elevated)"
            stroke="var(--color-border-strong)"
          />
          <text x="44" y={FOUNDATION_TOP + 32} className={styles.foundationLabel}>
            PostgreSQL
          </text>
          <text x="44" y={FOUNDATION_TOP + 52} className={styles.foundationCaption}>
            the single source of truth — every stage above reads and writes here directly
          </text>
        </svg>
      </div>

      <p className={styles.caption}>{ARCHITECTURE_CAPTION}</p>
    </div>
  );
}
