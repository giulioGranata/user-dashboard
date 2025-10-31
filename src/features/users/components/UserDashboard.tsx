import { useEffect, useState } from 'react';
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
      <h2 id="user-directory" className={styles.sectionTitle}>
        Team directory
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
      {selectedUser && isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </section>
  );
}
