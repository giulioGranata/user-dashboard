import styles from './Spinner.module.css';

interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = 'Loading' }: SpinnerProps) {
  return (
    <div className={styles.spinner} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.circle} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
