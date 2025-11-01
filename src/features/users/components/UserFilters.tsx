import clsx from 'clsx';
import type { UserFiltersState } from '../hooks/useUserFilters';
import styles from './UserFilters.module.css';

interface UserFiltersProps {
  filters: UserFiltersState;
  onSearchChange: (value: string) => void;
  onRoleChange: (role: UserFiltersState['role']) => void;
  total: number;
}

const ROLES: UserFiltersState['role'][] = ['all', 'admin', 'manager', 'editor', 'viewer'];

export function UserFilters({ filters, onSearchChange, onRoleChange, total }: UserFiltersProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.searchField}>
        <span className="visuallyHidden">Search by name</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M10 2a8 8 0 1 1 4.9 14.32l4.39 4.39l-1.42 1.42l-4.39-4.39A8 8 0 0 1 10 2m0 2a6 6 0 1 0 0 12a6 6 0 0 0 0-12"
          />
        </svg>
        <input
          type="search"
          name="search"
          placeholder="Search users"
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
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
