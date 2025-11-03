import type { UserSummary } from '@/features/users/types/user';
import { UserStatusValues } from '@/features/users/types/user';
import styles from './UserDetailPanel.module.css';

interface UserDetailPanelProps {
  user: UserSummary;
}

export function UserDetailPanel({ user }: UserDetailPanelProps) {
  return (
    <div className={styles.panel} id="user-profile-details">
      <img
        src={user.avatarUrl}
        alt={`${user.fullName} avatar`}
        className={styles.avatar}
        loading="lazy"
      />
      <div>
        <h3 className={styles.name}>{user.fullName}</h3>
      </div>
      <dl className={styles.metaList}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Role</dt>
          <dd className={styles.metaValue}>{user.role}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Status</dt>
          <dd className={styles.metaValue}>
            <span
              className={`${styles.status} ${
                user.status === UserStatusValues.ACTIVE
                  ? styles.statusActive
                  : styles.statusInactive
              }`}
            >
              {user.status}
            </span>
          </dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Email</dt>
          <dd className={styles.metaValue}>{user.email}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Phone</dt>
          <dd className={styles.metaValue}>{user.phone}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Location</dt>
          <dd className={styles.metaValue}>{user.location}</dd>
        </div>
      </dl>
    </div>
  );
}
