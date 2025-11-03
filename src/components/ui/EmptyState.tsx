import { SearchIcon } from '@/components/icons';
import type { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <div className={styles.emptyState} role="status" aria-live="polite">
      <div className={styles.emptyIcon} aria-hidden="true">
        {icon || <SearchIcon width={48} height={48} />}
      </div>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyMessage}>{message}</p>
    </div>
  );
}
