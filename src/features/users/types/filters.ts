import type { UserRole } from './user';

export interface UserFiltersState {
  search: string;
  role: UserRole | 'all';
}
