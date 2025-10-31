import { Spinner } from '../../../components/users/Spinner';
import type { UserSummary } from '../types/user';
import styles from './UserDetailPanel.module.css';

interface UserDetailPanelProps {
  user: UserSummary | null;
  isLoading: boolean;
}

export function UserDetailPanel({ user, isLoading }: UserDetailPanelProps) {
  if (isLoading) {
    return <Spinner label="Loading profile" />;
  }

  if (!user) {
    return (
      <p className={styles.placeholder}>
        Select a teammate to see their contact information and current availability.
      </p>
    );
  }

  return (
    <div className={styles.panel}>
      <img src={user.avatarUrl} alt={`${user.fullName} avatar`} className={styles.avatar} />
      <div>
        <h3 className={styles.name}>{user.fullName}</h3>
        <p className={styles.metaValue}>{user.status}</p>
      </div>
      <dl className={styles.metaList}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Role</dt>
          <dd className={styles.metaValue}>{user.role}</dd>
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
