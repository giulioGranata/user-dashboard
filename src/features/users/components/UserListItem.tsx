import clsx from 'clsx';
import type { UserSummary } from '../types/user';
import styles from './UserListItem.module.css';

interface UserListItemProps {
  user: UserSummary;
  isActive: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function UserListItem({ user, isActive, onSelect, disabled }: UserListItemProps) {
  return (
    <button
      type="button"
      className={clsx(styles.item, isActive && styles.itemActive)}
      onClick={onSelect}
      disabled={disabled}
      role="listitem"
    >
      <div className={styles.info}>
        <span className={styles.name}>{user.fullName}</span>
        <span className={styles.role}>{user.role}</span>
        <span className={styles.meta}>{user.email}</span>
      </div>
    </button>
  );
}
