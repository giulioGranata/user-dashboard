import { EyeIcon } from '@/components/icons';
import type { UserSummary } from '@/features/users/types/user';
import clsx from 'clsx';
import type { MouseEvent } from 'react';
import styles from './UserListItem.module.css';

interface UserListItemProps {
  user: UserSummary;
  isActive: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function UserListItem({ user, isActive, onSelect, disabled }: UserListItemProps) {
  const handleViewDetails = (e: MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <div
      className={clsx(styles.item, isActive && styles.itemActive, disabled && styles.disabled)}
      role="listitem"
      onClick={onSelect}
    >
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={styles.name}>{user.fullName}</span>
          <span className={styles.role} data-role={user.role}>
            {user.role}
          </span>
        </div>
        <span className={styles.email}>{user.email}</span>
      </div>
      <button
        type="button"
        className={clsx('buttonGhost', styles.ctaButton)}
        onClick={handleViewDetails}
        disabled={disabled}
        aria-label={`View details for ${user.fullName}`}
        title="View details"
      >
        <EyeIcon />
        <span className="visuallyHidden">View details</span>
      </button>
    </div>
  );
}
