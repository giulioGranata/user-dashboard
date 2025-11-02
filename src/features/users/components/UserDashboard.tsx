import { SearchIcon } from '@/components/icons';
import { Spinner } from '@/components/users/Spinner';
import { UserFiltersState } from '@/features/users/hooks/useUserFilters';
import { useUsers } from '@/features/users/hooks/useUsers';
import type { UserSummary } from '@/features/users/types/user';
import { useEffect, useState } from 'react';
import { ErrorState } from './ErrorState';
import styles from './UserDashboard.module.css';
import { UserDetailModal } from './UserDetailModal';
import { UserFilters } from './UserFilters';
import { UserList } from './UserList';

export function UserDashboard() {
  const [filters, setFilters] = useState<UserFiltersState>({ search: '', role: 'all' });

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUsers({ search: filters.search, role: filters.role });

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRole = filters.role === 'all' ? true : user.role === filters.role;
    return matchesSearch && matchesRole;
  });

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
        onSearchChange={(value) => setFilters({ ...filters, search: value })}
        onRoleChange={(role) => setFilters({ ...filters, role })}
        total={filteredUsers.length}
      />
      {isLoading && (
        <div className={styles.loadingState} role="status" aria-live="polite">
          <Spinner label="Loading users" />
          <p className={styles.loadingText}>Fetching team members...</p>
        </div>
      )}
      {isError && (
        <ErrorState
          title="We could not load the users"
          message="Please check your connection and try again."
          onRetry={() => refetch()}
        />
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
          isLoading={isFetchingNextPage}
          selectedUserId={selectedUser?.id}
          onSelectUser={handleSelectUser}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
      {selectedUser && isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </section>
  );
}
