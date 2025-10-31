import { useMemo, useState } from 'react';
import type { UserRole, UserSummary } from '../types/user';

export interface UserFiltersState {
  search: string;
  role: UserRole | 'all';
}

const INITIAL_FILTERS: UserFiltersState = {
  search: '',
  role: 'all'
};

export function useUserFilters(users: UserSummary[]) {
  const [filters, setFilters] = useState<UserFiltersState>(INITIAL_FILTERS);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = user.fullName.toLowerCase().includes(normalizedSearch);
      const matchesRole = filters.role === 'all' ? true : user.role === filters.role;
      return matchesSearch && matchesRole;
    });
  }, [users, filters]);

  return {
    filters,
    filteredUsers,
    setSearch: (value: string) => setFilters((prev) => ({ ...prev, search: value })),
    setRole: (role: UserFiltersState['role']) => setFilters((prev) => ({ ...prev, role }))
  };
}
