import { cursorAttr } from '../../lib/cursorRegistry';
import styles from './ContactLink.module.css';

interface ContactLinkProps {
  href: string;
  label: string;
}

export function ContactLink({ href, label }: ContactLinkProps) {
  const external = href.startsWith('http');

  return (
    <a
      href={href}
      className={styles.link}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...cursorAttr('build')}
    >
      <span>{label}</span>
      <span aria-hidden="true" className={styles.arrow}>
        →
      </span>
    </a>
  );
}
