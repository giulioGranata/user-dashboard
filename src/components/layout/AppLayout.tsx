import type { PropsWithChildren } from 'react';
import { Navbar } from './Navbar';
import styles from './AppLayout.module.css';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <Navbar />
      <div className={styles.inner}>
        <main>{children}</main>
      </div>
    </div>
  );
}
