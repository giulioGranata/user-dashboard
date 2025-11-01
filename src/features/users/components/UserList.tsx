import useInfiniteScroll from 'react-infinite-scroll-hook';
import { UserListItem } from './UserListItem';
import { Spinner } from '../../../components/users/Spinner';
import type { UserSummary } from '../types/user';
import styles from './UserList.module.css';

interface UserListProps {
  users: UserSummary[];
  isLoading: boolean;
  selectedUserId?: number;
  onSelectUser: (user: UserSummary) => void;
  hasNextPage?: boolean;
  onLoadMore?: () => void;
}

export function UserList({
  users,
  selectedUserId,
  onSelectUser,
  isLoading,
  hasNextPage,
  onLoadMore
}: UserListProps) {
  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage ?? false,
    onLoadMore: onLoadMore ?? (() => {}),
    disabled: !hasNextPage || !onLoadMore,
    rootMargin: '0px 0px 100px 0px'
  });

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
      {hasNextPage && (
        <div ref={sentryRef} className={styles.sentinel} aria-hidden="true">
          {isLoading && (
            <div className={styles.loadingMore} role="status" aria-live="polite">
              <Spinner label="Loading more users" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
