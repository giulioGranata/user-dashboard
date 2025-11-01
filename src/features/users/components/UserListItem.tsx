import clsx from 'clsx';
import type { UserSummary } from '../types/user';
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
  editor: { bg: 'rgba(59, 130, 246, 0.15)', text: '#93c5fd' },
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
        className={styles.ctaButton}
        onClick={handleViewDetails}
        disabled={disabled}
        aria-label={`View details for ${user.fullName}`}
        title="View details"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        <span className="visuallyHidden">View details</span>
    </button>
    </div>
  );
}
