export type UserRole = 'admin' | 'moderator' | 'user' | 'all';

export type UserStatus = 'active' | 'inactive';

export const UserStatusValues = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
} as const;

export interface UserSummary {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  phone: string;
  location: string;
  status: UserStatus;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  image?: string;
  phone?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  company?: {
    name?: string;
    department?: string;
  };
}
