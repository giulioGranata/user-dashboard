import { useEffect, useState } from 'react';
import { Spinner } from '../../../components/users/Spinner';
import { UserDetailPanel } from './UserDetailPanel';
import { UserFilters } from './UserFilters';
import { UserList } from './UserList';
import { useUserFilters } from '../hooks/useUserFilters';
import { useUsers } from '../hooks/useUsers';
import type { UserSummary } from '../types/user';
import styles from './UserDashboard.module.css';

export function UserDashboard() {
  const { data: users = [], isLoading, isError, refetch } = useUsers();
  const { filters, filteredUsers, setRole, setSearch } = useUserFilters(users);
  const [selectedUser, setSelectedUser] = useState<UserSummary | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (filteredUsers.length === 0) {
      setSelectedUser(null);
      return;
    }

    setSelectedUser((current) => {
      if (current && filteredUsers.some((user) => user.id === current.id)) {
        return current;
      }

      return filteredUsers[0];
    });
  }, [filteredUsers, isLoading]);

  const handleSelectUser = (user: UserSummary) => {
    setSelectedUser(user);
  };

  return (
    <div className={styles.dashboard}>
      <section className={styles.panel} aria-labelledby="user-filters">
        <h2 id="user-filters" className={styles.sectionTitle}>
          Filters
        </h2>
        <UserFilters
          filters={filters}
          onSearchChange={setSearch}
          onRoleChange={setRole}
          total={filteredUsers.length}
        />
        {isLoading && <Spinner label="Loading users" />}
        {isError && (
          <div role="alert" className={styles.emptyState}>
            <h3>We could not load the users</h3>
            <p>Please check your connection and try again.</p>
            <button type="button" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}
      </section>

      <section className={styles.panel} aria-labelledby="user-list">
        <h2 id="user-list" className={styles.sectionTitle}>
          Team members
        </h2>
        {filteredUsers.length === 0 && !isLoading ? (
          <div className={styles.emptyState}>
            <h3>No users match your filters</h3>
            <p>Try updating the search term or selecting a different role.</p>
          </div>
        ) : (
          <UserList
            users={filteredUsers}
            isLoading={isLoading}
            selectedUserId={selectedUser?.id}
            onSelectUser={handleSelectUser}
          />
        )}
      </section>

      <section className={styles.panel} aria-labelledby="user-detail">
        <h2 id="user-detail" className={styles.sectionTitle}>
          Profile
        </h2>
        <UserDetailPanel user={selectedUser} isLoading={isLoading} />
      </section>
    </div>
  );
}
