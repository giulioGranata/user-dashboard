import type { PropsWithChildren } from 'react';
import styles from './AppLayout.module.css';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title}>Team Directory</h1>
          <p className={styles.subtitle}>
            Track your organization at a glance. Filter by role, search by name, and review
            up-to-date status information with a responsive, accessible experience.
          </p>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
