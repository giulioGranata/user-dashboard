import type { UserSummary } from '@/features/users/types/user';
import styles from './UserList.module.css';
import { UserListItem } from './UserListItem';

interface UserListProps {
  users: UserSummary[];
  selectedUserId?: number;
  onSelectUser: (user: UserSummary) => void;
}

export function UserList({ users, selectedUserId, onSelectUser }: UserListProps) {
  return (
    <div className={styles.list} role="list" aria-live="polite">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          isActive={selectedUserId === user.id}
          onSelect={() => onSelectUser(user)}
        />
      ))}
    </div>
  );
}
