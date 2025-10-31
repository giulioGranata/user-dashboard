import { UserListItem } from './UserListItem';
import type { UserSummary } from '../types/user';
import styles from './UserList.module.css';

interface UserListProps {
  users: UserSummary[];
  isLoading: boolean;
  selectedUserId?: number;
  onSelectUser: (user: UserSummary) => void;
}

export function UserList({ users, selectedUserId, onSelectUser, isLoading }: UserListProps) {
  return (
    <div className={styles.list} role="list" aria-live="polite">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isActive={selectedUserId === user.id}
          onSelect={() => onSelectUser(user)}
          disabled={isLoading}
        />
      ))}
    </div>
  );
}
