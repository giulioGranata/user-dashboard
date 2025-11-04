import { fetchUsers } from '@/features/users/api/userService';
import { DEFAULT_LIMIT } from '@/features/users/constants';
import type { UserRole, UserSummary } from '@/features/users/types/user';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props = {
  search?: string;
  role?: UserRole;
};

export function useUsers({ search, role }: Props) {
  const query = useInfiniteQuery({
    queryKey: ['users', search, role],
    queryFn: ({ pageParam = 0 }) =>
      fetchUsers({ skip: pageParam, limit: DEFAULT_LIMIT, search, role }),
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.reduce((sum, page) => sum + page.users.length, 0);
      return totalLoaded < lastPage.total ? totalLoaded : undefined;
    },
    initialPageParam: 0,
  });

  // Flatten all pages into a single array of users
  const allUsers: UserSummary[] = query.data?.pages.flatMap((page) => page.users) ?? [];

  return {
    ...query,
    data: allUsers,
    total: query.data?.pages[0]?.total ?? 0,
    hasNextPage: query.hasNextPage ?? false,
  };
}
