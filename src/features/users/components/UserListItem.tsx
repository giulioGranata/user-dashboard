import clsx from 'clsx';
import { EyeIcon } from '@/components/icons';
import type { UserSummary } from '@/features/users/types/user';
import styles from './UserListItem.module.css';

interface UserListItemProps {
  user: UserSummary;
  isActive: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

const roleColors: Record<UserSummary['role'], { bg: string; text: string }> = {
  admin: { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5' },
  manager: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d' },
  viewer: { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1' },
};

export function UserListItem({ user, isActive, onSelect, disabled }: UserListItemProps) {
  const roleColor = roleColors[user.role];

  const handleViewDetails = (e: React.MouseEvent) => {
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
          <span
            className={styles.role}
            style={{
              backgroundColor: roleColor.bg,
              color: roleColor.text,
            }}
          >
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
