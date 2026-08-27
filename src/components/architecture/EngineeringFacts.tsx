import styles from './EngineeringFacts.module.css';

interface Fact {
  label: string;
  value: string;
}

export function EngineeringFacts({ facts }: { facts: Fact[] }) {
  return (
    <div className={styles.grid}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <span className={styles.label}>{fact.label}</span>
          <p className={styles.value}>{fact.value}</p>
        </div>
      ))}
    </div>
  );
}
