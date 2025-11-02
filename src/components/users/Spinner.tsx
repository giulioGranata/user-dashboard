import styles from './Spinner.module.css';

type Props = {
  label?: string;
};

export function Spinner({ label = 'Loading' }: Props) {
  return (
    <div className={styles.spinner} role="status" aria-live="polite" aria-busy="true">
      <span className={styles.circle} aria-hidden />
      <span className={styles.loadingText}>{label}</span>
    </div>
  );
}
