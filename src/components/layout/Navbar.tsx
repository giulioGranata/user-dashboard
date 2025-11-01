import { ThemeToggle } from '@/components/layout/ThemeToggle';
import styles from './Navbar.module.css';

export function Navbar() {
  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <h1 className={styles.title}>User Dashboard</h1>
      <ThemeToggle />
    </nav>
  );
}

