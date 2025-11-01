import { useEffect, useState } from 'react';
import { SearchIcon, WarningIcon } from '../../../components/icons';
import { Spinner } from '../../../components/users/Spinner';
import { useUserFilters } from '../hooks/useUserFilters';
import { useUsers } from '../hooks/useUsers';
import type { UserSummary } from '../types/user';
import styles from './UserDashboard.module.css';
import { UserDetailModal } from './UserDetailModal';
import { UserFilters } from './UserFilters';
import { UserList } from './UserList';

export function UserDashboard() {
  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const { filters, filteredUsers, setRole, setSearch } = useUserFilters(users);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const stillVisible = filteredUsers.some((user) => user.id === selectedUser.id);

    if (!stillVisible) {
      setSelectedUser(null);
      setIsModalOpen(false);
    }
  }, [filteredUsers, selectedUser]);

  const handleSelectUser = (user: UserSummary) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.dashboard} aria-labelledby="user-directory">
      <UserFilters
        filters={filters}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        total={filteredUsers.length}
      />
      {isLoading && (
        <div className={styles.loadingState} role="status" aria-live="polite">
          <Spinner label="Loading users" />
          <p className={styles.loadingText}>Fetching team members...</p>
        </div>
      )}
      {isError && (
        <div role="alert" className={styles.errorState} aria-live="assertive">
          <div className={styles.errorIcon} aria-hidden="true">
            <WarningIcon width={48} height={48} />
          </div>
          <h3 className={styles.errorTitle}>We could not load the users</h3>
          <p className={styles.errorMessage}>Please check your connection and try again.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className={styles.retryButton}
            aria-label="Retry loading users"
          >
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && filteredUsers.length === 0 && (
        <div className={styles.emptyState} role="status" aria-live="polite">
          <div className={styles.emptyIcon} aria-hidden="true">
            <SearchIcon width={48} height={48} />
          </div>
          <h3 className={styles.emptyTitle}>No users match your filters</h3>
          <p className={styles.emptyMessage}>
            Try updating the search term or selecting a different role.
          </p>
        </div>
      )}
      {!isLoading && !isError && filteredUsers.length > 0 && (
        <UserList
          users={filteredUsers}
          isLoading={false}
          selectedUserId={selectedUser?.id}
          onSelectUser={handleSelectUser}
        />
      )}
      {selectedUser && isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </section>
  );
}
