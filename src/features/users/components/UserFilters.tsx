import clsx from 'clsx';
import { SearchIcon } from '../../../components/icons';
import type { UserFiltersState } from '../hooks/useUserFilters';
import styles from './UserFilters.module.css';

interface UserFiltersProps {
  filters: UserFiltersState;
  onSearchChange: (value: string) => void;
  onRoleChange: (role: UserFiltersState['role']) => void;
  total: number;
}

const ROLES: UserFiltersState['role'][] = ['all', 'admin', 'manager', 'viewer'];

export function UserFilters({ filters, onSearchChange, onRoleChange, total }: UserFiltersProps) {
  return (
    <div className={styles.filters}>
      <label className={styles.searchField}>
        <span className="visuallyHidden">Search by name</span>
        <SearchIcon />
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
