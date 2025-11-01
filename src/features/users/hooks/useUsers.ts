import { fetchUsers } from '@/features/users/api/userService';
import type { UserSummary } from '@/features/users/types/user';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const DEFAULT_LIMIT = 20;
const INITIAL_PAGE = 0;

export function useUsers() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const skip = currentPage * DEFAULT_LIMIT;

  const query = useQuery({
    queryKey: ['users', skip],
    queryFn: () => fetchUsers({ skip, limit: DEFAULT_LIMIT }),
  });

  const users = query.data?.users ?? [];
  const total = query.data?.total ?? 0;
  const totalPages = Math.ceil(total / DEFAULT_LIMIT);
  const hasNextPage = currentPage < totalPages - 1;
  const hasPreviousPage = currentPage > 0;

  const goToNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    ...query,
    data: users,
    total,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  };
}
