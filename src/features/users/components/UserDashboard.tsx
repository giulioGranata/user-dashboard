import { EmptyState, ErrorState, Spinner } from '@/components/ui';
import { useUsers } from '@/features/users/hooks/useUsers';
import type { UserFiltersState } from '@/features/users/types/filters';
import type { UserSummary } from '@/features/users/types/user';
import { useEffect, useState } from 'react';
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

  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    const stillVisible = users.some((user) => user.id === selectedUser.id);

    if (!stillVisible) {
      setSelectedUser(null);
    }
  }, [users, selectedUser]);

  const handleSelectUser = (user: UserSummary) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <section className={styles.dashboard} aria-labelledby="user-dashboard">
      <h2 id="user-dashboard" className="visuallyHidden">
        User Dashboard
      </h2>
      <UserFilters
        filters={filters}
        onSearchChange={(value) => setFilters({ ...filters, search: value })}
        onRoleChange={(role) => setFilters({ ...filters, role })}
        total={users.length}
      />
      {isLoading && (
        <div className={styles.loadingState} role="status" aria-live="polite">
          <Spinner label="Loading users" />
        </div>
      )}
      {isError && (
        <ErrorState
          title="We could not load the users"
          message="Please check your connection and try again."
          onRetry={() => refetch()}
        />
      )}
      {!isLoading && !isError && users.length === 0 && (
        <EmptyState
          title="No users match your filters"
          message="Try updating the search term or selecting a different role."
        />
      )}
      {!isLoading && !isError && users.length > 0 && (
        <UserList
          users={users}
          isLoading={isFetchingNextPage}
          selectedUserId={selectedUser?.id}
          onSelectUser={handleSelectUser}
          hasNextPage={hasNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
      {selectedUser && <UserDetailModal user={selectedUser} onClose={handleCloseModal} />}
    </section>
  );
}
