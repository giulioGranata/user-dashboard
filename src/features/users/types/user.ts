export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer';

export interface UserSummary {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive' | 'Out of office';
  avatarUrl: string;
  phone: string;
  location: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
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
