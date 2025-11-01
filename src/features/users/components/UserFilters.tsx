import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SearchIcon } from '../../../components/icons';
import { useDebounce } from '../hooks/useDebounce';
import type { UserFiltersState } from '../hooks/useUserFilters';
import styles from './UserFilters.module.css';

interface UserFiltersProps {
  filters: UserFiltersState;
  onSearchChange: (value: string) => void;
  onRoleChange: (role: UserFiltersState['role']) => void;
  total: number;
}

const ROLES: UserFiltersState['role'][] = ['all', 'admin', 'manager', 'viewer'];

const MIN_SEARCH_LENGTH = 3;

export function UserFilters({ filters, onSearchChange, onRoleChange, total }: UserFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const trimmedInput = searchInput.trim();
  const inputLength = trimmedInput.length;

  // Only debounce if input has at least 3 characters
  const shouldDebounce = inputLength >= MIN_SEARCH_LENGTH;
  const { debouncedValue, isDebouncing } = useDebounce(shouldDebounce ? trimmedInput : '', 300);

  // Sync local state with external filter when it changes externally
  // Only sync if the filter search has >= 3 chars to avoid resetting user input when < 3 chars
  useEffect(() => {
    if (filters.search.trim().length >= MIN_SEARCH_LENGTH) {
      setSearchInput(filters.search);
    }
  }, [filters.search]);

  // Handle search logic: reset if < 3 chars, apply debounced if >= 3 chars
  useEffect(() => {
    if (inputLength < MIN_SEARCH_LENGTH) {
      // Reset immediately if below minimum length
      if (filters.search !== '') {
        onSearchChange('');
      }
    } else if (
      shouldDebounce &&
      debouncedValue === trimmedInput &&
      debouncedValue !== filters.search
    ) {
      // Apply debounced value only when debounce completes and value matches current input
      onSearchChange(debouncedValue);
    }
  }, [inputLength, trimmedInput, debouncedValue, shouldDebounce, filters.search, onSearchChange]);

  return (
    <div className={styles.filters}>
      <label className={styles.searchField}>
        <span className="visuallyHidden">Search by name</span>
        <SearchIcon />
        <input
          type="search"
          name="search"
          placeholder="Search users"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-busy={isDebouncing}
        />
      </label>

      <div className={styles.roles} role="group" aria-label="Filter by role">
        {ROLES.map((role) => (
          <button
            key={role}
            type="button"
            className={clsx(styles.roleButton, role === filters.role && styles.roleButtonActive)}
            onClick={() => onRoleChange(role)}
            aria-pressed={filters.role === role}
          >
            {role === 'all' ? 'All roles' : role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      <span className={styles.meta} aria-live="polite">
        Showing <strong>{total}</strong> {total === 1 ? 'user' : 'users'}
      </span>
    </div>
  );
}
