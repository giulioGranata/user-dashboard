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
  const statusClassName = clsx({
    [styles.statusActive]: user.status === 'Active',
    [styles.statusInactive]: user.status === 'Inactive',
    [styles.statusOut]: user.status === 'Out of office'
  });

  return (
    <button
      type="button"
      className={clsx(styles.item, isActive && styles.itemActive)}
      onClick={onSelect}
      disabled={disabled}
      role="listitem"
    >
      <img src={user.avatarUrl} alt={`${user.fullName} avatar`} className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.name}>{user.fullName}</span>
        <div className={styles.meta}>
          <span className={styles.role}>{user.role}</span>
          <span className={statusClassName}>{user.status}</span>
        </div>
        <span className={styles.meta}>{user.email}</span>
      </div>
    </button>
  );
}
