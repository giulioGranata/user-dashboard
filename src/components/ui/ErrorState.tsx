import { WarningIcon } from '@/components/icons';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
}

export function ErrorState({ title, message, onRetry, retryLabel = 'Retry' }: ErrorStateProps) {
  return (
    <div role="alert" className={styles.errorState} aria-live="assertive">
      <div className={styles.errorIcon} aria-hidden="true">
        <WarningIcon width={48} height={48} />
      </div>
      <h3 className={styles.errorTitle}>{title}</h3>
      <p className={styles.errorMessage}>{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className={styles.retryButton}
        aria-label={`${retryLabel} loading users`}
      >
        {retryLabel}
      </button>
    </div>
  );
}
