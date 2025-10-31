import { useMemo, useState } from 'react';
const INITIAL_FILTERS = {
    search: '',
    role: 'all'
};
export function useUserFilters(users) {
    const [filters, setFilters] = useState(INITIAL_FILTERS);
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
        setSearch: (value) => setFilters((prev) => ({ ...prev, search: value })),
        setRole: (role) => setFilters((prev) => ({ ...prev, role }))
    };
}
